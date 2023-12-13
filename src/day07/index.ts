import run from "aocrunner";
import { sumBy } from "lodash-es";

const parseInput = (rawInput: string) => rawInput.split('\n');

const cardOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
const cardRankMap: Record<string, number> = cardOrder.reduce((acc, c, index) => ({ ...acc, [c]: cardOrder.length - index }), {});
const jokerCardRankMap: Record<string, number> = {
  ...cardRankMap,
  J: -1
}

type Hand = { cards: string[], bid: number, map: Entry[], rank: number };

const parseHand = (line: string, withJoker = false): Hand => {
  const parts = line.split(' ');

  const cards = parts[0].split('');
  const bid = Number(parts[1]);
  const map = mapHandCards(cards);

  if (withJoker) {
    const jokerIndex = map.findIndex(entry => entry[0] === "J");

    if (jokerIndex > -1 && map.length > 1) {
      if (jokerIndex === 0) {
        map[1][1] += map[0][1];
      } else {
        map[0][1] += map[jokerIndex][1];
      }
      map.splice(jokerIndex, 1);
    }
  }

  const rank = map[0][1] - map.length - 1;
  return {
    cards,
    bid,
    map,
    rank
  }
};

type Entry = [string, number];

const mapHandCards = (cards: string[]) => {
  const cardMap: Map<string, number> = new Map();
  for (const index in cards) {
    const card = cards[index];
    if (!cardMap.has(card)) {
      cardMap.set(card, 0);
    }

    cardMap.set(card, cardMap.get(card)! + 1);
  }

  return [...cardMap.entries()].sort((a, b) => b[1] - a[1]);
}

const sortHands = (handA: Hand, handB: Hand, withJoker = false) => {
  if (handA.rank !== handB.rank) {
    return handA.rank - handB.rank;
  }

  for (let i = 0; i < 5; i++) {
    const rankA = withJoker ? jokerCardRankMap[handA.cards[i]] : cardRankMap[handA.cards[i]];
    const rankB = withJoker ? jokerCardRankMap[handB.cards[i]] : cardRankMap[handB.cards[i]];
    if (rankA !== rankB) {
      return rankA - rankB;
    }
  }

  return 0;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const hands = input.map(l => parseHand(l));
  const sorted = hands.sort(sortHands);
  let acc = 0;
  for (let i = 0; i < sorted.length;i++) {
    const hand = sorted[i];
    acc += hand.bid * (i + 1);
  }
  return acc;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const hands = input.map((l) => parseHand(l, true));
  const sorted = hands.sort((a, b) => sortHands(a, b, true));
  let acc = 0;
  for (let i = 0; i < sorted.length;i++) {
    const hand = sorted[i];
    acc += hand.bid * (i + 1);
  }
  return acc;
};

const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
