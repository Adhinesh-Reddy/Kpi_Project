import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import client from "../../backendUrl/client";
import Header from "../../components/Header/Header";
import MainScreen from "../../components/MainScreen";
import { saveAs } from "file-saver";

const HodViewPage = ({ match }) => {
  const [title, setTitle] = useState("");
  let [dataArray, setDataArray] = useState([]);
  let [inputDataArray, setInputDataArray] = useState([]);
  let [inputDataFileName, setInputDataFileName] = useState([]);
  const [download, setDownload] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const backendUrl = "http://localhost:5000/";

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const downloadImage = () => {
    for (let i in inputDataFileName) {
      console.log(inputDataFileName[i]);
      console.log(inputDataFileName[i].replace(`${backendUrl}images/`, ""));
      saveAs(
        inputDataFileName[i],
        inputDataFileName[i].replace(`${backendUrl}images/`, "")
      );
    }
  };

  useEffect(() => {
    client.get(`kpi/hod/showdata/${match.params.id}`, config).then((res) => {
      console.log(res.data);
      setInputDataArray(res.data.dataArrayValues);
      setInputDataFileName(res.data.kpi4_5files);
      client.get(`${res.data.form}/`, config).then((res) => {
        setDataArray(res.data.dataArray);
      });
    });
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
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                  <Form.Label>{inputDataArray[index]}</Form.Label>
                </Form.Group>
              </>
            );
          })}
          {/* {download ? <Downloads /> : null} */}
          <Button onClick={downloadImage}>Download!</Button>
        </Form>
      </MainScreen>
    </>
  );
};

export default HodViewPage;
