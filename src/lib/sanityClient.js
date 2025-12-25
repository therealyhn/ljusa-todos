import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "2aak8c4x",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-01-01",
});