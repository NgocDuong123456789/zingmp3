import { Skeleton } from '../Skeleton/Skeleton'
interface ButtonProps {
  isLoading?: boolean
  children: React.ReactNode,
  className?:string
}
export const Button = ({ isLoading, children , className }: ButtonProps) => {
  return (
    <button className={className}>
      {isLoading && <Skeleton />}
      <span>{children}</span>
    </button>
  )
}
