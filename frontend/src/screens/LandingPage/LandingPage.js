import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Header1 from "../../components/Header/Header1";
import "./LandingPage.css";

const LandingPage = () => {
  const history = useHistory();

  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
  }, [history, userInfo]);

  return (
    <>
      <Header1 />
      <div className="main">
        <Container>
          <Row>
            <div className="intro-text">
              <div>
                <h1 className="title">Welcome to Kpi Project</h1>
                {/* <p className="subtitle">One Safe place for all your notes.</p> */}
              </div>
              <div className="buttonContainer">
                <Link to="/login">
                  <Button size="lg" className="landingbutton">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="landingbutton"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LandingPage;
