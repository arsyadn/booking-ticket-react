import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Icon from "@mdi/react";
import { mdiEye as eyeOpen, mdiEyeOff as eyeClose } from "@mdi/js";

import { LoginAction } from "../../redux/action/authAction";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all fields.");
      return;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{1,}$/.test(password)
    ) {
      setError(
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character."
      );
      return;
    }

    setLoading(true);
    const response = await dispatch(LoginAction(email, password));
    if (response?.status === 500 || response?.data?.error) {
      setError(
        typeof response?.data?.error === "string"
          ? response.data.error
          : "Registration failed. Please try again."
      );
      setLoading(false);
    } else {
      localStorage.setItem("token", response.data.token || "");
      setError("");
      navigate("/");
      setLoading(false);
    }
  };

  return (
    <>
      <Card.Title className="text-center mb-4">Login</Card.Title>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={
                password !== "" &&
                isClicked &&
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{1,}$/.test(
                  password
                )
              }
            />
            <div
              className="position-absolute top-50 end-0 translate-middle-y me-2"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon
                className="text-primary"
                path={showPassword ? eyeOpen : eyeClose}
                size={1}
              />
            </div>
          </div>
          {isClicked === true && (
            <Form.Control.Feedback type="invalid">
              Password must contain at least one number, one uppercase letter,
              one lowercase letter, and one special character.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-3"
          onClick={() => setIsClicked(true)}
          disabled={loading}
        >
          {loading ? (
            <div>
              <Spinner size="sm" className="me-2" />
              Loading...
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
