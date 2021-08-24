import React from "react";
import { Button } from "react-bootstrap";
import Header from "../../components/Header/Header";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <MainScreen title="Department's Overall Performance">
        <div>
          {/* <Link to="/admissions">
            <Button>Admissions</Button>
          </Link>
          <Button>Academics</Button>
          <Button>Evaluation</Button>
          <Button>Reaserch Visibility</Button>
          <Button>Industry Connect</Button> */}
        </div>
      </MainScreen>
    </>
  );
};

export default Home;
