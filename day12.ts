const input = Deno.readTextFileSync("inputs/12.txt").split("\n").map((row) =>
  row.split("")
);

type Region = {
  points: Set<string>;
  perimeter: number;
  name: string;
};
const regions: Region[] = [];

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    let inRegion;
    let differentNeighbors = 0;
    const currentPlant = input[i][j];

    for (const [dx, dy] of directions) {
      const x = i + dx;
      const y = j + dy;
      //   out of bounds
      if (x < 0 || x >= input.length || y < 0 || y >= input[i].length) {
        differentNeighbors++;
        continue;
      }
      const neighbor = input[x][y];

      if (currentPlant !== neighbor) {
        differentNeighbors++;
        continue;
      }
      for (const region of regions) {
        if (region.points.has(`${x},${y}`)) {
          if (inRegion && inRegion !== region) {
            inRegion.points.forEach((point) => {
              region.points.add(point);
            });
            region.perimeter += inRegion.perimeter;
            regions.splice(regions.indexOf(inRegion), 1);
          }
          region.points.add(`${i},${j}`);
          inRegion = region;
          break;
        }
      }
    }
    if (!inRegion) {
      regions.push({
        points: new Set([`${i},${j}`]),
        perimeter: differentNeighbors,
        name: currentPlant,
      });
    } else {
      inRegion.perimeter += differentNeighbors;
    }
  }
}

console.log(
  "Part 1:",
  regions.reduce(
    (acc, region) => acc + (region.points.size * region.perimeter),
    0,
  ),
);

function scanRegion(points: Set<string>) {
  const grid = [...points].map((point) => point.split(",").map(Number));
  const [minX, maxX] = [
    Math.min(...grid.map((point) => point[0])),
    Math.max(...grid.map((point) => point[0])),
  ];
  const [minY, maxY] = [
    Math.min(...grid.map((point) => point[1])),
    Math.max(...grid.map((point) => point[1])),
  ];
  let fenceCount = 0;
  // Walk top to bottom
  for (let x = minX; x <= maxX; x++) {
    let prev = false;
    for (let y = minY; y <= maxY; y++) {
      const current = points.has(`${x},${y}`);
      const above = points.has(`${x - 1},${y}`);
      const prevAbove = points.has(`${x - 1},${y - 1}`);
      const below = points.has(`${x + 1},${y}`);
      const prevBelow = points.has(`${x + 1},${y - 1}`);

      if (current && !above && (!prev || prevAbove)) {
        fenceCount++;
      }
      if (current && !below && (!prev || prevBelow)) {
        fenceCount++;
      }
      prev = current;
    }
  }
  // Walk left to right
  for (let y = minY; y <= maxY; y++) {
    let prev = false;
    for (let x = minX; x <= maxX; x++) {
      const current = points.has(`${x},${y}`);
      const left = points.has(`${x},${y - 1}`);
      const prevLeft = points.has(`${x - 1},${y - 1}`);
      const right = points.has(`${x},${y + 1}`);
      const prevRight = points.has(`${x - 1},${y + 1}`);

      if (current && !left && (!prev || prevLeft)) {
        fenceCount++;
      }
      if (current && !right && (!prev || prevRight)) {
        fenceCount++;
      }
      prev = current;
    }
  }

  return fenceCount;
}

console.log(
  "Part 2:",
  regions.map((region) => region.points.size * scanRegion(region.points))
    .reduce((acc, price) => acc + price, 0),
);
