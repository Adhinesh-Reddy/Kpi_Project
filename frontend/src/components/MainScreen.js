import React, { useState } from "react";
import { Accordion, Container, ListGroup, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./MainScreen.css";
import "./style.css";

const MainScreen = ({ title, children }) => {
  const [showAdmissionDropdown, setShowAdmissionDropdown] = useState(false);

  const handleShowAdmission = () => {
    if (showAdmissionDropdown == true) {
      setShowAdmissionDropdown(false);
    } else {
      setShowAdmissionDropdown(true);
    }
  };

  const ShowAdmissions = () => {
    return (
      <>
        <Link
          to={{ pathname: "/kpi4_5", state: { para: "kpi4_5" } }}
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          KPI 4_5
        </Link>
        <hr style={{ marginLeft: "15%", width: "70%" }} />
        <Link
          to={{ pathname: "/kpi4_5", state: { para: "kpi6" } }}
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          KPI 6
        </Link>
      </>
    );
  };
  return (
    <div className="mainback">
      <div
        style={{
          borderRight: "3px solid #e95420",
          height: "700px",
          position: "absolute",
          top: "10%",
        }}
      >
        <ListGroup variant="flush" style={{ marginTop: "80%" }}>
          <p
            className="sideNavItems"
            style={{
              padding: "20px 30px",
              margin: "0px",
              textAlign: "center",
            }}
            onClick={handleShowAdmission}
          >
            Admissions
          </p>
          {showAdmissionDropdown ? <ShowAdmissions /> : null}
          {/* <p
            className="sideNavItems"
            style={{ padding: "20px 30px", margin: "0px", textAlign: "center" }}
          >
            <NavLink
              to="/admissions"
              activeStyle={{ color: "#e95420" }}
              style={{ textDecoration: "none", color: "black" }}
            >
              Academics
            </NavLink>
          </p>
          <p
            className="sideNavItems"
            style={{ padding: "20px 30px", margin: "0px", textAlign: "center" }}
          >
            <NavLink
              to="/admissions"
              activeStyle={{ color: "#e95420" }}
              style={{ textDecoration: "none", color: "black" }}
            >
              Evaluation
            </NavLink>
          </p>
          <p
            className="sideNavItems"
            style={{ padding: "20px 30px", margin: "0px", textAlign: "center" }}
          >
            <NavLink
              to="/admissions"
              activeStyle={{ color: "#e95420" }}
              style={{ textDecoration: "none", color: "black" }}
            >
              Reaserch Visibility
            </NavLink>
          </p>
          <p
            className="sideNavItems"
            style={{ padding: "20px 30px", margin: "0px", textAlign: "center" }}
          >
            <NavLink
              to="/admissions"
              activeStyle={{ color: "#e95420" }}
              style={{ textDecoration: "none", color: "black" }}
            >
              Industry Connect
            </NavLink>
          </p> */}
        </ListGroup>
        {/* <hr /> */}
      </div>
      <Container>
        <Row>
          <div className="page" style={{ marginLeft: "100px" }}>
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
