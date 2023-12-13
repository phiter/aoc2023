import run from "aocrunner";
import { sum, sumBy } from "lodash-es";

const parseInput = (rawInput: string) => rawInput.split('\n').map(h => h.split(' ').map(Number));

const fn = (h: number[], c = 0): number => h.some(i => i !== h[0]) ? (c = h.pop()!) + fn(h.reduce<number[]>((acc, crr, idx) => [...acc, (h[idx + 1] ?? c) - crr], [])) : h[0];

const part1 = (rawInput: string) => {
  const histories = parseInput(rawInput);
  return sumBy(histories, fn);
};

const part2 = (rawInput: string) => {
  const histories = parseInput(rawInput);
  return sumBy(histories, h => fn(h.reverse()));
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
