import { AuthForm } from "@/components/auth/auth-form";
import { PageTransition } from "@/components/layout/page-transition";
import { Suspense } from "react";

export const metadata = {
  title: "Get Access",
  description:
    "Create your free investor account or sign in to browse CRE listings and express interest.",
};

export default function LoginPage() {
  return (
    <PageTransition>
      <section className="page-section !pt-8 sm:!pt-12">
        <div className="page-container">
          <Suspense
            fallback={
              <div className="mx-auto h-96 w-full max-w-md animate-pulse rounded-2xl bg-card" />
            }
          >
            <AuthForm />
          </Suspense>
        </div>
      </section>
    </PageTransition>
  );
}
