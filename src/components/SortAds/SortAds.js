import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import { connect } from 'react-redux';
import { sortAds } from '../../actions/targetToAdIds'

// import s from './SortAds.css'
const s = {SortAds: 'SortAds'}

const SortAds = ({dispatch, insertions, targets, active, ads }) => {
  return (
    <div className={s.SortAds}>
      <Button
        bsSize="lg"
        className="btn-circle"
        onClick={e => {
          dispatch(sortAds(
              active.targetIds.map(tid => targets[tid]),
              ads,
              insertions
          ))
        }}
      >
        <i className="glyphicon glyphicon-sort-by-attributes-alt"></i>
      </Button>
    </div>
  )
}


const mapStateToProps = (state) => ({
  insertions: state.insertions,
  targets: state.targets,
  active: state.active,
  ads: state.ads,
})


export default connect(mapStateToProps)(SortAds)
