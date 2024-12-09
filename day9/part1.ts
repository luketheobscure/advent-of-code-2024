const input = Deno.readTextFileSync("inputs/9.txt");

type FileInfo = [char: string, fileID: number, sourceIndex: number];
function* repeatCharGenerator(str: string): Generator<FileInfo> {
  for (let index = 0; index < str.length; index++) {
    const char = str[index];
    const count = parseInt(char, 10);
    for (let i = 0; i < count; i++) {
      yield [char, index / 2, index];
    }
  }
}
function* reverseRepeatCharGenerator(
  str: string,
): Generator<FileInfo> {
  for (let offset = 0; offset < str.length; offset++) {
    const index = str.length - offset - 1;
    if (index % 2) continue;

    const char = str[index];
    const count = parseInt(char, 10);

    for (let i = 0; i < count; i++) {
      yield [char, index / 2, offset];
    }
  }
}

const reverseGenerator = reverseRepeatCharGenerator(input);
const generator = repeatCharGenerator(input);

const expanded = [];
let reverseResult = reverseGenerator.next();
let result = generator.next();
while (!result.done && !reverseResult.done) {
  const [count, fileID, index] = result.value;
  const isFile = index % 2 === 0;
  if (isFile) {
    if (expanded.filter((x) => x === fileID).length < +count) {
      expanded.push(fileID);
    }
  } else {
    const [_, fileID, reverseIndex] = reverseResult.value;
    if (reverseIndex + index === input.length) {
      break;
    }

    expanded.push(fileID);
    reverseResult = reverseGenerator.next();
  }
  result = generator.next();
}

console.log(
  "Part 1:",
  expanded.reduce((acc, curr, i) => {
    acc += curr * i;
    return acc;
  }, 0),
);
