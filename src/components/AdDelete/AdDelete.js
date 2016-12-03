import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { deleteAd } from '../../actions/ads'
import React from 'react';
import Button from "react-bootstrap/lib/Button";
// import s from './AdDelete.css'
const s = {AdDelete: 'AdDelete'}


const DELETE_AD_QURY = gql`
  mutation deleteAd($id: Int!) {
    deleteAd(id: $id) {
      id
    }
  }
`


const AdDelete = ({ dispatch, id, isValidAd, submit }) => (
    <div className={s.AdDelete}>
      <Button
          bsStyle={ isValidAd ? 'success' : 'danger' }
          className="btn-circle"
          bsSize="sm"
          onClick={e => {
            submit(id)
            .then(result => {
              dispatch(deleteAd(id))
            })
          }}
      >x</Button>
    </div>
)


const AdDeleteWithMutate = graphql(DELETE_AD_QURY, {
    props: ({ mutate }) => ({
      submit: (id) => {
        return mutate({variables: {id}})
      }
    }),
})(AdDelete)


export default connect()(AdDeleteWithMutate)
