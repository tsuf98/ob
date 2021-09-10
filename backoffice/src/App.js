import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Home from './components/Home';
import Styled from 'styled-components';
import Navbar, { PICTURES, TILES } from './components/Navbar';

function App() {
  return (
    <Router>
      <Page>
        <Navbar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Content>
          <Switch>
            <Route path={TILES}>
              <About />
            </Route>
            <Route path={PICTURES}>
              <Users />
            </Route>
            <Route path={PICTURES}>
              <Users />
            </Route>
            <Route path={PICTURES}>
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>
      </Page>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

const Page = Styled.div`
background-color: #eee;
height: 100vh;
`;

const Content = Styled.div`
padding: 20px;
width: 100vw;
`;

export default App;
