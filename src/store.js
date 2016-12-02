import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient from 'apollo-client';
import reducers from './redux'
import thunkMiddleware from 'redux-thunk'

const client = new ApolloClient();

const initialState = {}


const store = createStore(
    combineReducers({
    ...reducers,
    apollo: client.reducer(),
  }),
  initialState,
  compose(
      applyMiddleware(thunkMiddleware),
      // If you are using the devToolsExtension, you can add it here also
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);

export default store