import { CardType } from "../app/hook/useGameState";

const radomzie = (arrayLength: number) => {
  return Math.floor(Math.random() * arrayLength);
};

function shuffleImmutable(array: CardType[]): CardType[] {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = radomzie(i + 1);

    const temp = shuffledArray[i];

    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  return shuffledArray;
}

export { radomzie, shuffleImmutable };
