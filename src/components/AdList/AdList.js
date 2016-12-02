import React, {Component} from 'react';
import Row from 'react-bootstrap/lib/Row'
import { connect } from 'react-redux';
import Ad from '../Ad/Ad';
import Col from 'react-bootstrap/lib/Col'
import { isTargetActive } from '../Target/Target'
import {receiveAds} from "../../actions/ads";


// import s from './AdList.css'
const s = {AdList: 'AdList'}


class AdList extends Component {

  // componentDidMount() {
  //   const { receiveTodos } = this.props
  //   receiveAds()
  // }

  render() {
    let { target, ads, targetToAdIds, active } = this.props
    let adMap = {}
    ads.forEach(ad => {adMap[ad.id] = ad})
    const adIds = targetToAdIds[target.id]
    const adList = adIds.map(adId => {
      let ad = adMap[adId]
      return (
          <Ad
            key={ad.id}
            target={target}
            ad={ad}
          />
      )
    })

    const colLength = active.targetIds.length == 2 ? 6 : 12

    return (
      <Col
          className={s.AdList}
          md={colLength}
          style={{
            display: isTargetActive(target.id, active) ? 'block' : 'none',
          }}
      >
        <h3>{target.label}</h3>
        <Row>
          {adList}
        </Row>
      </Col>
    )
  }
}


const mapStateToProps = (state) => ({
  insertions: state.insertions,
  active: state.active,
  ads: state.ads,
  targetToAdIds: state.targetToAdIds,
})


export default connect(mapStateToProps)(AdList)

