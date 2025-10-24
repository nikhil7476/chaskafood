import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <section>
      <Container className="footer-container mb-4 mx-auto">
        {/* Top Row: Logo + Links */}
        <Row className="justify-content-between align-items-start mb-4">
          <Col xl={6} lg={6} md={6} sm={12} className="mb-3">
            <Link
              href="/"
              title="Chaska Food"
              className="logo text-decoration-none"
            >
              Chaska Food
            </Link>
          </Col>
          <Col
            xl={5}
            lg={5}
            md={6}
            sm={12}
            className="mb-3 d-flex justify-content-end"
          >
            <ul className="list-unstyled text-end mb-0">
              <li>
                <Link href="#" title="Privacy Policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" title="Accessibility Statement">
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom Row: Contact Info + Copyright */}
        <Row className="justify-content-between align-items-start">
          <Col xl={6} lg={6} md={6} sm={12} className="mb-3">
            <ul className="list-unstyled mb-0">
              <li>
                <Link href="tel:123-456-7890" title="Call Us">
                  123-456-7890
                </Link>
              </li>
              <li>
                <Link href="mailto:info@mysite.com" title="Mail Us">
                  info@mysite.com
                </Link>
              </li>
              <li>
                500 Terry Francine St.
                <br />
                San Francisco, CA 94158
              </li>
            </ul>
          </Col>
          <Col
            xl={5}
            lg={5}
            md={6}
            sm={12}
            className="mb-3 d-flex justify-content-end"
          >
            <p className="copy text-end mb-0">
              &copy; {new Date().getFullYear()} By Chaska Food.
              <br />
              Powered & Secured By Nikhil Mishra.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Footer;
