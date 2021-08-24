import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header1 = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Kpi Project
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header1;
