import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

/**
 * Check what is the minimum press time to beat the record distance.
 * The maximum press time should be the opposite value (time - min)
 * Then just calculate how many numbers in between the min and max.
 */
const getRaceWins = (raceTime: number, raceDistance: number) => {
  for (let pressTime = 1; pressTime < raceTime; pressTime++) {
    const timeLeft = raceTime - pressTime;
    const distance = timeLeft * pressTime;
    if (distance > raceDistance) {
      const minPressTime = pressTime;
      const maxPressTime = raceTime - minPressTime + 1;
      return maxPressTime - minPressTime;
    };
  }
  return 0;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const raceTimes = [...input[0].match(/\d+/g)?.values()!].map(Number);
  const raceDistances = [...input[1].match(/\d+/g)?.values()!].map(Number);

  return raceTimes.reduce((acc, _, index) => acc * getRaceWins(raceTimes[index], raceDistances[index]), 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const raceTime = Number([...input[0].match(/\d+/g)?.values()!].join(''));
  const raceDistance = Number([...input[1].match(/\d+/g)?.values()!].join(''));
  return getRaceWins(raceTime, raceDistance);
};

const input = `
Time:      7  15   30
Distance:  9  40  200
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
