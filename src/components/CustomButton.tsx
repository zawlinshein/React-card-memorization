import React from "react"
import * as Dialog from '@radix-ui/react-dialog'



export type Props = Dialog.DialogTriggerProps
  & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  & {
    children: string | React.ReactNode
    rightIcon?: React.ReactNode
    leftIcon?: React.ReactNode
  }

const CustomButton = (props: Props) => {

  const { children, leftIcon, rightIcon, ...other } = props

  return (
    <div className="button-19" {...other} >
      {leftIcon}
      {children}
      {rightIcon}
      <div className="button-background" ></div>
    </div>
  )
}

export default CustomButton
