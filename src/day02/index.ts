import run from "aocrunner";
const trim = (str: string) => str.trim();

const parseInput = (rawInput: string) => rawInput.split("\n").map(trim);
const limits = {
  red: 12,
  green: 13,
  blue: 14
};

const getPullData = (pull: string) => {
  return {
    green: Number(pull.match(`([0-9]+) green`)?.[1] ?? 0),
    red: Number(pull.match(`([0-9]+) red`)?.[1] ?? 0),
    blue: Number(pull.match(`([0-9]+) blue`)?.[1] ?? 0),
  }
}

const gameIdRegex = new RegExp('Game ([0-9]+):');
const getRowMaxData = (row: string) => {
  const gameIdMatcher = row.match(gameIdRegex);
  const gameId = gameIdMatcher?.[1];
  if (!gameId) return;
  const rowData = row.replace(gameIdRegex, '');
  const pulls = rowData.split(`;`).map(trim);
  const pullDatas = pulls.map(getPullData);
  const maxGreens = Math.max(...pullDatas.map(d => d.green));
  const maxReds = Math.max(...pullDatas.map(d => d.red));
  const maxBlues = Math.max(...pullDatas.map(d => d.blue));

  return { gameId: Number(gameId), maxBlues, maxReds, maxGreens };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = input.map(getRowMaxData);
  let gameIdSums = 0;
  rows.forEach(row => {
    if (!row) return;
    if (row.maxBlues > limits.blue || row.maxReds > limits.red || row.maxGreens > limits.green) return;
    gameIdSums += row.gameId;
  })
  return gameIdSums;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = input.map(getRowMaxData);
  const rowPowers = rows.map((row) => {
    if (!row) return 0;

    return (row.maxBlues || 1) * (row.maxGreens || 1) * (row.maxReds || 1);
  });
  const sum = rowPowers.reduce((t, r) => t + r, 0);

  return sum;
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
