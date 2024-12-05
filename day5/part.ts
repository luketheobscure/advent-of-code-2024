const input = Deno.readTextFileSync("inputs/5.txt");

const [rawOrderingRules, rawUpdates] = input.split("\n\n").map((x) =>
  x.split("\n")
);
const orderingRules = rawOrderingRules.map((rule) =>
  rule.split("|").map(Number)
);
const updates = rawUpdates.map((rule) => rule.split(",").map(Number));

type RunningTotal = [good: number, bad: number];
const [part1, part2] = updates.map((update) => {
  const validRules = orderingRules.filter(([a, b]) =>
    update.includes(a) && update.includes(b)
  );
  return [...update].sort((a, b) => {
    for (const [x, y] of validRules) {
      if (a === x && b === y) {
        return -1;
      }
      if (a === y && b === x) {
        return 1;
      }
    }
    throw new Error("Invalid input");
  });
}).reduce((acc: RunningTotal, sortedUpdate, i) => {
  const middleNumber = sortedUpdate[Math.floor(sortedUpdate.length / 2)];
  if (sortedUpdate.toString() !== updates[i].toString()) {
    acc[1] += middleNumber;
  } else {
    acc[0] += middleNumber;
  }
  return acc;
}, [0, 0]);

console.log("part 1:", part1);
console.log("part 2:", part2);
