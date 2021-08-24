import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Header from "../../components/Header/Header";
import MainScreen from "../../components/MainScreen";
import { useHistory } from "react-router-dom";
import client from "../../backendUrl/client";

const Kpi4_5 = (props) => {
  let form = props.location.state.para;
  let title = form + " form";
  title = title.toUpperCase();
  const [id, setId] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);
  let [dataArray, setDataArray] = useState([]);
  let [dataFile, setDataFile] = useState([]);
  let [dataFileName, setDataFileName] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  const handleChange = (e, index) => {
    e.preventDefault();
    dataArray[index].value = e.target.value;
    setDataArray([...dataArray]);
  };

  const handleUpload = (e, index) => {
    e.preventDefault();

    let apiNumber = index + 1;

    let dataArrayValues = [];
    for (let d in dataArray) {
      dataArrayValues.push(dataArray[d].value);
    }
    const data = JSON.stringify(dataArrayValues);
    console.log(data);
    const formData = new FormData();
    if (apiNumber == 1) {
      formData.append("email", email);
      formData.append("name", name);
      formData.append("form", form);
      formData.append("data", data);
    } else {
      formData.append("_id", id);
    }
    formData.append(`kpi4_5file${apiNumber}`, dataFile);
    console.log(index);
    client.post(`kpi/add${apiNumber}`, formData, config).then((res) => {
      console.log(res.data);
      setId(res.data._id);
    });
    setFlag(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let dataArrayValues = [];
    for (let d in dataArray) {
      dataArrayValues.push(dataArray[d].value);
    }
    const data = JSON.stringify(dataArrayValues);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("form", form);
    formData.append("data", data);
    formData.append("dataFileName", dataFileName);
    if (dataFileName[0] == null || flag == false) {
      client
        .post(
          "kpi/save",
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
      history.push("/home");
    } else {
      history.push("/home");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataArrayValues = [];
    for (let d in dataArray) {
      dataArrayValues.push(dataArray[d].value);
    }
    const data = JSON.stringify(dataArrayValues);
    console.log(id);
    const formData = new FormData();
    formData.append("_id", id);

    const condition = true;

    if (dataFileName[0] == null) {
      client.post("kpi/submit", { email, name, form, data, condition }, config);
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

  React.useEffect(() => {
    client.get(`${props.location.state.para}/`, config).then((res) => {
      setDataArray(res.data.dataArray);
      setDataFileName(res.data.dataFileName);
    });
  }, [props.location.state.para]);

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
                    value={i.value}
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
            onClick={handleSave}
          >
            Save
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

export default Kpi4_5;
