import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Header from "../../components/Header/Header";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { useHistory } from "react-router-dom";
import client from "../../backendUrl/client";

const EditForms = ({ match }) => {
  const [title, setTitle] = useState("");
  // const [handleChange, setHandleChange] = useState("");
  const [id, setId] = useState("");
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [form, setForm] = useState("");
  let [inputDataArray, setInputDataArray] = useState([]);
  let [dataArray, setDataArray] = useState([]);
  let [dataFile, setDataFile] = useState([]);
  let [inputDataFileName, setInputDataFileName] = useState([]);
  let [dataFileName, setDataFileName] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let dataArrayValues = [];
    for (let d in inputDataArray) {
      dataArrayValues.push(inputDataArray[d]);
    }
    const data = JSON.stringify(dataArrayValues);
    if (inputDataFileName[0] == null) {
      client
        .put(
          `kpi/edit/${id}`,
          {
            email,
            name,
            form,
            data,
          },
          config
        )
        .then((res) => {
          console.log(res.data);
        });
      history.push("/savedforms");
    } else {
      history.push("/savedforms");
    }
  };

  const handleChange = (e, index) => {
    e.preventDefault();
    inputDataArray[index] = e.target.value;
    setInputDataArray([...inputDataArray]);
  };

  const handleUpload = (e, index) => {
    e.preventDefault();
    let apiNumber = index + 1;
    // let dataArrayValues = [];
    // for (let d in dataArray) {
    //   dataArrayValues.push(dataArray[d].value);
    // }
    // const data = JSON.stringify(dataArrayValues);
    const formData = new FormData();
    formData.append(`kpi4_5file${apiNumber}`, dataFile);

    client.put(`kpi/edit${apiNumber}/${id}`, formData, config).then((res) => {
      console.log(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataArrayValues = [];
    for (let d in inputDataArray) {
      dataArrayValues.push(inputDataArray[d]);
    }
    const data = JSON.stringify(dataArrayValues);
    const formData = new FormData();
    formData.append("_id", id);

    const condition = true;
    if (inputDataFileName[0] == null) {
      client.post(
        "kpi/submit",
        { id, email, name, form, data, condition },
        config
      );
    } else {
      client
        .post(
          "kpi/submit",
          {
            id: id,
            condition: false,
          },
          config
        )
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  useEffect(() => {
    let form1 = "";
    client.get(`kpi/data/${match.params.id}`, config).then((res) => {
      console.log(res.data);
      setInputDataArray(res.data.dataArrayValues);
      setInputDataFileName(res.data.kpi4_5files);
      setEmail(res.data.email);
      setName(res.data.name);
      setForm(res.data.form);
      setId(res.data._id);
      form1 = res.data.form;
      client.get(`${res.data.form}/`, config).then((res) => {
        setDataArray(res.data.dataArray);
        setDataFileName(res.data.dataFileName);
      });
    });
    console.log(form1);
  }, [match.params.id]);
  return (
    <>
      <Header />
      <MainScreen title={title}>
        <Form>
          {dataArray.map((i, index) => {
            return (
              <>
                <Form.Group>
                  <Form.Label>{i.name}</Form.Label>
                  <Form.Control
                    type="text"
                    value={inputDataArray[index]}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </Form.Group>
              </>
            );
          })}
          {dataFileName.map((i, index) => {
            return (
              <>
                <Form.Group>
                  <Form.Control
                    type="file"
                    name={i.name}
                    onChange={(e) => setDataFile(e.target.files[0])}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    handleUpload(e, index);
                  }}
                >
                  Upload
                </Button>
              </>
            );
          })}
          <Button
            variant="primary"
            type="submit"
            style={{ marginTop: "20px", marginRight: "20px" }}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            variant="success"
            type="submit"
            style={{ marginTop: "20px", marginRight: "20px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </MainScreen>
    </>
  );
};

export default EditForms;
