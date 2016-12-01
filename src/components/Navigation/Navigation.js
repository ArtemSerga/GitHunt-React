import React from 'react'
import Source from '../Source/Source'
import TargetList from '../TargetList/TargetList'
import Row from 'react-bootstrap/lib/Row'


const s = {Navigation: 'Navigation'}
// import s from './Navigation.css'


const Navigation = () => (
  <div className={s.Navigation}>
    <Row>
      <Source/>
      <TargetList/>
    </Row>
  </div>
)

export default Navigation
