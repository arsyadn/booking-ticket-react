import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

interface PaymentCardProps {
  title: string;
}
const PaymentCard: React.FC<PaymentCardProps> = ({ title }) => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, []);
  return (
    <Card className="shadow w-100 mt-4" style={{ margin: "10px" }}>
      <Card.Header className="bg-white">
        <h5 className="fw-bolder text-center mb-0 py-2">{title}</h5>
      </Card.Header>
      <Card.Body>
        <h5 className="text-success text-center">
          You've made payment successfully!
        </h5>
      </Card.Body>
    </Card>
  );
};

export default PaymentCard;
