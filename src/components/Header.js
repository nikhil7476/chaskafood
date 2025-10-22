import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="header-navbar">
      <Container className="header-container my-3 mx-auto">
        <Navbar.Brand href="/" title="Chaska Food" className="logo">
          Chaska Food
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="menu">
            <Nav.Link href="/" title="Home">
              Home
            </Nav.Link>
            <Nav.Link href="#about" title="About">
              About
            </Nav.Link>
            <Nav.Link href="/blog" title="Blog">
              Blog
            </Nav.Link>
            <Nav.Link href="#contact" title="Contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
