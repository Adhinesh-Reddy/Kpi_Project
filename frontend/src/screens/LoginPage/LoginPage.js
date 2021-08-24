import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import axios from "axios";
import Header1 from "../../components/Header/Header1";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const history = useHistory();
  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <Header1 />
      <MainScreen title="LOGIN">
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
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

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer ?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                Register Here
              </Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default LoginPage;
