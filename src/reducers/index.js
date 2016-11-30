import { combineReducers } from 'redux'
import insertions from './insertions'
import ads from './ads'
import source from './source'
import targets from './targets'
import active from './active'
import targetToAdIds from './targetToAdIds'


const reducers = combineReducers({
  source,
  insertions,
  ads,
  targets,
  active,
  targetToAdIds,
  // events,
})


export default reducers
