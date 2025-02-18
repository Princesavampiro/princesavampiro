import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "89kyb225",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-02-18",
});
