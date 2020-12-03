import React from 'react'
import Typist from 'react-typist'
import { PageHeader as Header } from 'antd'
import { useHistory } from 'react-router-dom'

const PageHeader: React.FC = () => {
  const history = useHistory()
  return (
    <Header
      className="site-page-header"
      style={{ border: '1px solid rgb(235, 237, 240)' }}
      onBack={(): void => {
        history.push('/')
      }}
      title="NaNa's World"
      extra={[
        <Typist key={1} stdTypingDelay={10} avgTypingDelay={40} cursor={{ show: false }}>
          have fun
          <Typist.Delay ms={500} />
        </Typist>,
      ]}
      subTitle="❤️"
      avatar={{ src: `${process.env.PUBLIC_URL}/cat.jpg` }}
    />
  )
}
export default PageHeader
