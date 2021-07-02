import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import PageHeader from 'components/PageHeader'
import { BackTop } from 'antd'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Questions from './pages/Questions'

const AppRoute: React.FC = () => {
  return (
    <Router>
      <PageHeader />
      <Switch>
        <Route path="/questions" exact>
          <Questions />
        </Route>
        <Route path="/:fileId">
          <Docs />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <BackTop />
    </Router>
  )
}
export default AppRoute
