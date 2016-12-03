import React from 'react';
import Row from 'react-bootstrap/lib/Row'
import { connect } from 'react-redux';
import Ad from '../Ad/Ad';
import Col from 'react-bootstrap/lib/Col'
import { isTargetActive } from '../Target/Target'
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import update from 'react-addons-update';


// import s from './AdList.css'
const s = {AdList: 'AdList'}

export const ADS_Q = gql`
  query { 
    ads {
      id
      headline
      headline1
      headline2
      body
    } 
  }
`

let AdList = ({ target, data: {loading, ads}, targetToAdIds, active }) => {
  if (loading) {
    return <div>Loading ads</div>
  } else {
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
  targetToAdIds: state.targetToAdIds,
})



const AdListWithData = graphql(
  ADS_Q,
  {
    options: ({ params }) => {
      return {
        reducer: (previousResult, action) => {
          if (action.type === 'APOLLO_MUTATION_RESULT') {
            switch(action.operationName) {
              case 'addAd':
                return update(previousResult, {
                  ads: {
                    $push: [action.result.data.addAd],
                  },
                })
              // case 'deleteAd':
              //   const deletedId = action.result.data.deleteAd.id
              //   return update(previousResult, {
              //     ads: {
              //       $set: previousResult.ads.filter(ad => {
              //         return ad.id != deletedId
              //       })
              //     },
              //   })
            }
          }
          return previousResult;
        }
      }
    }
  }
)(AdList)

export default connect(mapStateToProps)(AdListWithData)

// export default compose(
//     graphql(ADS_Q),
//     connect(mapStateToProps)(AdList)
// )
