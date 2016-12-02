import fetch from 'isomorphic-fetch'


const graphqlServer = window.location.origin + '/graphql'


const graphQLFetcher = (graphQLParams) => {
  return new Promise((resolve, reject) => {
    fetch(graphqlServer, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/graphql'
      },
      body: graphQLParams,
    }).then(response => resolve(response.json()))
  })
}


export const asyncGetAds = () => {
  return new Promise((resolve, reject) => {
    graphQLFetcher(`
      query {
        ads {
          id,
          headline,
          headline1,
          headline2,
          body
        }
      }
    `).then(json => resolve(json.data))
  })
}


export const asyncAddAd = (text) => {
  return new Promise((resolve, reject) => {
    graphQLFetcher(`
      mutation {
        addAd()
      }
    `).then(json => resolve(json.data.addAd))
  })
}
