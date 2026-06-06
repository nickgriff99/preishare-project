import Link from "next/link";

const footerLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/listings", label: "Listings" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/legal", label: "Legal" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-card-border bg-purple-deep">
      <div className="page-container py-14 sm:py-16">
        <div className="grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="min-w-0 max-w-md stack-sm">
            <p className="text-xl font-semibold">
              TheListing<span className="text-gold">Hub</span>
            </p>
            <p className="text-base leading-relaxed text-muted">
              Investment classifieds for passive CRE. Connect with LPs, GPs, and
              syndicated private equity opportunities.
            </p>
          </div>
          <nav
            className="grid min-w-0 grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:gap-x-10"
            aria-label="Footer"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-1 text-base text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-12 border-t border-card-border pt-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} TheListingHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
