import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Nav from './components/Nav';
import WelcomePage from './views/WelcomePage';

/***************************************************************************************************
 ********************************************* Variables *******************************************
 **************************************************************************************************/
const bLinks = {
  server: 'http://localhost:3300',
  register: `/api/register`,
  login: `/api/login`,
  jokes: `/api/jokes`
};

const fLinks = {
  home: '/',
  signup: 'signup/',
  signin: 'signin/',
  allJokes: 'jokes/all/',
  logout: 'logout'
};

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: #10101f;
    height: 100%;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class App extends Component {
  render() {
    return (
      <DivWrapper>
        <GlobalStyle />
        <Nav
          signinLink={`${fLinks.home}${fLinks.home.signin}`}
          signupLink={`${fLinks.home}${fLinks.home.signup}`}
          allJokesLink={`${fLinks.home}${fLinks.home.allJokes}`}
          logoutLink={`${fLinks.home}${fLinks.home.logout}`}
        />

        <Route exact path={`${fLinks.home}`} render={() => <WelcomePage />} />
      </DivWrapper>
    );
  }
}

export default withRouter(App);
