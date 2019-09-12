import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import TopBar from './top_bar/top_bar';
import ModalContainer from './modal/modal_container';
import Footer from './footer/footer';
import SearchPage from './search_page';
// import SearchBarContainer from './search_bar/search_bar_container';

const App = () => (
  <div>
    <ModalContainer />
    <TopBar />
    <Route path="/search" component={SearchPage} />
    {/* <SearchBarContainer /> */}
    <Footer />
  </div>
);

export default App;