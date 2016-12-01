import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo, editAd } from '../../actions/ads'
import AdField, {getValue, getMask } from '../AdField/AdField'
import AdDelete from '../AdDelete/AdDelete'
// import s from './Ad.css'

const s = {Ad: 'Ad'}


export const isValidAd = (ad, insertions, target) => {

  for (let name in target.fields) {
    let mask = ad[name]
    if (!mask) return false

    let field = target.fields[name]
    let value = getValue(mask, insertions)
    if (value.length > field.max) return false

    for (let key in insertions) {
      let label = insertions[key].label
      if (value.search(label) != -1) return false
    }
  }

  return true
}


class Ad extends Component {

  render() {
    let { ad, insertions, target, active } = this.props
    let isValid = isValidAd(ad, insertions, target)
    let adFields = []
    for (let name in target.fields) {
      let field = target.fields[name]
      let mask = ad[name] || ''
        adFields.push(
        <AdField
          key={name}
          adId={ad.id}
          name={name}
          mask={mask}
          placeholder={field.placeholder}
          target={target}
          limit={field.max}
        />
      )
    }

    return (
      <div
          className={s.Ad}
          /*style={{ opacity: isValid ? 1 : 0.5 }}*/
      >
        {adFields}
        <AdDelete
          id={ad.id}
          isValidAd={isValid}
        />
        <div style={{ clear: 'both' }}></div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  targets: state.targets,
  active: state.active,
  insertions: state.insertions,
})


export default connect(mapStateToProps)(Ad)
