import { LinkButton } from "@/components/ui/button";
import { BackLink } from "@/components/ui/back-link";

export default function NotFound() {
  return (
    <section className="page-container flex min-h-[50vh] flex-col items-center justify-center py-20 text-center sm:py-24">
      <div className="stack max-w-sm">
        <p className="text-5xl font-bold text-gold">404</p>
        <h1 className="text-xl font-bold sm:text-2xl">Page not found</h1>
        <p className="text-base text-muted">This page doesn&apos;t exist or was moved.</p>
        <div className="btn-group sm:btn-group-row sm:justify-center">
          <LinkButton href="/" fullWidth className="sm:min-w-[10rem]">
            Home
          </LinkButton>
          <BackLink />
        </div>
      </div>
    </section>
  );
}
