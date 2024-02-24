
import { useEffect, useRef } from 'react';

export type CardStyles = 'card' | 'card2' | 'card3' | 'card4' | 'card5';

export type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  isFlipped: boolean;
  image: string,
  cardStyle?: CardStyles
}

export default function Card(props: Props) {

  const { isFlipped, image, cardStyle = 'card', ...other } = props

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const { current } = cardRef;

    const handleMouseOver = () => {
      const randomRotation = Math.floor(Math.random() * 11) - 5;
      current!.style.transform = `scale(1.09) rotate(${randomRotation}deg)`;
      current!.style.zIndex = `10000`;
    };

    const handleMouseOut = () => {
      current!.style.transform = 'scale(1.0) rotate(5deg)';
      current!.style.zIndex = `0`;
    };

    current?.addEventListener('mouseover', handleMouseOver);
    current?.addEventListener('mouseout', handleMouseOut);

    return () => {
      current?.removeEventListener('mouseover', handleMouseOver);
      current?.removeEventListener('mouseout', handleMouseOut);
    };

  }, [])

  return (

    <div onAnimationEnd={e => console.log('animation end')} onAnimationEndCapture={e => console.log(e)} onAnimationStart={e => console.log("animation start")} onAnimationStartCapture={e => console.log(e)} ref={cardRef} style={{ transform: 'rotate(5deg)' }} className="flip-card "{...other}>
      <div className="flip-card-inner" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(5deg)' }}>
        <div className={`flip-card-front ${cardStyle}`}>
        </div>
        <div className={`flip-card-back  ${cardStyle}`} style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
          <img src={image} style={{ width: '70%', height: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
}