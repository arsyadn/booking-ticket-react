import React from "react";
import NavbarComp from "../components/common/Navbar";
import DetailCreateConcert from "../components/concert/DetailCreateConcert";
import { Container } from "react-bootstrap";

const CreateConcert = () => {
  return (
    <div className="bg-custom">
      <NavbarComp />
      <Container>
        <DetailCreateConcert />
      </Container>
    </div>
  );
};

export default CreateConcert;
