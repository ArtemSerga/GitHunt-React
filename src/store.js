import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient from 'apollo-client';

// import { todoReducer, userReducer } from './reducers';

const client = new ApolloClient();

const store = createStore(
  combineReducers({
    // todos: todoReducer,
    // users: userReducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);

export default store