/** Texto en minúsculas sin tildes para búsquedas tolerantes (ej. "crucigrama" encuentra "Crucigrama"). */
export function normalizeSearchText(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
