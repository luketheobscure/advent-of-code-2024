const mathSort = (a: number, b: number) => a - b;

const isSorted = (arr: number[]) => {
  const sorted = [...arr].sort(mathSort);
  const arrayAsString = arr.join("");

  return arrayAsString === sorted.join("") ||
    arrayAsString === [...sorted].reverse().join("");
};

const isSafeDistance = (a: number, b: number) => {
  const dist = a > b ? a - b : b - a;

  return dist <= 3;
};

const isUnique = (arr: number[]) => {
  const uniqueNumbers = new Set<number>(arr);
  return uniqueNumbers.size === arr
    .length;
};

function part1(fileName: string): number {
  const input = Deno.readTextFileSync(fileName).split("\n");

  return input.filter((curr) => {
    const numbers = curr.split(" ").map(Number);
    if (!isSorted(numbers)) return false;
    if (!isUnique(numbers)) return false;
    const safe = numbers.every((a, i) => {
      if (i === numbers.length - 1) return true;
      return isSafeDistance(a, numbers[i + 1]);
    });

    return safe;
  }).length;
}

console.log(part1("inputs/2a.txt"));
