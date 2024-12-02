const mathSort = (a: number, b: number) => a - b;

function part1(fileName: string): number {
  const input = Deno.readTextFileSync(fileName).split("\n");

  const list1: number[] = [];
  const list2: number[] = [];
  input.forEach((line) => {
    const [a, b] = line.split("   ").map(Number);
    list1.push(a);
    list2.push(b);
  });
  list1.sort(mathSort);
  list2.sort(mathSort);

  return list1.reduce((acc, curr, index) => {
    const [a, b] = [curr, list2[index]].sort(mathSort);
    return acc + (b - a);
  }, 0);
}

function part2(fileName: string): number {
  const input = Deno.readTextFileSync(fileName).split("\n");
  const list1: number[] = [];
  const list2: number[] = [];
  input.forEach((line) => {
    const [a, b] = line.split("   ").map(Number);
    list1.push(a);
    list2.push(b);
  });

  const uniqueNumbers = new Set<number>(list1);
  const similarityScores = new Map<number, number>();
  for (const num of uniqueNumbers) {
    similarityScores.set(num, list2.filter((val) => val === num).length * num);
  }
  return list1.reduce((acc, curr) => acc + similarityScores.get(curr)!, 0);
}

console.log(part1("inputs/1a.txt"));
console.log(part2("inputs/1a.txt"));
