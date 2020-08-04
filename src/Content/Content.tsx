import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MdEditor from './MdEditor'

interface AppContentType {
  currentItem: string
}
const AppContent: React.FC<AppContentType> = ({ currentItem }) => {
  const [mdContent, setMdContent] = useState('')
  useEffect(() => {
    axios
      .get(`./api/docs/${currentItem}.md`)
      .then((res) => {
        setMdContent(res.data)
      })
      .catch((err) => {})
  }, [currentItem])
  return <>{mdContent && <MdEditor mdValue={mdContent} />}</>
}
export default AppContent
