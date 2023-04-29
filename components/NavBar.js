/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar({ query, setQuery }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>BANDMATES</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/musicians">
              <Nav.Link>Musicians</Nav.Link>
            </Link>
            <Link passHref href="/members/new">
              <Nav.Link>New</Nav.Link>
            </Link>
            <div>
              <input type="seach" className="ms-3 ps-2 pt-2 rounded-2" value={query} placeholder="search" onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="ms-5 ">
              <Button variant="secondary" className="btn-sm mt-1 " onClick={signOut}>Sign Out</Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,

};

NavBar.defaultProps = {
  query: '',
  setQuery: '',
};
