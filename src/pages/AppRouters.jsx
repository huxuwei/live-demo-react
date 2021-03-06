import * as React from "react";
import {Route, HashRouter } from 'react-router-dom'
import JoinRoom from './JoinRoom/index'
import Loading from './loading/index'
import Replayer from './replayer/index'
import AddInfo from './addInfo/index'

export default class AppRoutes extends React.Component{
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  render() {
    return (
      <HashRouter>
        <Route exact path='/' component={JoinRoom} />
        <Route path='/room' component={Loading} />
        <Route path='/replayer' component={Replayer} />
        <Route path='/AddInfo' component={AddInfo} />
        
      </HashRouter>
    )
  }

}