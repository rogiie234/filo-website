export function shouldPlayEntrance(
  reducedMotion: boolean,
  hash: string,
) {
  return !reducedMotion && !hash;
}
