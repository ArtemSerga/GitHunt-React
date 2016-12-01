import React from 'react'
import { connect } from 'react-redux'
import Insertion from '../Insertion/Insertion'



const InsertionList = ({ source, insertions, events }) => {
  let items = []

  for (let name in insertions) {
    let insertion = insertions[name]
    items.push(
      <Insertion
        key={name}
        name={name}
        {...insertion}
      />
    )
  }

  return (
    <div>
      {items}
    </div>
  )
}


const mapStateToProps = (state) => ({
  source: state.source,
  insertions: state.insertions,
  events: state.events,
})


export default connect(mapStateToProps)(InsertionList)
