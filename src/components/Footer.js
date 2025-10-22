import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
    return (
        <section>
            <Container className='m-4 mx-auto footer-container'>
                <Row className='justify-content-between footer-row-1'>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-3 align-content-start'>
                        <Link href="/" title="Chaska Food" className="logo">Chaska Food</Link>
                    </Col>
                    <Col xl={5} lg={5} md={6} sm={12} xs={12} className='mb-3 align-content-end'>
                        <ul className='list-unstyled'>
                            <li><Link href="#" title='Privacy Policy'>Privacy Policy</Link></li>
                            <li><Link href="#" title='Accessbility Statement'>Accessibility Statement</Link></li>
                        </ul>
                    </Col>
                </Row>
                <Row className='justify-content-between footer-row-2'>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12} className='mb-3 align-content-start'>
                        <ul className='list-unstyled'>
                            <li><Link href="tel:123-456-7890" title='Call Us'>123-456-7890</Link></li>
                            <li><Link href="mailto:info@mysite.com" title='Mail Us'>info@mysite.com</Link></li>
                            <li>500 Terry Francine St.<br />San Francisco, CA 94158</li>
                        </ul>
                    </Col>
                    <Col xl={5} lg={5} md={6} sm={12} xs={12} className='mb-3 align-content-end'>
                        <p className='copy'>&copy;{new Date().getFullYear()} By Chaska Food.<br />Powered & Secured By MakersOfCode </p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Footer