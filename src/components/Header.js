import { Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Container className="m-4 mx-auto header-container">
                {/* Brand aligned to left */}
                <Navbar.Brand href="/" title="Chaska Food" className="logo">Chaska Food</Navbar.Brand>

                {/* Toggle button for mobile */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {/* Navigation links aligned to right */}
                <Navbar.Collapse id="responsive-navbar-nav" className="menu justify-content-end">
                    <Nav>
                        <Nav.Link href="/" title='Home'>Home</Nav.Link>
                        <Nav.Link href="#about" title='About'>About</Nav.Link>
                        <Nav.Link href="/blog" title='Blog'>Blog</Nav.Link>
                        <Nav.Link href="#contact" title='Contact'>Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
