// Thank you kind stranger who posted this formula!
// A = (p_x*b_y - prize_y*b_x) / (a_x*b_y - a_y*b_x)
// B = (a_x*p_y - a_y*p_x) / (a_x*b_y - a_y*b_x)

type Machine = {
  prize: [number, number];
  a: [number, number];
  b: [number, number];
};

function solveMachine(machine: Machine, offset: number = 0): number {
  const [prizeX, prizeY] = [
    machine.prize[0] + offset,
    machine.prize[1] + offset,
  ];
  const [aX, aY] = machine.a;
  const [bX, bY] = machine.b;

  const det = aX * bY - aY * bX;
  const a = (prizeX * bY - prizeY * bX) / det;
  const b = (aX * prizeY - aY * prizeX) / det;
  if (
    [aX * a + bX * b, aY * a + bY * b]
        .join() === [prizeX, prizeY].join() &&
    Number.isInteger(a) && Number.isInteger(b)
  ) {
    return a * 3 + b;
  } else {
    return 0;
  }
}

const input = Deno.readTextFileSync("inputs/13.txt").split("\n\n");
const matcher =
  /Button A: X\+(\d*), Y\+(\d*)\s*Button B: X\+(\d*), Y\+(\d*)\sPrize: X=(\d*), Y=(\d*)/gm;

const machines: Machine[] = input.map((row) => {
  const [_, aX, aY, bX, bY, prizeX, prizeY] =
    Array.from(row.matchAll(matcher))[0];

  return {
    prize: [parseInt(prizeX), parseInt(prizeY)],
    a: [parseInt(aX), parseInt(aY)],
    b: [parseInt(bX), parseInt(bY)],
  };
});

console.log(
  "Part 1:",
  machines.map((machine) => solveMachine(machine)).reduce((a, b) => a + b, 0),
);

console.log(
  "Part 2:",
  machines.map((machine) => solveMachine(machine, 10000000000000)).reduce(
    (a, b) => a + b,
    0,
  ),
);
