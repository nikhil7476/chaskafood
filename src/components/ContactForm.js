import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, message } = formData;

    if (!firstName || !lastName || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setError("");
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <Container className="my-5">
      {error && <Alert variant="danger">{error}</Alert>}
      {submitted && (
        <Alert variant="success">Form submitted successfully!</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="john@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="message" className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ContactForm;
