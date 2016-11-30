import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient from 'apollo-client';
import reducers from './reducers'
const client = new ApolloClient();


const initialState = {}


const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    ...reducers,
  }),
  initialState,
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);

export default store