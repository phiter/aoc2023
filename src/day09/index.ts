import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(h => h.split(' ').map(Number));

const fn = (h: number[]): number => h.some(i => i !== 0) ? h[h.length - 1] + fn(h.reduce<number[]>((acc, crr, idx, arr) => idx === arr.length - 1 ? acc : [...acc, arr[idx + 1] - crr], [])) : 0;

const part1 = (rawInput: string) => {
  const histories = parseInput(rawInput);
  return histories.reduce((acc, h) => acc + fn(h), 0);
};

const part2 = (rawInput: string) => {
  const histories = parseInput(rawInput);
  return histories.reduce((acc, h) => acc + fn(h.reverse()), 0);
};

const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
