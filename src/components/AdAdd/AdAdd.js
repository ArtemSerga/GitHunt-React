import Button from 'react-bootstrap/lib/Button'
import { connect } from 'react-redux'
import { addAd } from '../../actions/ads'
import { graphql } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'

// import s from './AdAdd.css'
const s = {AdAdd: 'AdAdd'}


const ADD_AD_QUERY = gql`
  mutation addAd {
    addAd {
      id
      headline
      headline1
      headline2
      body
    }
  }
`


const AdAdd = ({ dispatch, mutate }) => (
    <Button
        bsStyle="success"
        bsSize="large"
        className={s.AdAdd + ' btn-circle'}
        onClick={e => {
          mutate()
          .then(result => {
            const id = result.data.addAd.id
            dispatch(addAd(id))
          })
        }}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
        }}

    >+</Button>
)

const withData = graphql(ADD_AD_QUERY)(AdAdd)


export default connect()(withData)
