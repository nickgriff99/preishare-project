import { AccountForm } from "@/components/account/account-form";
import { PageTransition } from "@/components/layout/page-transition";
import { LinkButton } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login?redirect=/account");
  }

  return (
    <PageTransition>
      <section className="page-section !pt-8 sm:!pt-10">
        <div className="page-container">
          <div className="mx-auto grid min-w-0 max-w-2xl grid-cols-1 gap-10">
            <header className="stack-sm">
              <h1 className="text-2xl font-bold leading-tight sm:text-3xl">Your account</h1>
              <p className="text-base leading-relaxed text-muted">
                Manage your profile and account settings.
              </p>
            </header>

            <div className="glass-purple panel-lg">
              <AccountForm profile={profile} email={user.email ?? ""} />
            </div>

            {profile.role === "investor" && (
              <div className="callout border border-purple-light/30 bg-purple-muted/40">
                <p className="text-base leading-relaxed text-muted">
                  Ready to market your syndication? List your deal on TheListingHub for $499.
                </p>
                <LinkButton href="/get-listed" className="mt-4 w-full sm:w-auto">
                  Get listed
                </LinkButton>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
