
interface GenerateSideBarProps {
  children: React.ReactNode
  className?: string
}
export const GenerateSideBar = ({ children, className }: GenerateSideBarProps) => {
  return <div className={className}>{children}</div>
}
