import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div
      style={{
        backgroundImage: "url('/assets/bg-jkt.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Row>
          <Col>
            <Card
              style={{ width: "500px" }}
              className="p-3 border-0 shadow border-radius"
            >
              <Card.Body>
                <div className="text-center mb-3">
                  <img
                    src="/assets/ina17-logo.png"
                    alt="INA17 Logo"
                    style={{ maxWidth: "120px", height: "auto" }}
                  />
                </div>

                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="d-flex justify-content-center mb-3"
                  onChange={(e) => setIsLogin(e.target.checked)}
                  checked={isLogin}
                  style={{ transform: "scale(1.2)" }}
                />

                {isLogin ? <LoginForm /> : <RegisterForm />}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
