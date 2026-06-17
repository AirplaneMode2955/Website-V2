import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/content', label: 'Content' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-container-lowest">
      <div className="max-w-screen-2xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Jett logo"
              width={28}
              height={28}
              className="h-7 w-auto"
              style={{ filter: 'invert(1) brightness(0.85)' }}
            />
            <span className="font-headline italic text-lg text-primary">Jett Iverson</span>
          </Link>

          <div className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-headline italic text-sm text-on-surface/50 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="font-label text-xs text-on-surface/30 tracking-luxe uppercase">
            © {new Date().getFullYear()} Jett Iverson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
