// Palette de couleurs pastel pour thème clair
const PALETTE = [
  '#fde68a', // jaune
  '#bbf7d0', // vert
  '#bfdbfe', // bleu
  '#fecaca', // rouge
  '#e9d5ff', // violet
  '#fed7aa', // orange
  '#a7f3d0', // émeraude
  '#fce7f3', // rose
  '#cffafe', // cyan
  '#d1fae5', // vert menthe
];

export function tokenIdToColor(id: number): string {
  const hash = (id * 2654435761) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
