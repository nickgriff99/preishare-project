import { LegalPage } from "@/components/legal/legal-page";
import { legalNotice } from "@/lib/legal-content";

export const metadata = { title: "Legal Notice" };

export default function LegalNoticePage() {
  return (
    <LegalPage
      title={legalNotice.title}
      lastUpdated={legalNotice.lastUpdated}
      sections={legalNotice.sections}
    />
  );
}
