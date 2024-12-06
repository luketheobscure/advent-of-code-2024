function removeItemByIndex(arr: number[], index: number) {
  return arr.filter((_, i) => i !== index);
}

function validateLine(line: number[]) {
  const findBadIndex = (line: number[]) => {
    const isAscending = line[0] < line[1];

    for (let i = 0; i < line.length; i++) {
      if (i === line.length - 1) break;

      const a = line[i];
      const b = line[i + 1];

      // Is it out of order?
      if ((isAscending && a > b) || (!isAscending && a < b)) {
        return i;
      }
      // Does it have duplicates?
      if (line.filter((val) => val === a).length > 1) {
        return i;
      }

      // Are the numbers too far apart?
      const dist = a > b ? a - b : b - a;
      if (dist > 3) return i;
    }
  };

  if (findBadIndex(line) === undefined) return true;

  for (let i = 0; i < line.length; i++) {
    if (findBadIndex(removeItemByIndex(line, i)) === undefined) return true;
  }

  return false;
}

function part2(fileName: string): number {
  const input = Deno.readTextFileSync(fileName).split("\n");

  return input.filter((curr) => validateLine(curr.split(" ").map(Number)))
    .length;
}

console.log(part2("inputs/2a.txt"));
