import * as Dialog from '@radix-ui/react-dialog'
import CustomButton, { Props as ButtonProps } from './CustomButton'
import { CSSProperties } from 'react'

type Props = Dialog.DialogProps & {
  children: React.ReactNode
  topLeftButton?: ButtonProps
  topRightButton?: ButtonProps
  bottomLeftButton?: ButtonProps
  bottomRightButton?: ButtonProps
  containerStyle?: CSSProperties
}

export default function (props: Props) {

  const {
    children,
    topLeftButton,
    topRightButton,
    bottomLeftButton,
    bottomRightButton,
    containerStyle = { padding: 20, gap: 12, display: 'flex', flexDirection: 'column' },
    ...other
  } = props

  return (
    <Dialog.Root {...other}>
      <Dialog.Trigger asChild disabled={true} >
        <CustomButton children={'Theme'} style={{width: 100}}/>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent" style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {topLeftButton &&
              <Dialog.Close asChild >
                <CustomButton {...topLeftButton} />
              </Dialog.Close>
            }
            {topRightButton &&
              <Dialog.Close asChild>
                <CustomButton {...topRightButton} />
              </Dialog.Close>
            }
          </div>
          {children}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {bottomLeftButton &&
              <Dialog.Close asChild >
                <CustomButton {...bottomLeftButton} />
              </Dialog.Close>
            }
            {bottomRightButton &&
              <Dialog.Close asChild>
                <CustomButton {...bottomRightButton} />
              </Dialog.Close>
            }
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}