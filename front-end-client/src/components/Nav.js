import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: black;
`;

const H1Title = styled.h1`
  margin-left: 40px;
  color: white;
`;

const DivLinkButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LinkNavButton = styled(Link)`
  text-decoration: none;
  user-select: none;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 20px;
  }

  &:last-child {
    padding: 0 0 0 20px;
    margin-right: 40px;
    border-left: 1px solid black;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Nav = props => {
  return (
    <DivWrapper>
      <H1Title>Jokes App</H1Title>
      <DivLinkButtons>
        <LinkNavButton to={props.signinLink}>Sign In</LinkNavButton>
        <LinkNavButton to={props.signupLink}>Sign In</LinkNavButton>
        <LinkNavButton to={props.allJokesLink}>Jokes</LinkNavButton>
        <LinkNavButton to={props.logoutLink}>Logout</LinkNavButton>
      </DivLinkButtons>
    </DivWrapper>
  );
};

export default Nav;
