import React from "react";
import NavbarComp from "../components/common/Navbar";
import CardConcert from "../components/concert/CardConcert";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div className="bg-custom">
      <NavbarComp />
      <Container>
        <CardConcert />
      </Container>
    </div>
  );
};

export default Home;
