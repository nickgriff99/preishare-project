import { LegalPage } from "@/components/legal/legal-page";
import { privacyPolicy } from "@/lib/legal-content";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title={privacyPolicy.title}
      lastUpdated={privacyPolicy.lastUpdated}
      sections={privacyPolicy.sections}
    />
  );
}
