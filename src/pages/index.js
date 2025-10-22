import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <>
      <section>
        <Container className="banner-container mb-4 mx-auto">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="banner-column">
              <div>
                <h1>Fuel Your Health with Nutrition</h1>
              </div>
              <div>
                <p>
                  Discover a world of wholesome, delicious, and nutrient-rich
                  foods crafted to nourish your body and delight your taste
                  buds. Elevate your wellness journey with flavors that are as
                  good for you as they are satisfying.
                </p>
                <Link href="/blog" title="Our Blog" className="btn btn-primary">
                  Our Blog
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section id="about">
        <Container className="about-container mb-4 mx-auto">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <span>About Us</span>
              <h2>Our Story</h2>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container className="mission-container mb-4 mx-auto">
          <Row className="align-items-stretch">
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className="p-0 pe-lg-4 mb-4 mb-md-0 d-flex flex-column"
            >
              <div className="mission flex-fill mb-4">
                <h3>Our Mission</h3>
                <p>
                  At Chaska Food, we are passionate about promoting health and
                  wellness through evidence-based nutrition. Our recipes are
                  crafted to provide delicious meals that nourish your body and
                  mind, supporting a balanced lifestyle.
                </p>
              </div>
              <div className="values flex-fill">
                <h3>Our Values</h3>
                <p>
                  We believe in the power of wholesome ingredients and mindful
                  eating. Our dedication to sharing reliable nutrition
                  information sets us apart, ensuring our community makes
                  informed choices for a healthier life.
                </p>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="p-0 d-flex">
              <Image
                src="/about.png"
                alt="About"
                title="About"
                width={500}
                height={666}
                className="w-100 h-100 object-fit-cover rounded-3"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
