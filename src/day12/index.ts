import run from "aocrunner";
import { memoize, sum } from 'lodash-es';

const parseInput = (rawInput: string) => rawInput.split('\n');

const countVariations = memoize((line: string, groups: readonly number[]): number => {
  if (line.length === 0) {
    if (groups.length === 0) return 1;
    return 0;
  }

  if (groups.length === 0) { 
    if (line.includes('#')) return 0;
    return 1;
  }

  if (line.length < sum(groups) + groups.length - 1) return 0;

  if (line[0] === '.') return countVariations(line.slice(1), groups);

  if (line[0] === '?') return countVariations('#' + line.slice(1), groups) + countVariations('.' + line.slice(1), groups);

  const [currentGroup, ...rest] = groups;

  if (line.slice(0, currentGroup).includes('.')) return 0;
  if (line[currentGroup] === '#') return 0;

  return countVariations(line.slice(currentGroup + 1), rest);
}, (l,g) => l + g.toString());

const parseLine = (line: string) => {
  const [record, values] = line.split(' ');
  return {
    record,
    groups: values.split(',').map(Number),
  };
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.map(parseLine);

  let count = 0;
  for (const line of lines) {
    const { record, groups } = line;
    const variations = countVariations(record, groups);
    count += variations;
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.map(parseLine);

  let count = 0;
  for (const line of lines) {
    const { record, groups } = line;
    const expandedRecord = Array(5).fill(record).join('?');
    const expandedGroups = Array(5).fill(groups).flat();
    const variations = countVariations(expandedRecord, expandedGroups);
    count += variations;
  }

  return count;
};

const input = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 525152,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
