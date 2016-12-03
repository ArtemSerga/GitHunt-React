import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import AdAdd from './AdAdd/AdAdd'
import Sidebar from './Sidebar/Sidebar'
import SortAds from './SortAds/SortAds'
import Content from './Content/Content'


import Navigation from './Navigation/Navigation'


const App = () => (
  <Grid fluid style={{ padding: 0 }}>
    {/*<Navigation/>*/}

    <Row>
      {/*<Sidebar />*/}
      <Content />
    </Row>

    {/*<SortAds />*/}
    <AdAdd />
  </Grid>
)


export default App

