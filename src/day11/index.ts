import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');
type Coords = [x: number, y: number];

const getExpansionPoints = (map: string[]) => {
  const expandedRows = [];
  const expandedColumns = [];
  for (let i = 0; i < map.length; i++) {
    const line = map[i];
    if (!line.match(/[^.]/)) {
      expandedRows.push(i);
    }
  }

  const firstLine = map[0];
  for (let i = 0; i <= firstLine.length; i++) {
    if (map.every(l => l[i] === '.')) {
      expandedColumns.push(i);
    }
  }

  return [expandedRows, expandedColumns];
}

const getExpansionsBefore = (expansions: number[], a: number) => {
  return expansions.filter(e => e < a).length;
};

const createGalaxies = (map: string[][], expansions: number[][], expansionFactor: number) => {
  const [rowExpansions, columnExpansions] = expansions;
  const galaxies: Coords[] = [];
  expansionFactor = expansionFactor === 1 ? 1 : expansionFactor - 1;
  for (let x = 0; x < map.length; x++) {
    const rowExpansionsBefore = getExpansionsBefore(rowExpansions, x);
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] === '#') {
        galaxies.push([
          x + rowExpansionsBefore * expansionFactor,
          y + getExpansionsBefore(columnExpansions, y) * expansionFactor
        ]);
      }
    }
  }

  return galaxies;
}

const findShortestDistance = ([aX, aY]: Coords, [bX, bY]: Coords) => {
  return Math.abs(bX - aX) + Math.abs(bY - aY);
}

const getTotalDistances = (galaxies: Coords[]) => {
  let sum = 0;
  const galaxyLength = galaxies.length;
  // Loop through every galaxy pair
  for (let i = 0; i < galaxyLength; i++) {
    for (let j = i + 0; j < galaxyLength; j++) {
      sum += findShortestDistance(galaxies[i], galaxies[j]);
    }
  }
  return sum;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const expansionFactor = 1;

  const expansionPoints = getExpansionPoints(input);
  const galaxies = createGalaxies(input.map(l => l.split('')), expansionPoints, expansionFactor);
  return getTotalDistances(galaxies);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let expansionFactor = 1_000_000;
  // For tests
  if (!isNaN(Number(input[0]))) expansionFactor = Number(input.shift());

  const expansionPoints = getExpansionPoints(input);
  const galaxies = createGalaxies(input.map(l => l.split('')), expansionPoints, expansionFactor);
  return getTotalDistances(galaxies);
};

const testInput = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: '10' + testInput,
        expected: 1030,
      },
      {
        input: '100' + testInput,
        expected: 8410,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
