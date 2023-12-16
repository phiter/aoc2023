import run from "aocrunner";
import { sumBy } from "lodash-es";

const parseInput = (rawInput: string) => rawInput.split(',');

const getHash = (step: string) => {
  let currentValue = 0;
  for (const char of step) {
    const charCode = char.charCodeAt(0);
    currentValue += charCode;
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
}

const part1 = (rawInput: string) => {
  const steps = parseInput(rawInput);
  return sumBy(steps, getHash);
};

type Box = Record<string, number>;

const getTotalFocusingPower = (boxes: Box[]) => {
  let total = 0;
  for (let boxNumber = 0; boxNumber < boxes.length; boxNumber++) {
    const entries = Object.entries(boxes[boxNumber]);
    for (let lensNumber = 0; lensNumber < entries.length; lensNumber++) {
      const [_, focalLength] = entries[lensNumber];
      const lensTotal = (boxNumber + 1) * (lensNumber+1) * focalLength;
      total += lensTotal;
    }
  }
  return total;
}

const manageStep = (step: string, boxes: Box[]) => {
  if (step.endsWith('-')) {
    const label = step.slice(0, -1);
    const box = boxes[getHash(label)];
    return delete box[label];
  }
  const [label, fLength] = step.split('=');
  const boxIndex = getHash(label);
  const focalLength = parseInt(fLength);
  if (label in boxes[boxIndex]) {
    boxes[boxIndex][label] = focalLength;
  } else {
    boxes[boxIndex] = {
      ...boxes[boxIndex],
      [label]: focalLength,
    }
  }
}

const part2 = (rawInput: string) => {
  const steps = parseInput(rawInput);
  const boxes: Box[] = Array(256).fill({});
  for (const step of steps) {
    manageStep(step, boxes);
  }
  
  return getTotalFocusingPower(boxes);
};

const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
