import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
    projectId: "2aak8c4x",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-01-01",
});

const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source) => {
    return builder.image(source);
}