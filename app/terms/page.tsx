import { LegalPage } from "@/components/legal/legal-page";
import { termsOfService } from "@/lib/legal-content";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage
      title={termsOfService.title}
      lastUpdated={termsOfService.lastUpdated}
      sections={termsOfService.sections}
    />
  );
}
