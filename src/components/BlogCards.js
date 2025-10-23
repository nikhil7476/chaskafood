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

  const blogCardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eee",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const blogImageStyle = {
    width: "100%",
    height: "211px",
    overflow: "hidden",
  };

  const blogContentStyle = {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  };

  const titleStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "8px",
    fontSize: "1.25rem",
    lineHeight: "1.4",
  };

  const excerptStyle = {
    minHeight: "4.2em",
    maxHeight: "4.2em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: "1.4",
  };

  return (
    <section className="blog-cards-section py-4">
      <Container>
        <Row className="d-flex align-items-stretch">
          {loading ? (
            <SkeletonTheme color="#2c2c2c" highlightColor="#444">
              {[...Array(3)].map((_, i) => (
                <Col key={i} lg={4} md={6} sm={12} className="mb-4">
                  <div style={{ ...blogCardStyle, border: "none" }}>
                    <Skeleton
                      height={211}
                      style={{ borderRadius: "8px 8px 0 0" }}
                    />
                    <div style={blogContentStyle}>
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
              <Col key={index} lg={4} md={6} sm={12} className="mb-4">
                <div className="blog-card" style={blogCardStyle}>
                  <Link
                    href={`/blog/${item.slug}`}
                    target="_blank"
                    style={blogImageStyle}
                  >
                    <div className="blog-image">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.banner_image}`}
                        alt={item.title}
                        width={351}
                        height={211}
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </Link>
                  <div className="blog-content" style={blogContentStyle}>
                    <h5 className="category text-muted small mb-1">
                      <BiSolidCategory className="me-1" /> {item.catogary}
                    </h5>
                    <h3 className="title" style={titleStyle}>
                      <Link
                        href={`/blog/${item.slug}`}
                        target="_blank"
                        className="text-decoration-none"
                      >
                        {truncateText(item.title, 20)}
                      </Link>
                    </h3>
                    <div className="meta text-muted small mb-2">
                      <span className="me-2">
                        <FaUser className="me-1" /> {item.author}
                      </span>
                      <span>
                        <SlCalender className="me-1" />{" "}
                        {formatDate(item.updated_at)}
                      </span>
                    </div>
                    <p style={excerptStyle} className="mt-auto">
                      {truncateWords(stripHtml(item.description), 30)}
                    </p>
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
      </Container>
    </section>
  );
};

export default BlogCards;
