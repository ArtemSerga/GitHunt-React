import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdFieldCounter from '../AdFieldCounter/AdFieldCounter'

import { editAd } from '../../actions/ads'
import { setActive } from '../../actions/active'

// import s from '../AdField/AdField.css'
const s = {AdField: 'AdField'}


export const getValue = (mask, insertions) => {
  for (let key in insertions) {
    let ins = insertions[key]
    if (ins.value) {

      mask = mask.replace(
        new RegExp(`${ins.label}`, 'g'),
        `${ins.value}`
      )
    }
  }
  return mask
}


export const getMask = (value, insertions) => {
  for (let key in insertions) {
    let ins = insertions[key]

    value = value.replace(
        new RegExp(`${ins.label.slice(0, 2)}$`, 'g'),
        ins.label,
    )

    if (ins.value) {
      value = value.replace(ins.value, ins.label)
    }
  }
  return value
}


export const isValidAdField = (mask, value, limit, insertions) => {

  if (!mask) return false

  if (value.length > limit) return false

  for (let key in insertions) {
    let label = insertions[key].label
    if (value.search(label) != -1) return false
  }

  return true
}


class AdField extends Component {

  // static propTypes = {
  //   adId: React.PropTypes.string.isRequired,
  //   mask: React.PropTypes.string.isRequired,
  //   insertions: React.PropTypes.object.isRequired,
  //   limit: React.PropTypes.number.isRequired,
  //   type: React.PropTypes.string.isRequired,
  // }

  getRef() {
    let { field, adId } = this.props
    return field + adId
  }

  getActive() {
    let { adId, mask } = this.props
    return {
      adId: adId,
      mask: mask,
    }
  }

  handleFocus(e) {
    this.props.dispatch(
      setActive('AdField', this.getActive())
    )
  }

  handleChange(e) {
    let { insertions, name, adId, dispatch } = this.props
    let mask = getMask(e.target.value, insertions)
    dispatch(editAd({id: adId, name, mask}))
    dispatch(setActive('AdField', this.getActive()))
  }


  handleBlur(e) {
    this.props.dispatch(
      setActive('AdField', null)
    )
  }

  render() {
    let {
      dispatch,
      limit,
      mask,
      insertions,
      name,
      placeholder,
      adId,
      active,
    } = this.props

    const insertion = active.Insertion
    const isHighlighted = (
        (insertion && mask.search(insertion) != -1)
        || (active.AdField && active.AdField.adId === adId)
    )

    let value = getValue(mask, insertions)

    return (
      <div className={s.AdField}>
        <div className={s[name]} style={{ float: 'left' }}>
          <textarea
              ref={ this.getRef() }
              placeholder={ placeholder }
              value={ value }
              cols={ limit }
              max={ limit }
              style={{
                backgroundColor: isHighlighted ? 'lightgoldenrodyellow' : 'white',
                opacity: isValidAdField(mask, value, limit, insertions) ? 1 : 0.7
              }}
              onFocus={ e => this.handleFocus(e) }
              onChange={ e => this.handleChange(e) }
              onBlur={ e => this.handleBlur(e) }
          />
        </div>
        <AdFieldCounter
            value={ getValue(mask, insertions) }
            limit={ limit }
        />
        <div style={{ clear: 'both' }}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  active: state.active,
  insertions: state.insertions,
})


export default connect(mapStateToProps)(AdField)
