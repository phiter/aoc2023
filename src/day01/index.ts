import run from "aocrunner";
import { first, getIndex, isEmpty, last, map, sumBy } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput.split("\n");

const digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const spelledDigitRegex = new RegExp(`(?=(\\d|${digits.join('|')}))`, `g`);

const getFirstAndLastDigits = (input: string) => {
  const matches = input.match(/\d/g);
  if (isEmpty(matches)) return 0;

  const firstDigit = first(matches)
  const lastDigit = last(matches);

  return Number(`${firstDigit}${lastDigit}`);
}

const getFirstAndLastSpelledDigits = (input: string) => {
  const matches = [...input.matchAll(spelledDigitRegex)];
  if (isEmpty(matches)) return 0;
  
  const matchesArray = map(matches, '1');
  const firstDigit = getDigitOrWord(first(matchesArray));
  const lastDigit = getDigitOrWord(last(matchesArray));

  return Number(`${firstDigit}${lastDigit}`);
}

const getDigitOrWord = (digit: string) => getIndex(digits, digit) ?? digit;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return sumBy(input, getFirstAndLastDigits);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return sumBy(input, getFirstAndLastSpelledDigits);
};

const input = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

run({
  part1: {
    tests: [
      {
        input: input,
        expected: 209,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: input,
        expected: 281
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
