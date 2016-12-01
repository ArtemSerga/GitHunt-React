import { connect } from 'react-redux'
import { deleteAd } from '../../actions/ads'
import React from 'react';
import Button from "react-bootstrap/lib/Button";
// import s from './AdDelete.css'
const s = {AdDelete: 'AdDelete'}


const AdDelete = ({ dispatch, id, isValidAd }) => (
    <div className={s.AdDelete}>
      <Button
          bsStyle={ isValidAd ? 'success' : 'danger' }
          className="btn-circle"
          bsSize="sm"
          onClick={e => {
            dispatch(deleteAd(id))
          }}
      >x</Button>
    </div>
)


export default connect()(AdDelete)
