import React from 'react'


// import s from './AdFieldCounter.css'
const s = {AdFieldCounter: 'AdFieldCounter'}

const AdFieldCounter = ({ value, limit }) => {
  let chars = limit - value.length
  var color
  if (value.length === 0) {
    color = 'lightgrey'
  } else if (chars >= 0) {
    color = 'green'
  } else {
    color = 'red'
  }
  return (
      <div className={s.AdFieldCounter}>
        <span
          style={{
            color: color
          }}
        >
          { limit - value.length }
        </span>
      </div>
  )
}

export default AdFieldCounter
