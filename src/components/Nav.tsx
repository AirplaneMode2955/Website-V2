'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/projects', label: 'Projects' },
  { href: '/content', label: 'Content' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <nav
      aria-label="Main"
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-2xl border-b border-white/5"
    >
      <div className="max-w-screen-2xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Jett logo"
            width={48}
            height={48}
            className="h-12 w-auto"
            style={{ filter: 'invert(1) brightness(0.85)' }}
          />
          <span className="font-headline italic text-xl text-primary tracking-tight">
            Jett Iverson
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-headline italic text-lg transition-colors ${
                isActive(link.href)
                  ? 'text-primary'
                  : 'text-on-surface/60 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden material-symbols-outlined text-primary text-3xl"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'close' : 'menu'}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="px-8 pb-6 flex flex-col gap-4 bg-background/95 border-t border-white/5 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-headline italic text-lg transition-colors ${
                isActive(link.href)
                  ? 'text-primary'
                  : 'text-on-surface/60 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
