/* ===== The Eldrick engine (Web Worker) =====
   negamax + alpha-beta + quiescence over chess.js, with a style re-rank and
   human-error "slip" at the root so it feels like ~1000-rated Jett. */

var VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
var PST = {
  p: [0,0,0,0,0,0,0,0, 5,10,10,-20,-20,10,10,5, 5,-5,-10,0,0,-10,-5,5, 0,0,0,20,20,0,0,0,
      5,5,10,25,25,10,5,5, 10,10,20,30,30,20,10,10, 50,50,50,50,50,50,50,50, 0,0,0,0,0,0,0,0],
  n: [-50,-40,-30,-30,-30,-30,-40,-50, -40,-20,0,5,5,0,-20,-40, -30,5,10,15,15,10,5,-30,
      -30,0,15,20,20,15,0,-30, -30,5,15,20,20,15,5,-30, -30,0,10,15,15,10,0,-30,
      -40,-20,0,0,0,0,-20,-40, -50,-40,-30,-30,-30,-30,-40,-50],
  b: [-20,-10,-10,-10,-10,-10,-10,-20, -10,5,0,0,0,0,5,-10, -10,10,10,10,10,10,10,-10,
      -10,0,10,10,10,10,0,-10, -10,5,5,10,10,5,5,-10, -10,0,5,10,10,5,0,-10,
      -10,0,0,0,0,0,0,-10, -20,-10,-10,-10,-10,-10,-10,-20],
  r: [0,0,0,5,5,0,0,0, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5,
      -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, 5,10,10,10,10,10,10,5, 0,0,0,0,0,0,0,0],
  q: [-20,-10,-10,-5,-5,-10,-10,-20, -10,0,5,0,0,0,0,-10, -10,5,5,5,5,5,0,-10,
      0,0,5,5,5,5,0,-5, -5,0,5,5,5,5,0,-5, -10,0,5,5,5,5,0,-10,
      -10,0,0,0,0,0,0,-10, -20,-10,-10,-5,-5,-10,-10,-20],
  k: [20,30,10,0,0,10,30,20, 20,20,0,0,0,0,20,20, -10,-20,-20,-20,-20,-20,-20,-10,
      -20,-30,-30,-40,-40,-30,-30,-20, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30,
      -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30],
  kEnd: [-50,-30,-30,-30,-30,-30,-30,-50, -30,-30,0,0,0,0,-30,-30, -30,-10,20,30,30,20,-10,-30,
      -30,-10,30,40,40,30,-10,-30, -30,-10,30,40,40,30,-10,-30, -30,-10,20,30,30,20,-10,-30,
      -30,-20,-10,0,0,-10,-20,-30, -50,-40,-30,-20,-20,-30,-40,-50]
};
var MATE = 300000;
var LIMIT_MS = 1500;

function idxFor(sq, color) {
  var f = sq.charCodeAt(0) - 97, r = +sq[1] - 1;
  return color === 'w' ? r * 8 + f : (7 - r) * 8 + f;
}
function nonPawnMat(board) {
  var m = 0;
  for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) {
    var p = board[r][f]; if (p && p.type !== 'p' && p.type !== 'k') m += VAL[p.type];
  }
  return m;
}
function kingSafety(g, color) {
  // pawns shielding this color's king (same/adjacent file, 1-2 ranks ahead)
  var board = g.board(), ksq = null;
  for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) {
    var p = board[r][f]; if (p && p.type === 'k' && p.color === color) ksq = { f: f, r: 8 - r };
  }
  if (!ksq) return 0;
  var dir = color === 'w' ? 1 : -1, shield = 0;
  for (var df = -1; df <= 1; df++) for (var dr = 1; dr <= 2; dr++) {
    var tf = ksq.f + df, tr = ksq.r + dir * dr;
    if (tf < 0 || tf > 7 || tr < 1 || tr > 8) continue;
    var pp = g.get('abcdefgh'[tf] + tr);
    if (pp && pp.type === 'p' && pp.color === color) shield += 10;
  }
  // penalty if king still central-ish and no shield
  return shield;
}
function evaluateWhite(g, botColor) {
  var board = g.board();
  var npm = nonPawnMat(board);
  var endgame = npm <= 1300;
  var score = 0, wB = 0, bB = 0;
  for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) {
    var p = board[r][f]; if (!p) continue;
    var sq = 'abcdefgh'[f] + (8 - r);
    var sign = p.color === 'w' ? 1 : -1;
    score += sign * VAL[p.type];
    var t = p.type === 'k' && endgame ? 'kEnd' : p.type;
    score += sign * PST[t][idxFor(sq, p.color)];
    if (p.type === 'b') { if (p.color === 'w') wB++; else bB++; }
  }
  if (wB >= 2) score += 30;
  if (bB >= 2) score -= 30;
  // king safety, with the bot's own king weighted at half (Jett leaves it in the centre)
  var ksW = kingSafety(g, 'w'), ksB = kingSafety(g, 'b');
  score += ksW * (botColor === 'w' ? 0.5 : 1.0);
  score -= ksB * (botColor === 'b' ? 0.5 : 1.0);
  // endgame king activity for the side that's ahead
  if (endgame) {
    var mat = score; // rough
    var ka = kingCentral(g, 'w') - kingCentral(g, 'b');
    score += (mat > 0 ? 1 : -1) * Math.min(Math.abs(mat), 400) / 400 * ka * 6;
  }
  return score;
}
function kingCentral(g, color) {
  var board = g.board();
  for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) {
    var p = board[r][f]; if (p && p.type === 'k' && p.color === color) {
      var cd = Math.abs(3.5 - f) + Math.abs(3.5 - (7 - r));
      return 7 - cd;
    }
  }
  return 0;
}
function evalStm(g, botColor) {
  var s = evaluateWhite(g, botColor);
  return g.turn() === 'w' ? s : -s;
}

