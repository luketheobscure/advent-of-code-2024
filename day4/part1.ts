// Pro tip: this was a bad idea, don't do this
function rotate45Degrees(matrix: string[][], direction: 45 | -45): string[] {
  const n = matrix.length;
  const result: string[][] = [];

  if (direction === 45) {
    for (let i = 0; i < 2 * n - 1; i++) {
      result[i] = [];
      for (let j = 0; j < n; j++) {
        const k = i - j;
        if (k >= 0 && k < n) {
          result[i].push(matrix[j][k]);
        }
      }
    }
  } else if (direction === -45) {
    for (let i = 0; i < 2 * n - 1; i++) {
      result[i] = [];
      for (let j = 0; j < n; j++) {
        const k = i - (n - 1 - j);
        if (k >= 0 && k < n) {
          result[i].push(matrix[j][k]);
        }
      }
    }
  }
  return result.map((row) => row.join(""));
}
function rotate90Degrees(matrix: string[][]): string[][] {
  const n = matrix.length;
  const result: string[][] = Array.from({ length: n }, () => Array(n).fill(""));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[j][n - 1 - i] = matrix[i][j];
    }
  }

  return result;
}

const input = Deno.readTextFileSync("inputs/4.txt").split("\n");

const matcher = /XMAS/g;
const reverseMatcher = /SAMX/g;
let matches = 0;

input.forEach((line) => {
  matches += (line.match(matcher) || []).length;
  matches += (line.match(reverseMatcher) || []).length;
});
rotate45Degrees(input.map((line) => line.split("")), 45).forEach((line) => {
  matches += (line.match(matcher) || []).length;
  matches += (line.match(reverseMatcher) || []).length;
});
rotate45Degrees(input.map((line) => line.split("")), -45).forEach((line) => {
  matches += (line.match(matcher) || []).length;
  matches += (line.match(reverseMatcher) || []).length;
});
rotate90Degrees(input.map((line) => line.split(""))).forEach((line) => {
  matches += (line.join("").match(matcher) || []).length;
  matches += (line.join("").match(reverseMatcher) || []).length;
});

console.log(matches);
