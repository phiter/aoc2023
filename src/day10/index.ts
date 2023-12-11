import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Direction = 'N' | 'E' | 'S' | 'W';

const getNextPosition = (symbol: string, currentPosition: number, previousDirection: Direction, lineWidth: number): [number, Direction] => {
  switch (symbol) {
    case '-': return previousDirection === 'W' ? [currentPosition + 1, 'W'] : [currentPosition - 1, 'E'];
    case '|': return previousDirection === 'N' ? [currentPosition + lineWidth, 'N'] : [currentPosition - lineWidth, 'S'];
    case 'F': return previousDirection === 'E' ? [currentPosition + lineWidth, 'N'] : [currentPosition + 1, 'W'];
    case 'L': return previousDirection === 'N' ? [currentPosition + 1, 'W'] : [currentPosition - lineWidth, 'S'];
    case 'J': return previousDirection === 'W' ? [currentPosition - lineWidth, 'S'] : [currentPosition - 1, 'E'];
    case '7': return previousDirection === 'W' ? [currentPosition + lineWidth, 'N'] : [currentPosition - 1, 'E'];
  }
  return [currentPosition, previousDirection];
}

// No need to check all 4 directions. Only 3 of them (since there are two connections to S)
const getStartingPosition = (sPosition: number, instructions: string, lineWidth: number): [number, Direction] => {
  if (!['.', 'F', 'L', 'S'].includes(instructions[sPosition + 1])) {
    return [sPosition + 1, 'W'];
  } else if (!['.', '7', 'J'].includes(instructions[sPosition - 1])) {
    return [sPosition - 1, 'E'];
  } else {
    return [sPosition + lineWidth, 'N'];
  }
}

const traversePath = (instructions: string, lineWidth: number) => {
  const sPosition = instructions.indexOf('S');
  let currentInstruction = 'S';
  const path: Record<string, string> = {};
  let [currentPosition, previousDirection] = getStartingPosition(sPosition, instructions, lineWidth);
  do {
    const [nextPosition, nextDirection] = getNextPosition(currentInstruction, currentPosition, previousDirection, lineWidth);
    currentPosition = nextPosition;
    previousDirection = nextDirection;
    currentInstruction = instructions[currentPosition];
    const currentLine = Math.floor(currentPosition / lineWidth);
    const currentColumn = currentLine === 0 ? currentPosition : currentPosition % (currentLine * lineWidth);
    path[`${currentColumn}-${currentLine}`] = currentInstruction;
  } while (currentPosition !== sPosition);
  return path;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lineWidth = input.indexOf('\n');
  const instructions = input.replace(/\n/g, '');
  const path = traversePath(instructions, lineWidth);

  return Object.keys(path).length / 2;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lineWidth = input.indexOf('\n');
  const instructions = input.replace(/\n/g, '');

  const path = traversePath(instructions, lineWidth);

  let count = 0;
  const lines = input.split('\n');
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    let isInside = false;
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (path[`${x}-${y}`]) {
        if (char === '|') {
          isInside = !isInside;
        } else if (char === 'L' || char === 'F') {
          const nextIndex = line.split('').findIndex((c, idx) => c !== '-' && idx > x);
          const next = line[nextIndex];
          x += nextIndex - x;
          if ((char === 'L' && next === '7') || (char === 'F' && next === 'J')) {
            isInside = !isInside;
          }
        }
      } else if (isInside) {
        count++;
      }
    }
  }

  return count;
};

const input1 = `
.....
.S-7.
.|.|.
.L-J.
.....
`;

const input2 = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`;

run({
  part1: {
    tests: [
      {
        input: input1,
        expected: 4,
      },
      {
        input: input2,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
    ..........
    .S------7.
    .|F----7|.
    .||....||.
    .||....||.
    .|L-7F-J|.
    .|..||..|.
    .L--JL--J.
    ..........
    `,
        expected: 4,
      },
      {
        input: `
          .F----7F7F7F7F-7....
          .|F--7||||||||FJ....
          .||.FJ||||||||L7....
          FJL7L7LJLJ||LJ.L-7..
          L--J.L7...LJS7F-7L7.
          ....F-J..F7FJ|L7L7L7
          ....L7.F7||L7|.L7L7|
          .....|FJLJ|FJ|F7|.LJ
          ....FJL-7.||.||||...
          ....L---J.LJ.LJLJ...
          `,
        expected: 8
      },
      {
        input: `
      FF7FSF7F7F7F7F7F---7
      L|LJ||||||||||||F--J
      FL-7LJLJ||||||LJL-77
      F--JF--7||LJLJ7F7FJ-
      L---JF-JLJ.||-FJLJJ7
      |F|F-JF---7F7-L7L|7|
      |FFJF7L7F-JF7|JL---7
      7-L-JL7||F7|L7F-7F7|
      L.L7LFJ|||||FJL7||LJ
      L7JLJL-JLJLJL--JLJ.L
          `,
        expected: 10
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