function orderMoves(ms) {
  return ms.sort(function (a, b) {
    var av = (a.captured ? VAL[a.captured] * 8 - VAL[a.piece] : 0) + (a.flags.indexOf('p') >= 0 ? 800 : 0);
    var bv = (b.captured ? VAL[b.captured] * 8 - VAL[b.piece] : 0) + (b.flags.indexOf('p') >= 0 ? 800 : 0);
    return bv - av;
  });
}

var t0 = 0;
function timeUp() { return Date.now() - t0 > LIMIT_MS; }

function quiesce(g, alpha, beta, botColor, qd) {
  var stand = evalStm(g, botColor);
  if (stand >= beta) return beta;
  if (stand > alpha) alpha = stand;
  if (qd <= 0) return alpha;
  var caps = orderMoves(g.moves({ verbose: true }).filter(function (m) { return m.flags.indexOf('c') >= 0 || m.flags.indexOf('e') >= 0; }));
  for (var i = 0; i < caps.length; i++) {
    g.move(caps[i]);
    var sc = -quiesce(g, -beta, -alpha, botColor, qd - 1);
    g.undo();
    if (sc >= beta) return beta;
    if (sc > alpha) alpha = sc;
  }
  return alpha;
}
function negamax(g, depth, alpha, beta, botColor, ply) {
  if (timeUp()) throw { abort: 1 };
  // cheap draw checks only (in_checkmate/in_stalemate each re-generate moves — do it once below)
  if (g.insufficient_material()) return 0;
  if (ply < 8 && g.in_threefold_repetition()) return 0;
  var inChk = g.in_check();
  if (inChk && ply < 24) depth++; // check extension
  if (depth <= 0) return quiesce(g, alpha, beta, botColor, 6);
  var ms = orderMoves(g.moves({ verbose: true }));
  if (ms.length === 0) return inChk ? -MATE + ply : 0; // checkmate / stalemate
  for (var i = 0; i < ms.length; i++) {
    g.move(ms[i]);
    var sc = -negamax(g, depth - 1, -beta, -alpha, botColor, ply + 1);
    g.undo();
    if (sc >= beta) return beta;
    if (sc > alpha) alpha = sc;
  }
  return alpha;
}

function enemyKingSq(g, botColor) {
  var opp = botColor === 'w' ? 'b' : 'w', board = g.board();
  for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) {
    var p = board[r][f]; if (p && p.type === 'k' && p.color === opp) return { f: f, r: 8 - r };
  }
  return { f: 4, r: botColor === 'w' ? 8 : 1 };
}
function hangsToRecapture(g, m) {
  // shallow SEE: does the move drop material to an immediate recapture on m.to?
  var given = m.captured ? VAL[m.captured] : 0;
  g.move(m);
  var recap = g.moves({ verbose: true }).some(function (x) { return x.to === m.to; });
  g.undo();
  return recap && given < VAL[m.piece] - 40;
}
function styleBonus(g, m, botColor, ply) {
  // never let personality talk the bot into a losing sac
  if (m.san.indexOf('#') < 0 && hangsToRecapture(g, m)) return -80;
  var b = 0;
  var eks = enemyKingSq(g, botColor);
  var tf = m.to.charCodeAt(0) - 97, tr = +m.to[1];
  var nearKing = Math.abs(tf - eks.f) <= 2 && Math.abs(tr - eks.r) <= 2;
  if (m.san.indexOf('+') >= 0 || m.san.indexOf('#') >= 0) b += 12;
  if (m.flags.indexOf('c') >= 0) b += nearKing ? 10 : 5;
  else if (nearKing) b += 6;
  // Jett's structures
  if (m.piece === 'p' && ((botColor === 'w' && m.to === 'e3') || (botColor === 'b' && m.to === 'e6'))) b += 14;
  if (m.piece === 'p' && ((botColor === 'w' && m.to === 'c4') || (botColor === 'b' && m.to === 'c5'))) b += 12;
  if (m.piece === 'p' && (m.to[0] === 'd' || m.to[0] === 'e') && ply < 16) b += 5;
  // develop minor pieces early
  if (ply < 24 && (m.piece === 'n' || m.piece === 'b')) {
    var fr = +m.from[1];
    if ((botColor === 'w' && fr === 1) || (botColor === 'b' && fr === 8)) b += 8;
  }
  if (m.san === 'O-O') b += 5;
  if (m.san === 'O-O-O') b += 7;
  return b;
}

