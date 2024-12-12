const input = Deno.readTextFileSync("inputs/6.txt").split("\n");

function getNextPosition(
  position: [number, number],
  direction: "up" | "down" | "left" | "right",
): [number, number] {
  const [x, y] = position;
  switch (direction) {
    case "up":
      return [x, y - 1];
    case "down":
      return [x, y + 1];
    case "left":
      return [x - 1, y];
    case "right":
      return [x + 1, y];
    default:
      return position;
  }
}

function walkMap(input: string[]): number | boolean {
  let guardPosition: [number, number] = [0, 0];
  let guardDirection: "up" | "down" | "left" | "right" = "up";

  // Get initial position
  input.forEach((row, y) => {
    if (!row.includes("^")) return;

    guardPosition = [row.indexOf("^"), y];
  });

  // Tracking for part 1
  const visits = new Set([guardPosition.join(",")]);

  // Tracking for part 2
  const loopDetection = new Set([
    `${guardPosition.join(",")}${guardDirection}`,
  ]);

  while (true) {
    const [nextX, nextY] = getNextPosition(guardPosition, guardDirection);

    if (
      nextX < 0 || nextX >= input[0].length || nextY < 0 ||
      nextY >= input.length
    ) {
      // guard has left the area
      break;
    }

    const nextChar = input[nextY][nextX];

    if (nextChar !== "#") {
      visits.add(`${nextX},${nextY}`);
      const guardState = `${nextX},${nextY}${guardDirection}`;
      if (loopDetection.has(guardState)) {
        // guard has entered a loop
        return false;
      }
      loopDetection.add(guardState);
      guardPosition = [nextX, nextY];
      continue;
    }
    switch (guardDirection) {
      case "up":
        guardDirection = "right";
        break;
      case "right":
        guardDirection = "down";
        break;
      case "down":
        guardDirection = "left";
        break;
      case "left":
        guardDirection = "up";
        break;
    }
  }
  return visits.size;
}

function placeObstacles(input: string[]): number {
  return input.flatMap((row, y) =>
    row.split("").filter((char, x) => {
      if (char !== ".") return;

      const newInput = [...input];

      newInput[y] = newInput[y].slice(0, x) + "#" + newInput[y].slice(x + 1);

      return !walkMap(newInput);
    })
  ).length;
}

console.log("Part 1:", walkMap(input));
console.log("Part 2:", placeObstacles(input));
