import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(row => row.split(''));

const tiltVertical = (lines: string[][], direction: 'up' | 'down') => {
  if (direction === 'down') lines.reverse();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] !== 'O') continue;
      for (let k = i - 1; k >= 0; k--) {
        const lineAbove = lines[k];
        const currentLine = lines[k + 1];
        if (lineAbove && lineAbove[j] !== '.') break;
        if (lineAbove) {
          lineAbove[j] = 'O';
          currentLine[j] = '.';
        }
      }
    }
  }
  if (direction === 'down') lines.reverse();
}

const tiltHorizontal = (lines: string[][], direction: 'left' | 'right') => {
  for (let i = 0; i < lines.length; i++) {
    if (direction === 'right') lines[i].reverse();
    let line = lines[i].join('');
    while(line.includes('.O')) {
      line = line.replace('.O', 'O.');
    }
    lines[i] = line.split('');
    if (direction === 'right') lines[i].reverse();
  }
}

const directions = ['up', 'left', 'down', 'right'] as const;

const tilt = (lines: string[][], direction: typeof directions[number]) => {
  if (direction === 'up') tiltVertical(lines, 'up');
  if (direction === 'down') tiltVertical(lines, 'down');
  if (direction === 'left') tiltHorizontal(lines, 'left');
  if (direction === 'right') tiltHorizontal(lines, 'right');
}

const getTotal = (lines: string[][]) => {
  let total = 0;
  for (let i = 0; i < lines.length; i++) {
    let lineCount = lines[i].filter(c => c === "O").length;
    total += lineCount * (lines.length-i);
  }
  return total;
}

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  tilt(lines, 'up');
  return getTotal(lines);
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  let i = 0;
  let cycles = 1_000_000_000 * directions.length;
  const cache: string[] = [];
  while (true) {
    for (const direction of directions) {
      tilt(lines, direction);

      const str = JSON.stringify(lines);
      
      const index = cache.indexOf(str);
      if (index > -1) {
        const diff = i - index;
        const remaining = cycles - i;
        const cyclesRemaining = remaining % diff;
        const lastLine = JSON.parse(cache[index + cyclesRemaining - 1]);
  
        return getTotal(lastLine);
      }
      cache.push(str);
      i++;
    }
  }
};

const input = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
