import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.trim());

const checkOverlap = (match1: RegExpMatchArray, match2: RegExpMatchArray) => {
  const startOverlap = match1.index! + 1 >= match2.index!;
  const endOverlap = match1.index! <= (match2.index! + match2[0].length);

  return startOverlap && endOverlap;
}

const symbolRegex = new RegExp('[^.\\dA-Za-z]', 'g');
const numbersRegex = new RegExp('[0-9]+', 'g');

const checkNeighbors = (match: RegExpMatchArray, neighbors: string[]) => {
  for (const neighbor of neighbors) {
    if (!neighbor) continue;
    const symbols = [...neighbor.matchAll(symbolRegex)];
    if (symbols.some(symbol => checkOverlap(symbol, match))) {
      return true;
    };
  }

  return false;
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  let total = 0;
  for (const idx in lines) {
    const index = Number(idx);
    const line = lines[index];
    const matches = [...line.matchAll(numbersRegex)];
    for (const match of matches) {
      if (checkNeighbors(match, [lines[index - 1], line, lines[index + 1]])) {
        total += Number(match[0]);
      }
    }
  }
  return total;
};

const getCogParts = (cog: RegExpMatchArray, neighbors: string[]) => {
  const neighboringNumbers: number[] = [];
  for (const neighbor of neighbors) {
    if (!neighbor) continue;
    const numbers = [...neighbor.matchAll(numbersRegex)];
    for (const number of numbers) {
      if (checkOverlap(cog, number)) {
        neighboringNumbers.push(Number(number[0]));
      }
    }
  }

  return neighboringNumbers;
};

const cogRegex = new RegExp('\\*', 'g');
const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  let total = 0;
  for (const idx in lines) {
    const index = Number(idx);
    const line = lines[index];

    const cogs = [...line.matchAll(cogRegex)];
    for (const cog of cogs) {
      const parts = getCogParts(cog, [lines[index - 1], line, lines[index + 1]]);
      if (parts.length === 2) {
        total += parts[0] * parts[1];
      }
    }
  }

  return total;
};
const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;
run({
  part1: {
    tests: [
      {
        input,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
