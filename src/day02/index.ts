import run from "aocrunner";
import { max, sum, sumBy } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput.split('\n');

const RED_LIMIT = 12;
const GREEN_LIMIT = 13;
const BLUE_LIMIT = 14;

const getColor = (pull: string, color: string) => pull.match(new RegExp(`[0-9]+ (?=${color})`, 'g'))?.map(Number) ?? [];

const getRowMaxData = (row: string) => {
  const gameId = Number(row.match('[0-9]+')?.[0] ?? 0);

  const greens = max(getColor(row, 'green'))!;
  const reds = max(getColor(row, 'red'))!;
  const blues = max(getColor(row, 'blue'))!;

  return { gameId, blues, reds, greens };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = input.map(getRowMaxData);

  return sumBy(rows, row => row.blues > BLUE_LIMIT || row.reds > RED_LIMIT || row.greens > GREEN_LIMIT ? 0 : row.gameId);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = input.map(getRowMaxData);

  const rowPowers = rows.map(row => row.blues * row.greens * row.reds);

  return sum(rowPowers);
};

const input = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
