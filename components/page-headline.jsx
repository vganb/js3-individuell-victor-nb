import { cn } from "@/lib/utils"


const PageHeadline = ({children, className}) => {
  return (
      <h1 className={cn("text-4xl font-bold text-center mb-4 mt-2 uppercase" , className)}>{ children }</h1>
  )
}
export default PageHeadline