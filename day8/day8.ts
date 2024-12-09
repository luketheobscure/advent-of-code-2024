const input = Deno.readTextFileSync("inputs/8.txt").split("\n");

type Point = [x: number, y: number];
type Pair = [a: Point, b: Point];
const antennas: Record<string, Point[]> = {};

// Find all antennas
input.forEach((line, y) => {
  line.split("").forEach((char, x) => {
    if (char === ".") return;

    if (!antennas[char]) antennas[char] = [];

    antennas[char].push([x, y]);
  });
});

// Get all matching pairs of antennas
const pairs: Pair[] = [];
for (const [_, value] of Object.entries(antennas)) {
  while (value.length) {
    const point = value.shift();
    value.forEach((point2) => {
      pairs.push([point!, point2]);
    });
  }
}

const isInInput = (point: Point) => {
  const [x, y] = point;
  return x >= 0 && x < input[0].length && y >= 0 && y < input.length;
};

const walk = (
  antiNode: Point,
  distX: number,
  distY: number,
  direction: "up" | "down",
) => {
  const [x, y] = antiNode;
  const nextAntiNode1: Point = direction === "up"
    ? [x + distX, y + distY]
    : [x - distX, y - distY];

  return isInInput(nextAntiNode1) ? nextAntiNode1 : null;
};

function findAntiNodes(day2 = false) {
  return pairs.reduce((acc, curr) => {
    const [[x1, y1], [x2, y2]] = curr;
    const distX = x1 - x2;
    const distY = y1 - y2;
    let antiNode1 = walk([x1, y1], distX, distY, "up");
    let antiNode2 = walk([x2, y2], distX, distY, "down");

    if (antiNode1) acc.add(antiNode1.join(","));
    if (antiNode2) acc.add(antiNode2.join(","));

    if (!day2) return acc;

    acc.add(curr[0].join(","));
    acc.add(curr[1].join(","));

    while (antiNode1) {
      antiNode1 = walk(antiNode1!, distX, distY, "up");
      if (!antiNode1) break;
      acc.add(antiNode1.join(","));
    }

    while (antiNode2) {
      antiNode2 = walk(antiNode2!, distX, distY, "down");
      if (!antiNode2) break;
      acc.add(antiNode2.join(","));
    }

    return acc;
  }, new Set<string>());
}

console.log("Part 1:", findAntiNodes().size);
console.log("Part 2:", findAntiNodes(true).size);
