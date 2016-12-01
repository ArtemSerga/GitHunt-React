import React from 'react'
import { connect } from 'react-redux'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Nav from 'react-bootstrap/lib/Nav'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Target from '../Target/Target'

// import s from './TargetList.css'
const s = {TargetList: 'TargetList'}

const TargetList = ({ dispatch, targets }) => {
  const items = []
  for (let key in targets) {
    let target = targets[key]
    items.push(<Target key={key} target={target}/>)
  }
  return (
    <div className={s.TargetList}>
      <ButtonGroup>{items}</ButtonGroup>
    </div>
  )

}


const mapStateToProps = (state) => ({
  targets: state.targets
})



export default connect(mapStateToProps)(TargetList)
