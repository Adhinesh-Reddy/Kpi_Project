import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Kpi Project
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link>
              <Link
                to="/home"
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/savedforms"
                style={{ color: "white", textDecoration: "none" }}
              >
                Saved Forms
              </Link>
            </Nav.Link>
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  history.push("/profile");
                }}
              >
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  history.push("/");
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
