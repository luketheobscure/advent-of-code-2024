const input = Deno.readTextFileSync("inputs/3.txt");

function followInstructions(matcher: RegExp) {
  const matches = input.matchAll(matcher);
  let result = 0;
  let skip = false;

  for (const [match] of matches) {
    switch (match) {
      case "do()":
        skip = false;
        continue;
      case "don't()":
        skip = true;
        continue;
    }

    if (skip) continue;

    const [a, b] = match.replace("mul(", "").replace(")", "").split(",").map(
      Number,
    );

    result += a * b;
  }

  return result;
}

console.log(`Part 1: ${followInstructions(/mul\(\d+,\d+\)/g)}`);
console.log(
  `Part 2: ${followInstructions(/don\'t\(\)|do\(\)|mul\(\d+,\d+\)/g)}`,
);
