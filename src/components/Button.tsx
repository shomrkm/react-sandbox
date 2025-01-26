import { ComponentProps } from "react"

type Props = { className?: string } & ComponentProps<"button">

export const Button: React.FC<Props> = (props) => {
  return <button {...props} className={`rounded-lg border border-transparent px-3 py-2 text-base font-medium bg-gray-900 cursor-pointer transition-colors duration-200 hover:border-blue-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-webkit-focus-ring-color ${props.className}`}>
    {props.children}
  </button>
}