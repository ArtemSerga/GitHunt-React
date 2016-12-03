import { getValue } from '../components/AdField/AdField'
import { isValidAd } from '../components/Ad/Ad'


export const DEFAULT = {
  // GOOGLE_ADWORDS: [],
  YANDEX_DIRECT: [],
}

const INIT_TARGET_TO_ADS = 'INIT_TARGET_TO_ADS'


export const initTargetToAds = (adIds) => {
  return {
    type: INIT_TARGET_TO_ADS,
    adIds: adIds
  }
}


const targetToAdIds = (state=DEFAULT, action) => {
  switch (action.type) {

    case INIT_TARGET_TO_ADS:
      var newState = {}
      for (let target in DEFAULT) {
        newState[target] = action.adIds
      }
      return newState

    case 'ADD_AD':
      var newState = Object.assign({}, state);
      for (let key in newState) {
        newState[key].push(action.id)
      }
      return newState

    case 'DELETE_AD':
      var newState = Object.assign({}, state);
      for (let key in state) {
        newState[key] = newState[key].filter(adId => {
          return adId != action.id
        })
      }
      return newState

    case 'SORT_ADS':
      let adMap = {}
      action.ads.forEach(ad => {
        adMap[ad.id] = ad
      })

      var newState = Object.assign({}, state);

      for (let tid in action.targets) {
        let target = action.targets[tid]
        if (!target) {
          debugger
        }
        let positiveAds = new Map();
        let negativeAds = new Map();
        let invalidAds = []
        let emptyAds = []
  
        // Fill ads arrays
        for (let adId in adMap) {
          let ad = adMap[adId]
          let isEmpty = false
          let charsTotal = 0
          for (let name in target.fields) {
            let max = target.fields[name].max
            let mask = ad[name]
            if (!mask) {
              isEmpty = true
              break
            }
            let value = getValue(mask, target.insertions)
            let chars = max - value.length
            charsTotal = charsTotal + chars
          }
  
          if (isEmpty) {
            emptyAds.push(ad)
          } else if (!isValidAd(ad, action.insertions, target)) {
            invalidAds.push(ad)
          } else {
            if (charsTotal >= 0) {
              let res = positiveAds.get(charsTotal) || []
              res.push(ad)
              positiveAds.set(charsTotal, res)
            } else {
              let res = negativeAds.get(charsTotal) || []
              res.push(ad)
              negativeAds.set(charsTotal, res)
            }
  
  
            // let headline = getValue(ad.headline, action.insertions)
            // let body = getValue(ad.body, action.insertions)
            // let charsHeadline = 33 - headline.length
            // console.log(headline, charsHeadline)
            // let charsBody = 75 - body.length
            // console.log(body, charsBody)
            // let chars = charsHeadline + charsBody
            // if (headline && body && chars >= 0 && charsHeadline >= 0 && charsBody >= 0) {
            //   let res = positiveAds.get(chars) || []
            //   res.push(ad)
            //   positiveAds.set(chars, res)
            // } else {
            //   let res = negativeAds.get(chars) || []
            //   res.push(ad)
            //   negativeAds.set(chars, res)
            // }
          }
  
        }
  
        // Sort
        let sortedAds = []
        var keys
  
        keys = [...positiveAds.keys()].sort((a, b) => a-b)
        console.log('Positive', keys)
        keys.forEach(key => {
          sortedAds = sortedAds.concat(positiveAds.get(key))
        })
  
        keys = [...negativeAds.keys()].sort((a, b) => b-a)
        console.log('Negative', keys)
        keys.forEach(key => {
          sortedAds = sortedAds.concat(negativeAds.get(key))
        })
  
        console.log('Invalid', invalidAds)
        console.log('Empty', emptyAds)
  
        sortedAds = sortedAds.concat(invalidAds).concat(emptyAds)
  
        // Modify state
        newState[target.id] = sortedAds.map(ad => {
          return ad.id
        })
      }
      

      return newState

    default:
      return state

  }
  return state
}


export default targetToAdIds
