import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "../../axios/axios";
import { Container, Row, Col } from "react-bootstrap";
import { BiSolidCategory } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { formatDate } from "../utils/helper";

const BlogCards = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const res = await axiosInstance.get("/getBlog");
      if (res?.data?.status) {
        const sortedBlogs = res.data.data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        setBlogs(sortedBlogs.slice(0, 3));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    if (!html) return "";
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const truncateWords = (text, maxWords) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  return (
    <section>
      <Container className="blog-card-container mb-4 mx-auto">
        <Row>
          {loading ? (
            <SkeletonTheme color="#2c2c2c" highlightColor="#444">
              {[...Array(3)].map((_, i) => (
                <Col
                  key={i}
                  xl={4}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  className="mb-3"
                >
                  <div>
                    <Skeleton
                      height={211}
                      style={{ borderRadius: "8px 8px 0 0" }}
                    />
                    <div>
                      <Skeleton width="50%" height={20} className="mb-2" />
                      <Skeleton width="90%" height={24} className="mb-2" />
                      <Skeleton width="100%" height={16} count={2} />
                    </div>
                  </div>
                </Col>
              ))}
            </SkeletonTheme>
          ) : blogs.length > 0 ? (
            blogs.map((item, index) => (
              <Col
                key={index}
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                className="mb-3"
              >
                <div className="blog-card">
                  <Link href={`/blog/${item.slug}`} target="_blank">
                    <div className="blog-image">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.banner_image}`}
                        alt={item.title}
                        width={351}
                        height={211}
                        style={{ width: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div className="blog-content">
                    <span className="category">
                      <BiSolidCategory /> {item.catogary}
                    </span>
                    <h3 className="title">
                      <Link
                        href={`/blog/${item.slug}`}
                        target="_blank"
                        className="text-decoration-none"
                      >
                        {truncateText(item.title, 20)}
                      </Link>
                    </h3>
                    <div className="author">
                      <span>
                        <FaUser /> {item.author}
                      </span>
                      <span>
                        <SlCalender /> {formatDate(item.updated_at)}
                      </span>
                    </div>
                    <p>{truncateWords(stripHtml(item.description), 25)}</p>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <Col>
              <p>No blogs available.</p>
            </Col>
          )}
        </Row>
        <Row>
          <Col className="text-center mb-3">
            <Link
              href="/blog"
              title="Explore Our Blog"
              className="blogBtn"
              target="_blank"
            >
              Explore Our Blog
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogCards;
