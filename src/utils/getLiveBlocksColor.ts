const COLORS = [
  '#365C73',
  '#F6AE2D',
  '#55DDE0',
  '#F26419',
  '#53DD6C',
  '#E84855',
  '#F4CC3A',
  '#CC5AB3',
];

export default function getLiveBlocksColor(colorSeed: number) {
  return COLORS[colorSeed % COLORS.length];
}
