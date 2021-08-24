import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterPage.css";
import axios from "axios";
import Header1 from "../../components/Header/Header1";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const history = useHistory();
  const userInfo = localStorage.getItem("userInfo");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:5000/api/users/register",
          {
            name,
            email,
            password,
            pic,
          },
          config
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Selecet an Image");
    }

    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "kpi_project");
      data.append("cloud_name", "daxvp8lg0");
      fetch("https://api.cloudinary.com/v1_1/daxvp8lg0/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <>
      <Header1 />
      <MainScreen title="REGISTER">
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId="pic">
              <Form.Label>Profile Picture</Form.Label>
              <Form.File
                name="hello"
                onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                type="image/png"
                label="Upload Profile Picture"
                custom
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an Account ?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default RegisterPage;
