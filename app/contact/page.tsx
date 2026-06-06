import { ContactForm } from "@/components/contact/contact-form";
import { PageTransition } from "@/components/layout/page-transition";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="page-section !pt-8 sm:!pt-10">
        <div className="page-container">
          <div className="grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <header className="min-w-0 stack">
              <h1 className="text-2xl font-bold leading-tight sm:text-3xl">Contact Us</h1>
              <p className="text-base leading-relaxed text-muted">
                Questions about listings or getting started? We respond within one
                business day.
              </p>
              <p className="text-base">
                <span className="text-muted">Email: </span>
                <a
                  href="mailto:support@thelistinghub.com"
                  className="break-all text-gold hover:underline"
                >
                  support@thelistinghub.com
                </a>
              </p>
            </header>
            <div className="glass-purple panel-lg min-w-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
