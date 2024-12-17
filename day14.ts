type Point = [x: number, y: number];
type Robot = {
  initial: Point;
  velocity: Point;
};

const input = Deno.readTextFileSync("inputs/14.txt").split("\n");

const robots: Robot[] = input.map((row) => {
  const [_, initialX, initialY, velocityX, velocityY] =
    Array.from(row.matchAll(/p=(\d*),(\d*) v=(.*),(.*)/gm))[0];

  return {
    initial: [parseInt(initialX), parseInt(initialY)],
    velocity: [parseInt(velocityX), parseInt(velocityY)],
  };
});

const MAX_X = 100;
const MAX_Y = 102;

function moveRobot(robot: Robot, time: number): Point {
  const newX = robot.initial[0] + (robot.velocity[0] * time);
  const newY = robot.initial[1] + (robot.velocity[1] * time);
  const actualMaxX = MAX_X + 1;
  const actualMaxY = MAX_Y + 1;
  return [
    Math.abs(((newX % actualMaxX) + actualMaxX) % actualMaxX),
    Math.abs(((newY % actualMaxY) + actualMaxY) % actualMaxY),
  ];
}

function countQuadrants(points: Point[]) {
  const quadrants = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };

  for (const [x, y] of points) {
    if (x === MAX_X / 2 || y === MAX_Y / 2) {
      continue;
    }
    if (x < MAX_X / 2 && y < MAX_Y / 2) {
      quadrants.topLeft++;
    } else if (x >= MAX_X / 2 && y < MAX_Y / 2) {
      quadrants.topRight++;
    } else if (x < MAX_X / 2 && y >= MAX_Y / 2) {
      quadrants.bottomLeft++;
    } else if (x >= MAX_X / 2 && y >= MAX_Y / 2) {
      quadrants.bottomRight++;
    }
  }

  return quadrants.bottomLeft * quadrants.bottomRight * quadrants.topLeft *
    quadrants.topRight;
}

console.log(
  "Part 1",
  countQuadrants(robots.map((robot) => moveRobot(robot, 100))),
);

// Values came from manual inspection of iterations
let count = 7916;
const lowestCount: number[] = [];
let lowestSecurity = Infinity;
while (count < 10000000) {
  const newRobots = robots.map((robot) => moveRobot(robot, count));
  const securityCount = countQuadrants(newRobots);
  if (securityCount < lowestSecurity) {
    lowestCount.push(count);
    lowestSecurity = securityCount;
  }
  count = count + 10403;
}

console.log("Part 2", lowestCount[0]);

// deno-lint-ignore no-unused-vars
function printGrid(points: Point[]) {
  const grid: Array<string | number>[] = Array.from(
    { length: MAX_Y + 1 },
    () => Array.from({ length: MAX_X + 1 }, () => "."),
  );

  for (const point of points) {
    const [x, y] = point;

    grid[y][x] = grid[y][x] == "." ? 1 : +grid[y][x] + 1;
  }

  console.log(grid.map((row) => row.join("")).join("\n"));
}

// // Verify lowest count
// lowestCount.forEach((count) => {
//   console.clear();
//   console.log(count);

//   printGrid(robots.map((robot) => moveRobot(robot, count)));
// });
