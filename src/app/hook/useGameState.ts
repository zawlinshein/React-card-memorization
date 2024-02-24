import { useEffect, useState } from "react";
import { cards } from "../../data/data.js";
import { shuffleImmutable } from "../../utils/helper";
import { CardStyles } from "../../components/Card";

export type CardType = {
  same_id: number;
  image: string;
  flip: boolean;
  id: number;
};

export default function () {
  const timeout = 29;

  const [currentGameTheme, setCurrentGameTheme] = useState<{
    backgroundColor: string;
    cardStyle: CardStyles;
  }>({
    backgroundColor: "#083344",
    cardStyle: "card",
  });

  const [currentStyle, setCurrentStyle] = useState<CardStyles>("card");

  const losingCondition = -1;

  const [cardStates, setCardStates] = useState<CardType[]>(
    cards.map((card) => ({ ...card }))
  );

  const [preFlippedCard, setPreFlippedCard] = useState<CardType | undefined>();

  const [finishedPair, setFinishedPair] = useState<number[]>([]);

  const [strike, setStrike] = useState(0);

  const [timer, setTimer] = useState(timeout);

  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const [backgroundeTheme, setBackgroundTheme] = useState<string>("#083344");

  const [dummyCard, setDummyCard] = useState<CardType>({
    flip: false,
    id: 999,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzuBcbaTKKxwpdt0ERlxQD2mJF9Mi9x5Du2Q&usqp=CAU",
    same_id: 0,
  });

  // timer
  useEffect(() => {
    if (timer > losingCondition) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (cardStates.length / 2 === finishedPair.length) {
      // If winning condition is met, stop the timer
      setTimer(losingCondition - 1);
    }
  }, [finishedPair]);

  // shuffle for the first time
  useEffect(() => {
    setCardStates((pre) => {
      return shuffleImmutable(pre);
    });
  }, []);

  // handle every game state in here
  const handleCardClick = (card: CardType) => {
    if (timer === losingCondition) return;

    if (card.id === preFlippedCard?.id) return;

    if (finishedPair.includes(card.same_id)) return;

    setCardStates((pre) => {
      return pre.map((a) => {
        return a.id === card.id ? { ...a, flip: true } : a;
      });
    });

    if (preFlippedCard) {
      if (preFlippedCard.same_id === card.same_id) {
        if (finishedPair.length > 0) {
          setStrike((pre) => {
            return pre + 1;
          });
        }

        setFinishedPair((pre) => {
          return [...pre, card.same_id];
        });

        setPreFlippedCard(undefined);
      } else {
        setTimeout(() => {
          setCardStates((pre) => {
            return pre.map((a) => {
              return a.same_id === card.same_id || a.id === preFlippedCard.id
                ? { ...a, flip: false }
                : a;
            });
          });
        }, 600);

        setStrike((pre) => {
          if (pre > 0) return pre - 1;
          return pre;
        });

        setTimeout(() => {
          setPreFlippedCard(undefined);
        }, 600);
      }
    } else {
      setPreFlippedCard(card);
    }
  };

  useEffect(() => {
    console.log(timer);
  }, [timer]);

  return {
    timeout,
    timer,
    setTimer,
    cardStates,
    setCardStates,
    setPreFlippedCard,
    finishedPair,
    setFinishedPair,
    handleCardClick,
    strike,
    losingCondition,
    dummyCard,
    setDummyCard,
    backgroundeTheme,
    setBackgroundTheme,
    currentStyle,
    setCurrentStyle,
    currentGameTheme,
    setCurrentGameTheme,
    openSetting,
    setOpenSetting,
  };
}
