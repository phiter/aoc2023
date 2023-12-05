import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.trim());
const sumArrayItems = (array: number[]) => array.reduce((t, i) => t + i, 0);

const parseLineMatches = (line: string) => {
  const [winningNumbers, numbersYouHave] = line.replace(/Card\s+[0-9]+: /, '').split('|').map(l => l.trim().split(/\s+/g));
  const matchingNumbers = [...new Set(numbersYouHave.filter(number => winningNumbers.includes(number)))];
  return matchingNumbers.length;
}

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  let total = 0;
  for (const line of lines) {
    const matchingNumbers = parseLineMatches(line);
    if (matchingNumbers === 0) continue;

    total += Math.pow(2, matchingNumbers - 1);
  }
  return total;
};

/**
 * Stores all solved cards, backwards.
 * Cards with 0 wins resolve to 1 (the card itself)
 * Cards with more than 1 win will take the next x resolved cards and sum them.
 */
const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  let total = 0;
  const resolvedLines: number[] = [];
  const length = lines.length;
  for (let index = length - 1; index >= 0; index--) {
    const matches = parseLineMatches(lines[index]);
    const inverseIndex = length - index - 1;

    // Get resolved values of clones
    const slice = resolvedLines.slice(inverseIndex - matches, inverseIndex);
    const resolution = sumArrayItems(slice) + 1;
    resolvedLines.push(resolution);
    total += resolution;
  }
  return total;
}
const input = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;
run({
  part1: {
    tests: [
      {
        input,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
