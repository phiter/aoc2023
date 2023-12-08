import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const solve = (instructions: number[], lines: Record<string, [string, string]>, point: string, isTarget: (v: string) => boolean) => {
  let steps = 0;
  while (point = lines[point][instructions[steps++ % instructions.length]!]) {
    if (isTarget(point)) {
      break;
    }
  }
  return steps;
}
const parseLines = (lines: string[]): Record<string, [string, string]> => {
  return lines.reduce((ac, l) => {
    const matches = l.match(/\w+/g)!;
    return {
      ...ac,
      [matches[0]]: [matches[1], matches[2]]
    }
  }, {});
}

const greatestCommonDivisor = (a: number, b: number): number => a ? greatestCommonDivisor(b % a, a) : b;
const leastCommonMultiple = (a: number, b: number): number => a * b / greatestCommonDivisor(a, b);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input[0].split('').map(i => Number(i !== "L"));
  const lines = input.slice(2, input.length);

  const mappedLines = parseLines(lines);

  const initial = "AAA";
  const target = "ZZZ";
  return solve(instructions, mappedLines, initial, t => t === target);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input[0].split('').map(i => Number(i !== "L"));
  const lines = input.slice(2, input.length);
  const mappedLines = parseLines(lines);
  const startingPoints = Object.keys(mappedLines).filter(l => l[2] === "A");
  const solves = startingPoints.map(point => solve(instructions, mappedLines, point, t => t[2] === "Z"));
  solves.sort((a, b) => a - b);
  return solves.reduce(leastCommonMultiple);
};

const input = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

const input2 = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: input2,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
