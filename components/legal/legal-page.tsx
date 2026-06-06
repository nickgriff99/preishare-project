import { FadeIn } from "@/components/motion/fade-in";
import { PageTransition } from "@/components/layout/page-transition";
import Link from "next/link";

type Section = { heading: string; body: string };

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  sections: Section[];
};

export function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
  return (
    <PageTransition>
      <article className="page-container page-section min-w-0 !pt-8 sm:!pt-10">
        <FadeIn className="stack-sm">
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{title}</h1>
          <p className="text-sm text-muted">Last updated: {lastUpdated}</p>
        </FadeIn>
        <div className="mt-10 stack-lg sm:mt-12">
          {sections.map((section, i) => (
            <FadeIn key={section.heading} delay={i * 0.03}>
              <section className="min-w-0 stack-sm">
                <h2 className="text-lg font-semibold text-gold sm:text-xl">{section.heading}</h2>
                <p className="text-base leading-relaxed text-muted">{section.body}</p>
              </section>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-12 border-t border-card-border pt-10">
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-base">
            <Link href="/privacy" className="py-1 text-gold hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-gold hover:underline">
              Terms
            </Link>
            <Link href="/legal" className="text-gold hover:underline">
              Legal
            </Link>
          </nav>
        </FadeIn>
      </article>
    </PageTransition>
  );
}
