import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Home() {
  return (
    <>
      <section>
        <Container className='banner-container mb-4 mx-auto'>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className='banner-column'>
              <div>
                <h1>Fuel Your Health with Nutrition</h1></div>
              <div>
                <p>Discover a world of wholesome, delicious, and nutrient-rich foods crafted to nourish your body and delight your taste buds. Elevate your wellness journey with flavors that are as good for you as they are satisfying.
                </p>
                <Link href="/blog" title='Our Blog' className='btn btn-primary'>Our Blog</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home