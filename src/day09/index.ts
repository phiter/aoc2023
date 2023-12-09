import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const findNextDifference = (history: number[], backwards = false): number => {
  const extracts = [[...history]];
  for (let i = 0; extracts[extracts.length - 1].some(n => n !== 0); i++) {
    extracts.push(extracts[i].reduce<number[]>((acc, crr, idx, arr) => idx === arr.length - 1 ? acc : [...acc, arr[idx + 1] - crr], []))
  }
  return extracts.reduceRight((acc, crr, idx) => idx === 0 ? acc : backwards ? crr[0] - acc : crr[crr.length - 1] + acc, 0);
};

const part1 = (rawInput: string) => {
  const histories = parseInput(rawInput).map(h => h.split(' ').map(Number));
  return histories.reduce((acc, h) => acc + h[h.length - 1] + findNextDifference(h), 0);
};

const part2 = (rawInput: string) => {
  const histories = parseInput(rawInput).map(h => h.split(' ').map(Number));
  return histories.reduce((acc, h) => acc + h[0] - findNextDifference(h, true), 0);
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
