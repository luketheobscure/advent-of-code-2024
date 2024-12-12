const lines = Deno.readTextFileSync("inputs/7.txt").replace(/\r/g, "").trim()
  .split("\n");

function solve(operands: string[]): number {
  return lines.map((line, i) => {
    console.clear();
    console.log(`Processing line ${i} of ${lines.length}`);

    const [answer, inputs] = line.split(": ");

    const equations = inputs.split(" ").reduce((acc, cur) => {
      if (!acc.length) return [cur];
      const latest: string[] = [];

      acc.forEach((solution) => {
        operands.forEach((operator) => {
          latest.push(`${solution} ${operator} ${cur}`);
        });
      });
      return latest;
    }, [] as string[]);

    const solutions = equations.map((rawEquation) => {
      const equation = rawEquation.split(" ");
      let result: number = +equation[0];
      for (let i = 1; i < equation.length; i += 2) {
        switch (equation[i]) {
          case "+":
            result += +equation[i + 1];
            break;
          case "*":
            result *= +equation[i + 1];
            break;
          case "||":
            result = parseInt(`${result}${equation[i + 1]}`);
            break;
        }
      }
      return result;
    });

    if (solutions.includes(+answer)) {
      return +answer;
    }

    return 0;
  }).reduce((acc, cur) => acc + cur, 0);
}

const part1 = solve(["+", "*"]);
const part2 = solve(["+", "*", "||"]);

console.log("Part 1:", part1);
console.log("Part 2:", part2);
