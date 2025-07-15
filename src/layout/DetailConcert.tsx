import React from "react";
import NavbarComp from "../components/common/Navbar";
import { Container } from "react-bootstrap";
import DetailConcertComp from "../components/concert/DetailConcertComp";

const DetailConcert = () => {
  return (
    <div className="bg-custom">
      <NavbarComp />
      <Container>
        <DetailConcertComp />
      </Container>
    </div>
  );
};

export default DetailConcert;
