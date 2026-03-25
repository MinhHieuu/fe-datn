import { useState } from "react"

export const useSearch = () => {
  const [keyword, setKeyword] = useState("")

  return {
    keyword,
    setKeyword,
  }
}