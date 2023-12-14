import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n\n');

const validatePalindrome = (lines: string[], matchIndex: number, maxDifferences = 0) => {
  let i = 0;
  let differences = 0;
  while(differences <= maxDifferences) {
    const currentIndex = matchIndex - i;
    const nextIndex = matchIndex + i + 1;
    const currentLine = lines[currentIndex];
    const nextLine = lines[nextIndex];
    if (!currentLine || !nextLine) break;
    for (let j = 0; j < currentLine.length; j++) {
      if (currentLine[j] !== nextLine[j]) differences++;
    }
    i++;
  }

  if (differences === maxDifferences) return true;
  
  return false;
}

function transpose(group: string[]): string[] {
  const result = Array(group[0].length).fill("");
  for (const row of group) {
      [...row].forEach((c, i) => result[i] += c);
  }
  return result;
}

const checkGroupForPalindromes = (group: string[], maxDifferences = 0) => {
  for (let i = 0; i < group.length - 1; i++) {
    if (validatePalindrome(group, i, maxDifferences)) {
      return (i+1) * 100;
    }
  }
  const transposedGroup = transpose(group);
  for (let i = 0; i < transposedGroup.length - 1; i++) {
    if (validatePalindrome(transposedGroup, i, maxDifferences)) {
      return i+1;
    }
  }
  console.log(`here`)
  return 0;
}

const part1 = (rawInput: string) => {
  const groups = parseInput(rawInput);

  let count = 0;
  for(let i = 0; i < groups.length; i++) {
    const group = groups[i].split('\n');
    count += checkGroupForPalindromes(group);
  }
  return count;
};

const part2 = (rawInput: string) => {
  const groups = parseInput(rawInput);
  let count = 0;
  for(let i = 0; i < groups.length; i++) {
    const group = groups[i].split('\n');
    count += checkGroupForPalindromes(group, 1);
  }
  return count;
};

const input = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 405,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 400,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
