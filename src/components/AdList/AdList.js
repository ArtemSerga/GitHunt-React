import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row'
import { connect } from 'react-redux';
import Ad from '../Ad/Ad';
import Col from 'react-bootstrap/lib/Col'
import { isTargetActive } from '../Target/Target'
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import update from 'react-addons-update';
import { initTargetToAds, DEFAULT } from "../../redux/targetToAdIds";


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

class AdList extends Component {
  componentDidUpdate() {
    // TODO: Refactor cause this is crazy solution
    // to dispatch action for initialize `targetToAdIds`
    let {data, dispatch, targetToAdIds } = this.props
    if(targetToAdIds == DEFAULT) {
      let adIds = data.ads.map(ad => ad.id)
      dispatch(initTargetToAds(adIds))
    }
  }

  render() {
    const { dispatch, target, data, targetToAdIds, active } = this.props
    if (data.loading) {
      return <div>Loading ads</div>
    } else {
      let adMap = {}
      data.ads.forEach(ad => {adMap[ad.id] = ad})
      var adIds = targetToAdIds[target.id]
      if(!adIds.length) {
        adIds = Object.keys(adMap)
      }
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
}

const mapStateToProps = (state) => ({
  insertions: state.insertions,
  active: state.active,
  targetToAdIds: state.targetToAdIds,
})



const queryOptions = {
  // props: ({ ownProps, data }) => {
  //   return {
  //     dispatch: ownProps.dispatch,
  //     data,
  //     initTargetToAds,
  //   }
  // },
  options: (props) => {
    return {
      reducer: (previousResult, action) => {
        switch (action.type) {

          // case 'APOLLO_QUERY_RESULT': {
          //   props.dispatch(initTargetToAds([]))
          // }

          case 'APOLLO_MUTATION_RESULT':
            switch(action.operationName) {
              case 'addAd':
                return update(previousResult, {
                  ads: {
                    $push: [action.result.data.addAd],
                  },
                })
              // case 'updateAd':
              //   return update(previousResult, {
              //     ads: {
              //       $push: [action.result.data.addAd],
              //     },
              //   })
              // Don't know why but it works without case 'deleteAd':
              case 'deleteAd':
                const deletedId = action.result.data.deleteAd.id
                return update(previousResult, {
                  ads: {
                    $set: previousResult.ads.filter(ad => {
                      return ad.id != deletedId
                    })
                  },
                })
            }
        }
        return previousResult;
      }
    }
  }
}


const withData = graphql(ADS_Q, queryOptions)

// const AdListWithData = withData(AdList)

// export default connect(mapStateToProps)(AdListWithData)

export default compose(
    withData,
    connect(mapStateToProps),
)(AdList)
