import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BlogCards from "@/components/BlogCards";

function Home() {
  return (
    <>
      {/* Banner Section */}
      <section>
        <Container className="banner-container mb-4 mx-auto">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="banner-column">
              <h1>Fuel Your Health with Nutrition</h1>
              <p>
                Discover a world of wholesome, delicious, and nutrient-rich
                foods crafted to nourish your body and delight your taste buds.
                Elevate your wellness journey with flavors that are as good for
                you as they are satisfying.
              </p>
              <Link href="/blog" title="Our Blog" className="banner-link">
                Our Blog
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
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

      {/* Mission & Values Section */}
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
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="p-0">
              <Image
                src="/about.png"
                alt="About"
                title="About"
                width={500}
                height={666}
                className="w-100 h-100 rounded-3"
                style={{ objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Blog Section */}
      <section id="blog">
        <Container className="blog-container mb-4 mx-auto">
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <span>Our Blog</span>
              <h2>Some Healthy Tips</h2>
            </Col>
          </Row>
        </Container>
      </section>

      <BlogCards />

      {/* Contact Section */}
      <section id="contact">
        <Container className="contact-container mb-4 mx-auto">
          <Row className="align-items-stretch g-4">
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className="contact-details h-100 d-flex flex-column justify-content-center">
                <span>Get In Touch</span>
                <h2>Reach Out to Us Today</h2>
                <p>We are here to answer any questions.</p>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className="contact-form h-100 d-flex flex-column justify-content-center">
                <ContactForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
