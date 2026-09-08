/**
 * Email capture. Ships dark until NEXT_PUBLIC_BUTTONDOWN_USER is set in the
 * environment (Vercel project settings). Point it at a free Buttondown account:
 * the username is the last path segment of your Buttondown page URL.
 */
const BUTTONDOWN_USER = process.env.NEXT_PUBLIC_BUTTONDOWN_USER;

export default function Subscribe({
  heading = 'Get new pieces by email',
  blurb = 'Occasional notes on AI, search, and marketing. No cadence promises, no spam.',
}: {
  heading?: string;
  blurb?: string;
}) {
  if (!BUTTONDOWN_USER) return null;

  return (
    <section className="px-8 py-16 bg-surface-container-low border-t border-white/5">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-headline italic text-3xl text-primary mb-3">{heading}</h2>
        <p className="text-on-surface-variant text-sm mb-6">{blurb}</p>
        <form
          action={`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USER}`}
          method="post"
          target="_blank"
          className="flex flex-col sm:flex-row gap-3"
        >
          <label htmlFor="bd-email" className="sr-only">
            Email address
          </label>
          <input
            id="bd-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="flex-1 bg-surface-container-highest border border-white/10 rounded-md px-4 py-3 text-on-surface placeholder:text-outline focus:border-primary/40 focus:outline-none"
          />
          <button
            type="submit"
            className="border border-primary/40 text-primary px-6 py-3 rounded-md font-label uppercase tracking-luxe text-sm hover:bg-primary hover:text-on-primary transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
