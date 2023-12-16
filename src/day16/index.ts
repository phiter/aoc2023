import run from "aocrunner";
import { chunk, sumBy } from "lodash-es";

const parseInput = (rawInput: string) => rawInput.split('\n');
type Coord = [x: number, y: number];
type TileType = '|' | '.' | '/' | '\\' | '-';
type FieldData = {
  tile: TileType;
  energizedFrom?: {
    left?: boolean;
    right?: boolean;
    up?: boolean;
    down?: boolean;
  }
}

type Field = Record<string, FieldData>;
type Direction = 'up' | 'down' | 'left' | 'right';

const getLabel = ([x,y]: Coord) => `${x}-${y}`;

const traverse = (field: Field, coord: Coord, direction: Direction): Field => {
  const [x,y] = coord;
  const position = field[getLabel(coord)];
  if (position === undefined) return field;
  const { tile } = position;

  position.energizedFrom ??= {};
  if (position.energizedFrom[direction]) return field;
  position.energizedFrom[direction] = true;

  if (
    tile === '.' ||
    (tile === '-' && ['left', 'right'].includes(direction)) ||
    (tile === '|' && ['up', 'down'].includes(direction))
  ) {
    const nextX = direction === 'right' ? x+1 : direction === 'left' ? x-1 : x;
    const nextY = direction === 'down' ? y+1 : direction === 'up' ? y-1 : y;
    return traverse(field, [nextX, nextY], direction);
  }

  if (tile === '/') {
    if (direction === 'right') return traverse(field, [x, y - 1], 'up');
    if (direction === 'left') return traverse(field, [x, y + 1], 'down');
    if (direction === 'up') return traverse(field, [x + 1, y], 'right');
    if (direction === 'down') return traverse(field, [x - 1, y], 'left');
  }

  if (tile === '\\') {
    if (direction === 'right') return traverse(field, [x, y + 1], 'down');
    if (direction === 'left') return traverse(field, [x, y - 1], 'up');
    if (direction === 'up') return traverse(field, [x - 1, y], 'left');
    if (direction === 'down') return traverse(field, [x + 1, y], 'right');
  }
  
  if (tile === '|') {
    traverse(field, [x, y-1], 'up'), traverse(field, [x, y+1], 'down');
  }

  if (tile === '-') {
    traverse(field, [x+1, y], 'right'), traverse(field, [x-1, y], 'left');
  }

  return field
}

const drawField = (field: Field, lineWidth: number) => {
  const matrix: string[][] = [];
  for (const ch of chunk(Object.entries(field), lineWidth)) {
    const row = [];
    for (const tile of ch) {
      const data = tile[1];
      if (data.energizedFrom) {
        row.push(`\x1b[43m${data.tile}\x1b[0m`);
      } else row.push(data.tile);
    }
    matrix.push(row);
  }
  console.log(matrix.map(r => r.join('')).join('\n'));
}

const makeField = (array: string[]): Field => {
  const field: Field = {};
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      field[getLabel([x,y])] = {
        tile: array[y][x] as TileType
      }
    }
  }
  return field;
}

const countEnergizedTiles = (field: Field) => {
  return sumBy(Object.values(field), t => Number(Boolean(t.energizedFrom)));
}

const part1 = async (rawInput: string) => {
  const input = parseInput(rawInput);
  const beamPosition: Coord = [0, 0];
  const field = makeField(input);
  traverse(field, beamPosition, 'right');
  // await drawField(field, array[0].length);
  return countEnergizedTiles(field);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const directionEnergyMap: Record<string, number> = {};
  const width = input[0].length;
  const height = input.length;
  for (let y = 0; y < height; y++) {
    if (y === 0 || y === height - 1) {
      for (let x = 1; x < width-1; x++) {
        directionEnergyMap[getLabel([y, x])] = countEnergizedTiles(traverse(makeField(input), [x, y], y === 0 ? 'down' : 'up'));
      }
    }
    directionEnergyMap[getLabel([y, 0])] = countEnergizedTiles(traverse(makeField(input), [0, y], 'right'));
    
    directionEnergyMap[getLabel([y, width-1])] = countEnergizedTiles(traverse(makeField(input), [width-1, y], 'left'));
  }

  for (let x = 0; x < width; x++) {
    if (x === 0 || x === width - 1) {
      for (let y = 1; y < height-1; y++) {
        directionEnergyMap[getLabel([x, y])] =  countEnergizedTiles(traverse(makeField(input), [x, y], x === 0 ? 'right' : 'left'));
      }
    }
    directionEnergyMap[getLabel([x, 0])] = countEnergizedTiles(traverse(makeField(input), [x, 0], 'down'));
    directionEnergyMap[getLabel([x, width - 1])] = countEnergizedTiles(traverse(makeField(input), [x, width - 1], 'up'));
  }
  return Math.max(...Object.values(directionEnergyMap));
};

const input = `
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
