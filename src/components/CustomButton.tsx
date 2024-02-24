import React, { forwardRef } from "react"


export type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: string | React.ReactNode
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
}

const CustomButton = forwardRef<HTMLDivElement, Props>((props, ref) => {

  const { children, leftIcon, rightIcon, ...other } = props

  return (
    <div ref={ref} className="button-19" {...other} >
      {leftIcon}
      {children}
      {rightIcon}
      <div className="button-background" ></div>
    </div>
  )
})

export default CustomButton
