import sha256 from "crypto-js/sha256";

export function buildMerkleTree(hashes) {
  if (!hashes.length) return [];

  const levels = [hashes];

  while (hashes.length > 1) {
    const nextLevel = [];
    for (let i = 0; i < hashes.length; i += 2) {
      const left = hashes[i];
      const right = hashes[i + 1] || left;
      nextLevel.push(sha256(left + right).toString());
    }
    hashes = nextLevel;
    levels.unshift(hashes); // add on top
  }

  return levels;
}
