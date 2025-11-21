/**
 * Utilidad para obtener el contenido de los documentos legales
 * Este archivo puede ser útil si necesitas obtener el contenido programáticamente
 */

import { readFile } from "fs/promises";
import { join } from "path";

export type LegalDocType =
  | "aviso-legal"
  | "politica-cookies"
  | "politica-privacidad"
  | "politica-calidad"
  | "politica-confidencialidad"
  | "canal-etico"
  | "codigo-conducta";

export type Language = "es" | "en" | "fr" | "pt";

/**
 * Obtiene el contenido de un documento legal
 * @param docType - Tipo de documento legal
 * @param lang - Idioma del documento
 * @returns Contenido del documento en formato markdown
 */
export async function getLegalDocument(
  docType: LegalDocType,
  lang: Language,
): Promise<string> {
  const filePath = join(
    process.cwd(),
    "src",
    "content",
    "legal",
    lang,
    `${docType}.md`,
  );

  try {
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading legal document: ${filePath}`, error);
    return "# Contenido no disponible\n\nEste contenido aún no está disponible.";
  }
}

/**
 * Lista todos los documentos legales disponibles
 */
export const LEGAL_DOCUMENTS: Array<{
  slug: LegalDocType;
  file: string;
}> = [
  { slug: "aviso-legal", file: "aviso-legal.md" },
  { slug: "politica-cookies", file: "politica-cookies.md" },
  { slug: "politica-privacidad", file: "politica-privacidad.md" },
  { slug: "politica-calidad", file: "politica-calidad.md" },
  { slug: "politica-confidencialidad", file: "politica-confidencialidad.md" },
  { slug: "canal-etico", file: "canal-etico.md" },
  { slug: "codigo-conducta", file: "codigo-conducta.md" },
];

/**
 * Idiomas soportados
 */
export const SUPPORTED_LANGUAGES: Language[] = ["es", "en", "fr", "pt"];
