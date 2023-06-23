import { Skeleton } from '../Skeleton/Skeleton'
interface ButtonProps {
  isLoading?: boolean
  children: React.ReactNode
  className?: string
  value?: string
  onClick?: (e: any) => void
}
export const Button = ({ isLoading, children, className, value, onClick }: ButtonProps) => {
  return (
    <button className={className} value={value} onClick={onClick}>
      {isLoading && <Skeleton />}
      <span>{children}</span>
    </button>
  )
}
