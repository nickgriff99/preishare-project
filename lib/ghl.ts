/**
 * GoHighLevel integration stub (Phase 2).
 * Set GHL_API_KEY and GHL_LOCATION_ID to enable contact sync.
 */

type GhlContact = {
  name: string;
  email: string;
  tags?: string[];
  source?: string;
};

export async function syncContactToGhl(contact: GhlContact): Promise<boolean> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return false;
  }

  // Phase 2: POST to GoHighLevel API
  // https://highlevel.stoplight.io/docs/integrations/
  console.info("[GHL] Would sync contact:", contact.email, contact.source);
  return true;
}
