import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Ranges = [destinationStart: number, sourceStart: number, rangeLength: number];

const parseRanges = (input: string[]) => {
  const ranges: Ranges[][] = [];
  for (const line of input) {
    const parts = line.replace(/[\s\S]+map:\n/, '').split('\n');
    const currentRanges: Ranges[] = [];
    for (const part of parts) {
      const mapRanges = part.match(/(\d+) (\d+) (\d+)/)!.slice(1, 4)!.map(Number) as unknown as Ranges;
      currentRanges.push(mapRanges);
    }
    ranges.push(currentRanges);
  }
  return ranges;
};

const getDestination = (source: number, destinationMap: Ranges[]) => {
  for (const [destinationStart, sourceStart, rangeLength] of destinationMap) {
    if (source >= sourceStart && source <= sourceStart + rangeLength - 1) {
      return source - sourceStart + destinationStart;
    }
  }
  return source;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n');
  const seeds = input.shift()!.match(/[0-9]+/g)!.map(Number);
  const maps = parseRanges(input);
  let smallestDestination = Infinity;
  for (const seed of seeds) {
    const destination = [...maps.values()].reduce(getDestination, seed);
    if (destination < smallestDestination) {
      smallestDestination = destination;
    }
  }
  return smallestDestination;
};

type SeedMap = [start: number, size: number];
const spreadSeeds = (seedMap: number[]): SeedMap[] => {
  const seeds: SeedMap[] = [];
  for (let i = 0; i < seedMap.length; i += 2) {
    seeds.push([seedMap[i], seedMap[i + 1]]);
  }

  return seeds;
}

const getMapDestination = (source: SeedMap, destinationMap: Ranges[]) => {
  const [start, end] = source;
  const last = start + end - 1;
  const logs = [];
  for (const [destinationStart, sourceStart, rangeLength] of destinationMap) {
    const lastSource = sourceStart + rangeLength - 1;
    logs.push({ sourceStart, lastSource, rangeLength, start, last });
    if (start >= sourceStart && last <= lastSource) {
      return start - sourceStart + destinationStart;
    }
  }
  console.table(logs);
  return start;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n');
  const seeds = input.shift()!.match(/[0-9]+/g)!.map(Number);
  const rangeMaps = parseRanges(input);
  let smallestDestination = Infinity;
  const seedMaps = spreadSeeds(seeds);
  for (const seedMap of seedMaps) {
    for (const rangeMap of rangeMaps) {
      const destination = getMapDestination(seedMap, rangeMap);
      if (destination < smallestDestination) {
        smallestDestination = destination;
      }
    }
  }
  return smallestDestination;
};
const part22 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n');
  const seeds = input.shift()!.match(/[0-9]+/g)!.map(Number);
  const rangeMaps = parseRanges(input);
  let smallestDestination = Infinity;
  const seedMaps = spreadSeeds(seeds);
  for (const seedMap of seedMaps) {
    console.log(`checking seeds: ${seedMap[0]} to ${seedMap[0] + seedMap[1] - 1}`);
    for (let i = 0; i <= (seedMap[1] - 1); i++) {
      const seed = i + seedMap[0];
      const destination = [...rangeMaps.values()].reduce(getDestination, seed);
      if (destination < smallestDestination) {
        smallestDestination = destination;
      }
    }
  }
  return smallestDestination;
};

const input = `
seeds: 79 14 55 13

seed - to - soil map:
50 98 2
52 50 48

soil - to - fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer - to - water map:
49 53 8
0 11 42
42 0 7
57 7 4

water - to - light map:
88 18 7
18 25 70

light - to - temperature map:
45 77 23
81 45 19
68 64 13

temperature - to - humidity map:
0 69 1
1 0 69

humidity - to - location map:
60 56 37
56 93 4
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 46,
      },
    ],
    solution: part22,
  },
  trimTestInputs: true,
  onlyTests: false,
});
