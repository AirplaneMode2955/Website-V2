import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jett Iverson — open to interesting projects and conversations.',
};

const contactLinks = [
  {
    platform: 'GitHub',
    handle: 'github.com/AirplaneMode2955',
    url: 'https://github.com/AirplaneMode2955',
    external: true,
    iconBg: '#1a1a1a',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    platform: 'LinkedIn',
    handle: 'linkedin.com/in/jettiverson',
    url: 'https://www.linkedin.com/in/jettiverson',
    external: true,
    iconBg: '#0077B5',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: 'Instagram',
    handle: '@jett_iverson',
    url: 'https://instagram.com/jett_iverson',
    external: true,
    iconBg: '#E1306C',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    platform: 'Email',
    handle: 'jett@insurancecenterut.com',
    url: 'mailto:jett@insurancecenterut.com',
    external: false,
    iconBg: 'var(--color-primary)',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Page Banner ── */}
      <section className="relative py-24 px-8 bg-surface-container-low border-b border-white/5 overflow-hidden">
        {/* Watermark */}
        <span
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 font-headline italic text-primary select-none pointer-events-none leading-none pr-8"
          style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', opacity: 0.04 }}
        >
          Contact
        </span>
        {/* Radial glow */}
        <div
          aria-hidden="true"
          className="absolute left-8 top-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 70%)',
            opacity: 0.06,
          }}
        />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              Say hello
            </span>
            <h1 className="font-headline italic text-6xl md:text-8xl text-primary leading-tight mb-4">
              Let&apos;s talk.
            </h1>
            <p className="text-on-surface-variant text-xl max-w-xl">
              Always open to ambitious projects that blend technical precision with creative
              strategy. Email is the fastest way to reach me.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Contact</h2>
            <div className="w-10 h-0.5 bg-primary mb-10" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactLinks.map((link, i) => (
              <FadeIn key={link.platform} delay={i * 0.1}>
                <a
                  href={link.url}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-5 bg-surface-container p-6 rounded-[1.25rem] border border-white/[0.08] hover:border-primary/30 hover:shadow-premium transition-all duration-300"
                >
                  {/* Icon box */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: link.iconBg }}
                  >
                    {link.icon}
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p className="font-bold text-lg text-on-surface leading-tight">
                      {link.platform}
                    </p>
                    <p className="text-on-surface-variant text-sm mt-0.5 truncate">
                      {link.handle}
                    </p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I'm Open To ── */}
      <section className="py-20 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <span className="font-label text-xs uppercase tracking-luxe text-outline mb-4 block">
              What I&apos;m open to
            </span>
            <h2 className="font-headline italic text-4xl text-primary mb-10">
              The right conversations.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'smart_toy',
                title: 'AI & Automation',
                description:
                  'Building workflows, agents, and systems that eliminate friction from marketing operations.',
              },
              {
                icon: 'trending_up',
                title: 'SEO & GEO Strategy',
                description:
                  'Helping brands show up in traditional and AI-mediated search. Strategy, content, and technical implementation.',
              },
              {
                icon: 'handshake',
                title: 'Consulting & Advising',
                description:
                  'Short-term engagements with founders or marketing teams who want a sharper approach to digital growth.',
              },
            ].map(({ icon, title, description }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="bg-surface-container-highest rounded-[1.25rem] border border-white/[0.08] p-8 h-full">
                  <span
                    className="material-symbols-outlined text-primary/60 text-2xl mb-4 block"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <h3 className="font-headline italic text-2xl text-primary mb-3">{title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Availability Note ── */}
      <section className="py-16 px-8 bg-background border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-label text-xs uppercase tracking-luxe text-accent">
                Open to conversations
              </span>
            </div>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto">
              Currently Head of Marketing at The Insurance Center and studying at Utah State
              University. Open to interesting side projects and consulting conversations.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
