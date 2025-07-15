import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavbarComp = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const location = useLocation();

  console.log({ location });
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            // src={process.env.PUBLIC_URL + "/assets/bg-jkt.jpg"}
            src="/assets/ina17-logo.png"
            alt="MyBrand Logo"
            style={{ height: "40px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "active-link" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/create-concert"
              className={
                location.pathname === "/create-concert" ? "active-link" : ""
              }
            >
              Create Concert
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#logout" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
