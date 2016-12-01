import React from 'react'
import { connect } from 'react-redux'

import AdList from '../AdList/AdList'

// import s from './Content.css'
const s = {Content: 'Content'}

const Content = ({ targets }) => {
  const targetAds = []
  for (let tid in targets) {
    let target = targets[tid]
    targetAds.push(
      <AdList key={target.id} target={ target }/>
    )
  }
  return (
    <div className={s.Content}>
      {targetAds}
    </div>
  )
}


const mapStateToProps = (state) => ({
  insertions: state.insertions,
  targets: state.targets,
  active: state.active,
  ads: state.ads,
  source: state.source,
})


export default connect(mapStateToProps)(Content)
