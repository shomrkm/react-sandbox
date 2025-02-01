import { ComponentPropsWithoutRef } from "react"

type Props = {
  prefixIcon?: React.ReactNode
  className?: string
} & ComponentPropsWithoutRef<"button">

export const Button: React.FC<Props> = ({ className, prefixIcon, ...props}) => {
  return <button {...props} className={`${className} bg-gray-200 text-gray-600 rounded-lg border border-transparent px-3 py-2 text-base font-medium cursor-pointer transition-colors duration-200 hover:border-blue-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-webkit-focus-ring-color flex items-center justify-center`}>
    {prefixIcon && <div className="mr-2">{prefixIcon}</div>}
    <div>{props.children}</div>
  </button>
};
