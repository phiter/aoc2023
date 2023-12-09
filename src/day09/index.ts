import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const findExtracts = (history: number[]): number[][] => {
  const extracts = [[...history]];
  for (let i = 0; extracts[extracts.length - 1].some(n => n !== 0); i++) {
    extracts.push(extracts[i].reduce<number[]>((acc, crr, idx, arr) => idx === arr.length - 1 ? acc : [...acc, arr[idx + 1] - crr], []))
  }
  return extracts;
}

const findNextDifference = (extracts: number[][], backwards = false): number => {
  let lastDifference = 0;
  for (let i = extracts.length - 1; i > 0; i--) {
    const nextExtract = extracts[i - 1];
    if (!nextExtract) break;
    const extract = extracts[i];
    lastDifference = backwards ?
      extract[0] - lastDifference :
      extract[extract.length - 1] + lastDifference;
  }
  return lastDifference;
};

const part1 = (rawInput: string) => {
  const histories = parseInput(rawInput).map(h => h.split(' ').map(Number));
  let total = 0;
  for (let history of histories) {
    const nextDifference = findNextDifference(findExtracts(history));
    const nextNumber = history[history.length - 1] + nextDifference;
    total += nextNumber;
  }
  return total;
};

const part2 = (rawInput: string) => {
  const histories = parseInput(rawInput).map(h => h.split(' ').map(Number));
  let total = 0;
  for (let history of histories) {
    const nextDifference = findNextDifference(findExtracts(history), /* backwards */ true);
    const nextNumber = history[0] - nextDifference;
    total += nextNumber;
  }
  return total;
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
