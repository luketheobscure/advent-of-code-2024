const input = Deno.readTextFileSync("inputs/11.txt").split(" ").map(Number);

const cache: Record<string, number> = {};
function blink(stones: number[], count: number): number {
  if (count === 0) return stones.length;

  return stones.map((stone) => {
    if (cache[`${stone}:${count}`] !== undefined) {
      return cache[`${stone}:${count}`];
    }
    let val;

    if (stone === 0) val = blink([1], count - 1);
    else if (stone.toString().length % 2) {
      val = blink([stone * 2024], count - 1);
    } else {
      const stoneDigits = stone.toString().split("");
      const mid = Math.floor(stoneDigits.length / 2);
      const firstHalf = +stoneDigits.slice(0, mid).join("");
      const secondHalf = +stoneDigits.slice(mid).join("");

      val = blink([firstHalf, secondHalf], count - 1);
    }
    cache[`${stone}:${count}`] = val;

    return val;
  }).reduce((acc, stone) => acc + stone, 0);
}

console.log("Part 1:", blink(input, 25));
console.log("Part 2:", blink(input, 75));