function chooseFromBook(bookData, botColor, path, legal) {
  var tree = bookData[botColor === 'w' ? 'white' : 'black'];
  var node = tree[path];
  if (!node) return null;
  var entries = Object.keys(node)
    .filter(function (san) { return legal.some(function (m) { return m.san === san || m.san === san.replace('+', '').replace('#', ''); }); })
    .map(function (san) { return [san, node[san]]; });
  if (!entries.length) return null;
  var total = entries.reduce(function (a, e) { return a + e[1]; }, 0);
  var r = Math.random() * total;
  for (var i = 0; i < entries.length; i++) { r -= entries[i][1]; if (r <= 0) return entries[i][0]; }
  return entries[0][0];
}

onmessage = function (ev) {
  var d = ev.data;
  var g = new Chess(d.fen);
  var legal = g.moves({ verbose: true });
  if (!legal.length) { postMessage({ san: null }); return; }

  // 1) opening book
  if (Math.random() < d.book) {
    var bk = chooseFromBook(d.bookData, d.botColor, d.path, legal);
    if (bk) {
      var mv = legal.find(function (m) { return m.san === bk || m.san.replace(/[+#]/g, '') === bk.replace(/[+#]/g, ''); });
      if (mv) { postMessage({ san: mv.san, tag: 'book' }); return; }
    }
  }

  // 2) search (iterative deepening, keep last completed depth's root scores)
  t0 = Date.now();
  var ordered = orderMoves(legal.slice());
  var rootScores = ordered.map(function (m) { return { m: m, s: 0 }; });
  try {
    for (var depth = 1; depth <= d.depth; depth++) {
      var alpha = -MATE * 2, best = -MATE * 2;
      var local = [];
      for (var i = 0; i < ordered.length; i++) {
        g.move(ordered[i]);
        var sc = -negamax(g, depth - 1, -MATE * 2, -alpha, d.botColor, 1);
        g.undo();
        local.push({ m: ordered[i], s: sc });
        if (sc > best) best = sc;
        if (sc > alpha) alpha = sc;
      }
      local.sort(function (a, b) { return b.s - a.s; });
      rootScores = local;
      // re-order for next iteration (PV first)
      ordered = local.map(function (x) { return x.m; });
      if (Math.abs(best) > MATE - 1000) break; // forced mate found
    }
  } catch (e) { /* aborted on time — use last completed rootScores */ }

  rootScores.sort(function (a, b) { return b.s - a.s; });
  var bestScore = rootScores[0].s;
  var ply = g.history().length;

  // 3) style re-rank among near-best moves
  var styleWindow = 28;
  var pool = rootScores.filter(function (x) { return bestScore - x.s <= styleWindow; });
  var styled = pool.map(function (x) { return { m: x.m, s: x.s + styleBonus(g, x.m, d.botColor, ply) }; });
  styled.sort(function (a, b) { return b.s - a.s; });
  var chosen = styled[0].m;

  // 4) human-error slip
  if (Math.random() < d.slipP) {
    var slipPool = rootScores.filter(function (x) { return bestScore - x.s <= d.slipCp; });
    if (slipPool.length > 1) chosen = slipPool[(Math.random() * slipPool.length) | 0].m;
  }

  // 5) sanity net — don't toss a piece unless the search actually calculated a win.
  // (The shallow eval can't always see a trapped/lost piece a few quiet moves out.)
  if (hangsToRecapture(g, chosen) && bestScore < 180) {
    var safe = null;
    for (var si = 0; si < rootScores.length; si++) {
      if (!hangsToRecapture(g, rootScores[si].m)) { safe = rootScores[si].m; break; }
    }
    if (safe) chosen = safe;
  }

  // 6) persona tag — bestScore is already from the bot's point of view
  var tag = null;
  if (chosen.san.indexOf('+') >= 0 || chosen.san.indexOf('#') >= 0 || chosen.flags.indexOf('c') >= 0) tag = 'attack';
  if (bestScore > 220) tag = 'better';
  else if (bestScore < -220) tag = 'worse';

  postMessage({ san: chosen.san, tag: tag });
};
