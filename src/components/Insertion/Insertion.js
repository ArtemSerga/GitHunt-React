import React, { Component } from 'react'
import { connect, dispatch } from 'react-redux'

import { sortAds } from '../../actions/targetToAdIds'
import { setActive } from '../../actions/active'
import { editInsertion } from '../../actions/insertions'

// import s from './Insertion.css'
const s = {Insertion: 'Insertion', InsertionName: 'InsertionName', InsertionValue: 'InsertionValue'}


class Insertion extends Component {

  handleFocus(e) {
    this.props.dispatch(
      setActive(
        this.constructor.name,
        this.props.label,
      )
    )
  }

  handleBlur(e) {
    this.props.dispatch(
      setActive(
        this.constructor.name,
        null,
      )
    )
  }


  handleChange(e) {
    let {
      dispatch,
      name,
      insertions,
      active,
      targets,
      ads,
    } = this.props

    e.preventDefault();
    let value = e.target.value;
    dispatch(editInsertion(name, value))

    // Sort
    const activeTargets = active.targetIds.map(tid => targets[tid])
    dispatch(sortAds(activeTargets, ads, insertions))

  }

  render() {
    let {
      label,
      placeholder,
      value,
      active,
    } = this.props

    const isHighlighted = (
        active.Insertion === this.props.label
    ) || (
        active.AdField
        && active.AdField.mask
        && active.AdField.mask.search(label) != -1
    )

    return (

      <div className={s.Insertion}>
        <div className={s.InsertionName}>
          {label}
        </div>
        <div>
          <input
            className={s.InsertionValue}
            placeholder={placeholder}
            value={value}
            style={{ backgroundColor: isHighlighted ? 'lightgoldenrodyellow' : 'white' }}
            onChange={e => {this.handleChange(e)}}
            onFocus={e => {this.handleFocus(e)}}
            onBlur={e => {this.handleBlur(e)}}
          />
        </div>
        {/*<InsertionClear name={name} />*/}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  insertions: state.insertions,
  ads: state.ads,
  active: state.active,
  targets: state.targets,
})


export default connect(mapStateToProps)(Insertion)


