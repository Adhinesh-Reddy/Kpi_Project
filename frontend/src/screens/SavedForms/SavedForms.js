import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Header from "../../components/Header/Header";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SavedForms = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();

  const [data, setData] = useState([
    {
      form: "loading...",
    },
  ]);

  const handleEdit = (id) => {
    history.push(`/editform/${id}`);
  };

  const handleDelete = (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios
        .delete(`http://localhost:5000/api/kpi/kpi4_5/${id}`, config)
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getdata = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios.get("http://localhost:5000/api/kpi/kpi4_5", config).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  console.log(data);

  return (
    <>
      <Header />
      <MainScreen title="Saved Forms">
        {data.map(function (i) {
          return (
            <Card>
              <Card.Header style={{ display: "flex" }}>
                <span style={{ alignSelf: "center", width: "100%" }}>
                  {i.form}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleEdit(i._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  style={{ marginLeft: "20px" }}
                  onClick={() => {
                    handleDelete(i._id);
                  }}
                >
                  Delete
                </Button>
              </Card.Header>
            </Card>
          );
        })}
      </MainScreen>
    </>
  );
};

export default SavedForms;
