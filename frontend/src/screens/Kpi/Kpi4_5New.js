import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

const Kpi4_5New = () => {
  const [text, setText] = useState("");
  const [kpi4_5file1, setKpi4_5file1] = useState("");
  const [kpi4_5file2, setKpi4_5file2] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const formData = new FormData();
    formData.append("text", text);
    formData.append("kpi4_5file1", kpi4_5file1);
    formData.append("kpi4_5file2", kpi4_5file2);
    // console.log(formData);
    axios
      .post("http://localhost:5000/kpi4_5/add", formData, config)
      .then((res) => {
        console.log(res.data);
      });
  }
  function onClick(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("kpi4_5file2", kpi4_5file2);
    console.log(kpi4_5file1);
    axios
      .post("http://localhost:4000/kpi4_5/add1", formData, {})
      .then((res) => {
        console.log(res.data);
      });
  }

  function onClick2(e) {
    e.preventDefault();
    axios.get("http://localhost:4000/kpi4_5/download").then((res) => {
      console.log(res);
    });
  }

  return (
    <Container>
      <Form onSubmit={onSubmit} encType="multipart/form-data">
        <Form.Group controlId="kpi4_5text">
          <Form.Label>Text</Form.Label>
          <Form.Control
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="file"
            name="file_1"
            onChange={(e) => setKpi4_5file1(e.target.files[0])}
          />
        </Form.Group>
        {/* <input type="file" name="image" /> */}
        <Button variant="primary" onClick={onSubmit}>
          Upload1
        </Button>
        <Form.Group>
          <Form.Control
            type="file"
            name="file_2"
            onChange={(e) => setKpi4_5file2(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" onClick={onClick}>
          Upload2
        </Button>
        <Button
          variant="primary"
          href="http://localhost:4000/public/[object Object]-source-code.docx"
        >
          Download
        </Button>
      </Form>
    </Container>
  );
};

export default Kpi4_5New;
