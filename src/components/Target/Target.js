import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import { setActive, toggle } from '../../actions/active'
import { sortAds } from '../../actions/targetToAdIds'

// import s from './Target.css'
const s = {Target: 'Target'}

export const isTargetActive = (tid, active) => {
  return active.targetIds.indexOf(tid) != -1
}


class Target extends Component {

  handleClick(e) {
    let { target, insertions, dispatch, ads, active } = this.props
    dispatch(toggle('targetIds', target.id))
    if (isTargetActive(target.id, active)) {
      dispatch(sortAds([target], ads, insertions))
    }
  }

  render() {
    let { target, active } = this.props
    return (
      <Button
        className={s.Target}
        active={isTargetActive(target.id, active)}
        onClick={ e => this.handleClick(e) }
      >
        { target.label }
      </Button>
    )
  }
}


const mapStateToProps = (state) => ({
  active: state.active,
  insertions: state.insertions,
  ads: state.ads,
})


export default connect(mapStateToProps)(Target)
