import React from 'react'
import { connect } from 'react-redux'
import InsertionList from '../InsertionList/InsertionList'
import Col from "react-bootstrap/lib/Col";


// import s from './Sidebar.css'
const s = {Sidebar: 'Sidebar'}

const Sidebar = ({ source }) => {
  return (
      <Col className={s.Sidebar}>
        <InsertionList />
        <img
          src={source ? source.image : ''}
          style={{
            position: 'static',
            bottom: '1rem',
            marginTop: '2rem',
            left: '1rem',
            width: '252px',
            overflow: 'scroll',
          }}
        />
      </Col>
  )
}


const mapStateToProps = (state) => ({
  source: state.source,
})


export default connect(mapStateToProps)(Sidebar)
