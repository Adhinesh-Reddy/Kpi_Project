import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfilePage.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useHistory } from "react-router";
import axios from "axios";
import Header from "../../components/Header/Header";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState(null);
  const userInfo = localStorage.getItem("userInfo");
  const history = useHistory();
  const userInfoJSON = JSON.parse(userInfo);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfoJSON.name);
      setEmail(userInfoJSON.email);
      setPic(userInfoJSON.pic);
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfoJSON.token}`,
          },
        };

        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:5000/api/users/profile",
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
  return (
    <>
      <Header />
      <MainScreen title="EDIT PROFILE">
        <div>
          <Row className="profileContainer">
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Updated Successfully
                  </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{" "}
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <Form.Group controlId="pic">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.File
                    //   onChange={(e) => postDetails(e.target.files[0])}
                    id="custom-file"
                    type="image/png"
                    label="Upload Profile Picture"
                    custom
                  />
                </Form.Group>
                <Button
                  type="submit"
                  varient="primary"
                  style={{ marginTop: "20px" }}
                >
                  Update
                </Button>
              </Form>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={pic} alt={name} className="profilePic" />
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default ProfilePage;
