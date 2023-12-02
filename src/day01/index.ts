import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");


const getFirstAndLastDigits = (input: string) => {
  const matches = input.match(new RegExp('[0-9]', 'g'));
  if (!matches) return 0;
  const firstDigit = matches[0];
  const lastDigit = matches[matches.length - 1];

  return Number(`${firstDigit}${lastDigit}`);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((t, line) => t + getFirstAndLastDigits(line), 0);
};

const digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const spelledDigitRegex = new RegExp(`(?=([0-9]|${digits.join('|')}))`, `g`);

const getDigitOrWord = (digit: string) => digits.indexOf(digit) > -1 ? digits.indexOf(digit) : Number(digit);

const getFirstAndLastSpelledDigits = (input: string) => {
  const matches = input.matchAll(spelledDigitRegex);
  const matchesArray = Array.from(matches, m => m[1]);
  if (!matchesArray.length) return 0;

  const first = matchesArray[0];
  const last = matchesArray[matchesArray.length - 1];
  const firstDigit = getDigitOrWord(first);
  const lastDigit = getDigitOrWord(last);

  return Number(`${firstDigit}${lastDigit}`);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((t, line) => t + getFirstAndLastSpelledDigits(line), 0);
};

run({
  part1: {
    tests: [
      {
        input: `1aa01`,
        expected: 11,
      },
      {
        input: `
          1aa01
          2afe0b3
    `,
        expected: 34
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          1abc2
          pqr3stu8vwx
          a1b2c3d4e5f
          treb7uchet
        `,
        expected: 142,
      },
      {
        input: `
          two1nine
          eightwothree
          abcone2threexyz
          xtwone3four
          4nineeightseven2
          zoneight234
          7pqrstsixteen
          oneight
          pxreightwo7 
          1v
          f
          4four5
          33
        `,
        expected: 281 + 18 + 87 + 11 + 45 + 33
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
