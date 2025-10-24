import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="header-navbar py-3"
    >
      <Container className="header-container px-4">
        {/* Logo / Brand */}
        <Navbar.Brand href="/" className="logo">
          Chaska Food
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Navbar Links */}
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
            <Nav.Link href="#blog" title="Blog">
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
