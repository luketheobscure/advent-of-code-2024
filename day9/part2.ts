const input = Deno.readTextFileSync("inputs/9.txt");

const map = input.split("").map((x, i) =>
  Array.from({ length: +x }, () => i % 2 === 0 ? i / 2 : ".")
);

for (let i = map.length - 1; i >= 0; i -= 2) {
  const file = map[i];
  for (let j = 1; j < map.length; j++) {
    const whitespace = map[j];
    if (j > i) break;
    if (file.length <= whitespace.filter((v) => v === ".").length) {
      file.forEach((x, i) => {
        whitespace[whitespace.indexOf(".")] = x;
        file[i] = ".";
      });

      break;
    }
  }
}

console.log(
  "Part 2:",
  map.flatMap((v) => v).reduce((acc: number, curr, i) => {
    if (curr === ".") return acc;
    acc += +curr * i;

    return acc;
  }, 0),
);
