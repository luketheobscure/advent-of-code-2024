const input = Deno.readTextFileSync("inputs/4.txt").split("\n");

const matcher = /MS|SM/g;
let matches = 0;
input.forEach((line, i) => {
  line.split("").forEach((char, j) => {
    if (char !== "A") return;

    if (
      `${input[i - 1]?.[j - 1]}${input[i + 1]?.[j + 1]}`.match(matcher) &&
      `${input[i - 1]?.[j + 1]}${input[i + 1]?.[j - 1]}`.match(matcher)
    ) {
      matches++;
    }
  });
});

console.log(matches);
