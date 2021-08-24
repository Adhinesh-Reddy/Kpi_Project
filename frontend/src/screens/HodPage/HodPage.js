import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import client from "../../backendUrl/client";
import Header from "../../components/Header/Header";
import MainScreen from "../../components/MainScreen";

const HodPage = () => {
  const [data, setData] = useState([
    {
      name: "loading",
    },
  ]);
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const handleView = (id) => {
    history.push(`/hod/view/${id}`);
  };

  const getdata = async () => {
    try {
      client.get(`kpi/hod/data/${userInfo.email}`, config).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <Header />
      <MainScreen title="HOD Page">
        {data.map(function (i) {
          return (
            <Card>
              <Card.Header style={{ display: "flex" }}>
                <span style={{ alignSelf: "center", width: "100%" }}>
                  {i.name}, {i.form}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleView(i._id);
                  }}
                >
                  View
                </Button>
              </Card.Header>
            </Card>
          );
        })}
      </MainScreen>
    </>
  );
};

export default HodPage;
