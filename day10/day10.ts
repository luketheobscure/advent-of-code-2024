const input = Deno.readTextFileSync("inputs/10.txt").split("\n").map((x) =>
  x.split("")
);

type Point = [x: number, y: number];

const trailHeads: Point[] = input.flatMap((line, y) =>
  line.map((char, x) => char === "0" ? [x, y] : null)
).filter(Boolean) as Point[];

function checkPoint(point: Point, currentHeight: number) {
  const [x, y] = point;
  if (x < 0 || x >= input[0].length || y < 0 || y >= input.length) return false;

  if (+input[y][x] === currentHeight + 1) return true;

  return false;
}

let uniquePaths = 0;
function walk(currentPoint: Point, peaks: Set<string>): Set<string> {
  const [x, y] = currentPoint;
  const curHeight = +input[y][x];

  ([[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]] as Point[]).forEach(
    (nextPoint) => {
      if (!checkPoint(nextPoint!, curHeight)) return;

      if (curHeight === 8) {
        uniquePaths += 1;
        peaks.add(nextPoint!.join());
        return;
      }
      walk(nextPoint!, peaks);
    },
  );
  return peaks;
}

console.log(
  "Part 1:",
  trailHeads.reduce(
    (acc, trailHead) => acc + walk(trailHead, new Set()).size,
    0,
  ),
);
console.log("Part 2:", uniquePaths);
