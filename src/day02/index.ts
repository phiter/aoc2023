import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const RED_LIMIT = 12;
const GREEN_LIMIT = 13;
const BLUE_LIMIT = 14;

const getPullData = (pull: string) => {
  return {
    green: [...pull.match(new RegExp(`[0-9]+ (?=green)`, 'g')) ?? []].map(Number),
    red: [...pull.match(new RegExp(`[0-9]+ (?=red)`, 'g')) ?? []].map(Number),
    blue: [...pull.match(new RegExp(`[0-9]+ (?=blue)`, 'g')) ?? []].map(Number),
  }
}

const getRowMaxData = (row: string) => {
  const gameId = Number(row.match('[0-9]+')?.[0] ?? 0);
  const pullData = getPullData(row);

  const maxGreens = Math.max(...pullData.green);
  const maxReds = Math.max(...pullData.red);
  const maxBlues = Math.max(...pullData.blue);

  return { gameId, maxBlues, maxReds, maxGreens };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = input.map(getRowMaxData);
  const gameIdSums = rows.reduce((t, row) => {
    if (row.maxBlues > BLUE_LIMIT || row.maxReds > RED_LIMIT || row.maxGreens > GREEN_LIMIT) return t;

    return t + row.gameId;
  }, 0);

  return gameIdSums;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = input.map(getRowMaxData);
  const rowPowers = rows.map((row) => {
    return (row.maxBlues || 1) * (row.maxGreens || 1) * (row.maxReds || 1);
  });

  const rowSums = rowPowers.reduce((t, r) => t + r, 0);

  return rowSums;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
                Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
                Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
                Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
                Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
                Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
                Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
                Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
                Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
