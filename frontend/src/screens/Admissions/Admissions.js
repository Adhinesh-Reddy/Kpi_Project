import React from "react";
import MainScreen from "../../components/MainScreen";
import Header from "../../components/Header/Header";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Admissions = () => {
  return (
    <>
      <Header />
      <MainScreen title="Admissions">
        <div>
          <Link to={{ pathname: "/kpi4_5", state: { para: "kpi4_5" } }}>
            <Button>KPI 4-5</Button>
          </Link>
          <Link to={{ pathname: "/kpi4_5", state: { para: "kpi6" } }}>
            <Button>KPI 6</Button>
          </Link>
        </div>
      </MainScreen>
    </>
  );
};

export default Admissions;
