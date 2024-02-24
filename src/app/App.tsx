import CustomButton from "../components/CustomButton";
import Card, { CardStyles } from "../components/Card";
import CustomDialog from "../components/CustomDialog";

import ProgressBar from "../components/ProgressBar";
import './App.css';
import '../components/cardStyle.css'
import useGameState from "./hook/useGameState";
import { shuffleImmutable } from "../utils/helper";

const cardStyles: CardStyles[] = ['card', "card2", 'card3', "card4", 'card5']

export default function CardGamePage() {

  const {
    cardStates,
    finishedPair,
    handleCardClick,
    setCardStates,
    setFinishedPair,
    setPreFlippedCard,
    losingCondition,
    setTimer,
    strike,
    timeout,
    timer,
    dummyCard,
    setDummyCard,
    backgroundeTheme,
    setBackgroundTheme,
    currentStyle,
    setCurrentStyle,
    currentGameTheme,
    setCurrentGameTheme,
    openSetting,
    setOpenSetting
  } = useGameState()

  return (
    <>
      <div className={` w-screen h-screen`}
        style={{
          position: 'relative',
          opacity:
            timer === losingCondition || finishedPair.length === cardStates.length / 2 ? 0.5 : 1,
          backgroundColor: currentGameTheme.backgroundColor,
          paddingTop: 70,
          paddingBottom: 100
        }}>
        <div style={{
          position: 'fixed',
          top: 10,
          left: '12vw',
          right: '12vw',
          display: 'flex',
          flexDirection: 'column',
          rowGap: 12,
        }}>
          <div style={{ display: 'flex', gap: 16, justifyContent: "center", alignItems: 'center' }}>

            <CustomDialog
              open={openSetting}
              onOpenChange={() => {
                if (timer === losingCondition || finishedPair.length === cardStates.length / 2) return
                setOpenSetting(pre => {
                  return !pre
                })
              }}
              children={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                  <label htmlFor="background-color-input" style={{
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    display: "flex", justifyContent: "center", alignItems: 'center'
                  }}>BG: {'<'}<input id="background-color-input" className="style2" type="color" value={backgroundeTheme} style={{ borderRadius: '50%' }} onChange={e => {
                    setBackgroundTheme(e.target.value)
                  }} />{'>'}</label>

                  <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {cardStyles.map(a => {
                      return <CustomButton key={a} onClick={() => {
                        setCurrentStyle(a)
                      }} style={{ padding: 5 }} children={<div className={`${a} rounded-xl`} style={{ width: 50, height: 50 }}></div>} />
                    })}
                  </div>
                  <div className=" flex px-1 py-8 rounded-lg gap-7"
                    style={{
                      backgroundColor: backgroundeTheme
                    }}>
                    <Card image={dummyCard.image}
                      isFlipped={dummyCard.flip} onClick={() => {
                        setDummyCard(pre => {
                          return { ...pre, flip: !pre.flip }
                        })
                      }}
                      style={{
                        margin: 'auto'
                      }}
                      cardStyle={currentStyle}
                    />

                  </div>
                </div>
              }
              bottomRightButton={{
                children: 'save', onClick() {
                  setCurrentGameTheme({ backgroundColor: backgroundeTheme, cardStyle: currentStyle })
                }
              }}
            />
            <ProgressBar
              progress={timer / timeout * 100}
              containerStyle={{
                height: 15,
                marginLeft: 'auth',
                marginRight: 'auto',
                zIndex: 999999999
              }} />
            <p style={{ color: 'white', textAlign: "center", fontSize: '1.2rem', fontWeight: 'bold' }} className="font-mono">{timer < 0 ? 0 : timer + 1}</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', paddingInline: '10vw' }}>
          <p
            style={{
              color: 'white',
              paddingLeft: 20,
              paddingTop: 8,
              fontSize: '1.2rem',
              textTransform: 'capitalize'
            }}
            className="font-mono text-xl left-1.5"
          >strike: {strike}
          </p>
          <CustomButton children="restart" style={{ width: '12vw', minWidth: 100, height: 50, fontSize: '1.2rem' }} onClick={() => {

            if (finishedPair.length === cardStates.length / 2 || timer === losingCondition) {
              console.log('win or lose button should be disabled')
              return
            }

            setPreFlippedCard(undefined)
            setFinishedPair([])
            setTimer(timeout)
            setCardStates(pre => {
              return pre.map(a => { return { ...a, flip: false } })
            })
            setTimeout(() => {

              setCardStates(shuffleImmutable)
            }, 600);
          }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            columnGap: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 12,
            maxWidth: '90%',
            minWidth: 500,
            margin: 'auto',
            position: 'relative',
          }}>
          {cardStates.map((card, index) => (
            <Card
              image={card.image}
              key={index}
              isFlipped={card.flip}
              cardStyle={currentGameTheme.cardStyle}
              onClick={() => {
                handleCardClick(card)
              }} />
          ))}


        </div>

      </div>
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex flex-col justify-center align-middle"
        style={{ zIndex: 99999, gap: 24 }}
      >
        {timer === losingCondition && (
          <p className="text-6xl font-mono" style={{ color: '#FF3C38', fontWeight: 'bold' }}>You Lose . . . </p>
        )}

        {finishedPair.length === cardStyles.length / 2 &&
          <p className="text-6xl font-mono" style={{ color: '#FF3C38', fontWeight: 'bold' }}>You Won ! ! ! </p>
        }

        {finishedPair.length === cardStates.length / 2 || timer === losingCondition ?
          <CustomButton
            onClick={() => {
              setPreFlippedCard(undefined)
              setFinishedPair([])
              setTimer(timeout)
              setCardStates(pre => {
                return pre.map(a => { return { ...a, flip: false } })
              })
              setTimeout(() => {

                setCardStates(shuffleImmutable)
              }, 600);
            }}
            children={timer === losingCondition ? 'Try again' : 'Replay'}
          />
          : null
        }
      </div>
    </>
  );
}