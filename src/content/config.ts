import { defineCollection, z } from "astro:content";

// Definir la colección de documentos legales
const legalCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    lastUpdated: z.date().optional(),
  }),
});

// Exportar las colecciones
export const collections = {
  legal: legalCollection,
};
