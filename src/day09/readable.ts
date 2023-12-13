import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const getNextSequenceNumber = (history: number[]): number => {
    // If all numbers are the same, we don't need to go through the zero array.
    // Just return the first number
    if (!history.some(n => n !== history[0])) {
        return history[0];
    }

    // Remove the last item (since it won't have a next element to subtract from)
    let lastItem = history.pop()!;
    const extract: number[] = [];
    for (let i = 0; i < history.length; i++) {
        const next = history[i + 1] ?? lastItem;
        const current = history[i];
        extract.push(next - current);
    }

    return lastItem + getNextSequenceNumber(extract);
};

const part1 = (rawInput: string) => {
    const histories = parseInput(rawInput).map(h => h.split(' ').map(Number));
    let total = 0;
    for (let history of histories) {
        total += getNextSequenceNumber(history);
    }
    return total;
};

const part2 = (rawInput: string) => {
    const histories = parseInput(rawInput).map(h => h.split(' ').map(Number));
    let total = 0;
    for (let history of histories) {
        total += getNextSequenceNumber(history.reverse());;
    }
    return total;
};

const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

run({
    part1: {
        tests: [
            {
                input,
                expected: 114,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input,
                expected: 2,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
});
