import Button from 'react-bootstrap/lib/Button'
import { connect } from 'react-redux'
import { addAd } from '../../actions/ads'
import React from 'react'

// import s from './AdAdd.css'
const s = {AdAdd: 'AdAdd'}

const AdAdd = ({ dispatch }) => (
    <Button
        bsStyle="success"
        bsSize="large"
        className={s.AdAdd + ' btn-circle'}
        onClick={e => {
          e.preventDefault()
          dispatch(addAd())
        }}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
        }}

    >+</Button>
)


export default connect()(AdAdd)
