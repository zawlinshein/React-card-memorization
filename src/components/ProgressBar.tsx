import { CSSProperties } from 'react';
import 'react-dom'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  progress: number
  containerStyle?: CSSProperties
  progressBarStyle?: CSSProperties
}

export default function ProgressBar(props: Props) {

  const { progress = 0, containerStyle = {}, progressBarStyle, ...other } = props;

  return (
    <div className='progress-bar-container' style={containerStyle} {...other}>
      <div className='progress-bar' style={{ width: `${progress}%`, height: '100%', ...progressBarStyle }}></div>
    </div >
  )
}