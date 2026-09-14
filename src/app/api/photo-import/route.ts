import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const REPO_OWNER = 'AirplaneMode2955';
const REPO_NAME = 'Website-V2';
const BASE_BRANCH = 'main';
const LIFE_PHOTOS_PATH = 'src/data/lifePhotos.ts';
const GITHUB_API = 'https://api.github.com';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.heic'];

function githubHeaders() {
  const token = process.env.PHOTO_IMPORT_GITHUB_TOKEN;
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };
}

function sanitizeFileName(name: string): string | null {
  const trimmed = name.trim();
  const ext = trimmed.slice(trimmed.lastIndexOf('.')).toLowerCase();
  if (!IMAGE_EXTENSIONS.includes(ext)) return null;
  // Keep it simple and predictable: strip anything that isn't safe in a
  // public/ filename or a Next.js <Image src>.
  const safe = trimmed.replace(/[^\w.\- ]/g, '');
  return safe || null;
}

async function githubJson(path: string, headers: HeadersInit, init?: RequestInit) {
  const res = await fetch(`${GITHUB_API}${path}`, { ...init, headers });
  const body = await res.json().catch(() => null);
  return { res, body };
}

export async function POST(request: NextRequest) {
  const secret = process.env.PHOTO_IMPORT_SECRET;
  const driveApiKey = process.env.DRIVE_API_KEY;
  const headers = githubHeaders();

  if (!secret || !driveApiKey || !headers) {
    return NextResponse.json({ ok: false, error: 'photo-import not configured' }, { status: 503 });
  }

  if (request.headers.get('x-import-secret') !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let payload: { fileId?: unknown; fileName?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
  }

  const fileId = typeof payload.fileId === 'string' ? payload.fileId.trim() : '';
  const rawFileName = typeof payload.fileName === 'string' ? payload.fileName.trim() : '';
  if (!fileId || !rawFileName) {
    return NextResponse.json({ ok: false, error: 'fileId and fileName are required' }, { status: 400 });
  }

  const fileName = sanitizeFileName(rawFileName);
  if (!fileName) {
    return NextResponse.json({ ok: false, error: 'unsupported or unsafe file name' }, { status: 400 });
  }

  // Deterministic branch name per Drive file so a repeat webhook fire
  // (Zapier retries, duplicate triggers) is a no-op instead of a second PR.
  const branch = `automated/photo-${fileId.replace(/[^A-Za-z0-9]/g, '').slice(0, 20).toLowerCase()}`;

  const driveRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media&key=${driveApiKey}`
  );
  if (!driveRes.ok) {
    console.error('photo-import: Drive download failed', driveRes.status, await driveRes.text().catch(() => '<no body>'));
    return NextResponse.json({ ok: false, error: 'could not download file from Drive' }, { status: 502 });
  }
  const fileBase64 = Buffer.from(await driveRes.arrayBuffer()).toString('base64');

  const { res: mainRefRes, body: mainRefBody } = await githubJson(
    `/repos/${REPO_OWNER}/${REPO_NAME}/git/ref/heads/${BASE_BRANCH}`,
    headers
  );
  if (!mainRefRes.ok) {
    console.error('photo-import: could not read main ref', mainRefRes.status, mainRefBody);
    return NextResponse.json({ ok: false, error: 'could not read base branch' }, { status: 502 });
  }
  const mainSha = mainRefBody.object.sha as string;

  const { res: createBranchRes, body: createBranchBody } = await githubJson(
    `/repos/${REPO_OWNER}/${REPO_NAME}/git/refs`,
    headers,
    { method: 'POST', body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: mainSha }) }
  );
  if (createBranchRes.status === 422) {
    // Branch already exists — this file was already imported (or is mid-import).
    const { body: existingPrs } = await githubJson(
      `/repos/${REPO_OWNER}/${REPO_NAME}/pulls?head=${REPO_OWNER}:${branch}&state=open`,
      headers
    );
    const existing = Array.isArray(existingPrs) ? existingPrs[0] : null;
    return NextResponse.json({
      ok: true,
      duplicate: true,
      pr: existing?.html_url ?? null,
    });
  }
  if (!createBranchRes.ok) {
    console.error('photo-import: branch creation failed', createBranchRes.status, createBranchBody);
    return NextResponse.json({ ok: false, error: 'could not create branch' }, { status: 502 });
  }

  // Avoid clobbering an existing public/ file with the same name.
  let finalFileName = fileName;
  const { res: existingFileRes } = await githubJson(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/public/${encodeURIComponent(finalFileName)}?ref=${BASE_BRANCH}`,
    headers
  );
  if (existingFileRes.ok) {
    const dot = fileName.lastIndexOf('.');
    const shortId = fileId.replace(/[^A-Za-z0-9]/g, '').slice(0, 6);
    finalFileName = `${fileName.slice(0, dot)}-${shortId}${fileName.slice(dot)}`;
  }

  const { res: putImageRes, body: putImageBody } = await githubJson(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/public/${encodeURIComponent(finalFileName)}`,
    headers,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: `Add imported photo: ${finalFileName}`,
        content: fileBase64,
        branch,
      }),
    }
  );
  if (!putImageRes.ok) {
    console.error('photo-import: image commit failed', putImageRes.status, putImageBody);
    return NextResponse.json({ ok: false, error: 'could not commit image' }, { status: 502 });
  }

  const { res: dataFileRes, body: dataFileBody } = await githubJson(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${LIFE_PHOTOS_PATH}?ref=${branch}`,
    headers
  );
  if (!dataFileRes.ok) {
    console.error('photo-import: could not read lifePhotos.ts', dataFileRes.status, dataFileBody);
    return NextResponse.json({ ok: false, error: 'could not read gallery data file' }, { status: 502 });
  }
  const currentContent = Buffer.from(dataFileBody.content, 'base64').toString('utf-8');
  const closingIndex = currentContent.lastIndexOf('];');
  if (closingIndex === -1) {
    console.error('photo-import: lifePhotos.ts did not match expected shape');
    return NextResponse.json({ ok: false, error: 'gallery data file has an unexpected format' }, { status: 500 });
  }
  const newEntry = `  { src: '/${finalFileName}', alt: 'TODO: describe this photo before merging' },\n`;
  const updatedContent =
    currentContent.slice(0, closingIndex) + newEntry + currentContent.slice(closingIndex);

  const { res: putDataRes, body: putDataBody } = await githubJson(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${LIFE_PHOTOS_PATH}`,
    headers,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: `Add ${finalFileName} to lifePhotos gallery`,
        content: Buffer.from(updatedContent, 'utf-8').toString('base64'),
        sha: dataFileBody.sha,
        branch,
      }),
    }
  );
  if (!putDataRes.ok) {
    console.error('photo-import: gallery data commit failed', putDataRes.status, putDataBody);
    return NextResponse.json({ ok: false, error: 'could not update gallery data file' }, { status: 502 });
  }

  const { res: prRes, body: prBody } = await githubJson(
    `/repos/${REPO_OWNER}/${REPO_NAME}/pulls`,
    headers,
    {
      method: 'POST',
      body: JSON.stringify({
        title: `Import photo: ${finalFileName}`,
        head: branch,
        base: BASE_BRANCH,
        body: [
          'Auto-imported from the Website Photo Inbox Drive folder.',
          '',
          `- File: \`${finalFileName}\``,
          `- Drive file ID: \`${fileId}\``,
          '',
          `**Before merging:** edit the placeholder alt text in \`${LIFE_PHOTOS_PATH}\` to actually describe the photo.`,
        ].join('\n'),
      }),
    }
  );
  if (!prRes.ok) {
    console.error('photo-import: PR creation failed', prRes.status, prBody);
    return NextResponse.json({ ok: false, error: 'could not open pull request' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, pr: prBody.html_url, file: finalFileName });
}
