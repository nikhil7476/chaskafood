import Link from "next/link";
import Head from "next/head";
import axiosInstance from "../../../axios/axios";
import React, { useEffect, useState, useMemo } from "react"; // Added useMemo
import { formatDate } from "../../utils/helper";
import { FaUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container, Row, Col } from "react-bootstrap";
import { BiSolidCategory } from "react-icons/bi";
import Image from "next/image";

// Utility function to strip HTML and return plain text
const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Utility function to truncate text by word count
const truncateWords = (text, maxWords) => {
  if (!text) return "";
  const words = text.split(/\s+/).filter(Boolean); // Split by whitespace and filter out empty strings
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogsBackup, setBlogsBackup] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getBlogs();
  }, []);

  // Effect to handle filtering when search query or category changes
  useEffect(() => {
    let filteredBlogs = blogsBackup;

    // Filter by search query (case-insensitive)
    if (searchQuery) {
      filteredBlogs = filteredBlogs.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) // Added description search
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      filteredBlogs = filteredBlogs.filter(
        (item) => item.catogary === selectedCategory
      );
    }

    setBlogs(filteredBlogs);
  }, [searchQuery, selectedCategory, blogsBackup]); // Dependency cleanup: blogsBackup is sufficient

  const getBlogs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/getBlog");
      if (res?.data?.status) {
        // Sort and set data without arbitrary delay
        const sortedBlogs = res.data.data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        setBlogs(sortedBlogs);
        setBlogsBackup(sortedBlogs);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories for the filter list
  const uniqueCategories = useMemo(() => {
    const categories = blogsBackup.map((blog) => blog.catogary).filter(Boolean);
    return [...new Set(categories)];
  }, [blogsBackup]);

  const handleCategoryClick = (category) => {
    // Toggle the selected category
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  // Inline styles for alignment consistency in blog cards (recommended for micro-styling without external CSS)
  const cardStyle = {
    height: "100%", // Essential for aligning card content horizontally
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };
  const cardContentStyle = {
    flexGrow: 1, // Ensures content takes up all available vertical space
    padding: "15px 0 0", // Add spacing below the image
    display: "flex",
    flexDirection: "column",
  };
  const excerptStyle = {
    marginTop: "auto", // Pushes the description to the bottom of the card content
    lineHeight: "1.4",
  };
  const searchInputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  };
  // --------------------------------------------------------------------------------------------------

  // Render Logic
  const renderBlogCards = () => {
    if (loading) {
      return (
        <SkeletonTheme color="#2c2c2c" highlightColor="#444">
          {[...Array(4)].map(
            (
              _,
              i // Show 4 skeleton cards
            ) => (
              <Col key={i} className="mb-4" lg={6} md={12} sm={12} xs={12}>
                <div style={{ ...cardStyle, border: "none" }}>
                  <Skeleton
                    height={211}
                    style={{ borderRadius: "5px 5px 0 0" }}
                  />
                  <div style={cardContentStyle}>
                    <Skeleton width="40%" height={16} className="mb-2" />
                    <Skeleton height={24} className="mb-2" count={2} />
                    <div
                      className="blgMeta"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Skeleton width="30%" height={14} />
                      <Skeleton width="30%" height={14} />
                    </div>
                    <Skeleton count={2} className="mt-2" />
                  </div>
                </div>
              </Col>
            )
          )}
        </SkeletonTheme>
      );
    }

    if (blogs.length === 0) {
      return (
        <Col>
          <div className="alert alert-info text-center">
            <h3>No Blogs Found</h3>
            <p>Try adjusting your search or category filters.</p>
          </div>
        </Col>
      );
    }

    return blogs.map((item, index) => (
      <Col
        key={index}
        className="mb-4 d-flex" // Use d-flex to enforce alignment on the Col
        lg={6}
        md={12}
        sm={12}
        xs={12}
      >
        <div className="blgCard" style={cardStyle}>
          <Link
            href={`/blog/${item?.slug}`}
            target="_blank"
            style={{ display: "block" }}
          >
            <div
              className="blgFeat"
              style={{ height: "211px", overflow: "hidden" }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.banner_image}`}
                alt={item?.title || "Blog Post Image"}
                width={351}
                height={211}
                // Bootstrap classes for better image control
                className="w-100 h-100 object-fit-cover rounded-top"
              />
            </div>
          </Link>
          <div style={cardContentStyle}>
            {/* Category and Title */}
            <h3 style={{ fontSize: "1.25rem", lineHeight: "1.4" }}>
              <span className="cat text-muted small d-block mb-1">
                <BiSolidCategory className="me-1" /> {item?.catogary}
              </span>
              <Link
                href={`/blog/${item?.slug}`}
                target="_blank"
                className="text-decoration-none"
              >
                {item.title}
              </Link>
            </h3>

            {/* Meta */}
            <div className="blgMeta d-flex justify-content-between text-muted small mb-2">
              <p className="mb-0">
                <FaUser className="me-1" /> {item.author}
              </p>
              <p className="mb-0">
                <SlCalender className="me-1" /> {formatDate(item.updated_at)}
              </p>
            </div>

            {/* Excerpt/Description */}
            <p style={excerptStyle} className="text-secondary">
              {truncateWords(stripHtml(item.description), 20)}
            </p>
          </div>
        </div>
      </Col>
    ));
  };

  return (
    <>
      <Head>
        <title>
          NextUpgrad USA Blog | Insights on Tech, Business & Innovation
        </title>
        {/* ... (rest of the Head content is unchanged) ... */}
        <meta
          name="title"
          content="NextUpgrad USA Blog | Insights on Tech, Business & Innovation"
        />
        <meta
          name="description"
          content="Stay updated with NextUpgrad USA's blog! Explore expert insights on technology, business, and innovation to stay ahead in the digital world."
        />
        <meta
          property="og:title"
          content="NextUpgrad USA Blog | Insights on Tech, Business & Innovation"
        />
        <meta
          property="og:description"
          content="Stay updated with NextUpgrad USA's blog! Explore expert insights on technology, business, and innovation to stay ahead in the digital world."
        />
        <meta
          property="og:image"
          content="https://nextupgrad.us/assets/og-tag-image.webp"
        />
      </Head>
      <div className="blgMain">
        <section className="blgBnr py-5">
          <Container>
            <Row>
              <Col>
                <h1 className="text-center">
                  <span className="d-block display-4 fw-bold">Blogs</span>
                  <span className="d-block h4 fw-light mt-2">
                    Your Gateway to Knowledge, Tips, and Inspiration
                  </span>
                </h1>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="blgCont py-5">
          <Container
            data-aos="fade-up"
            data-aos-delay="150"
            data-aos-duration="1500"
          >
            <Row className="blgContainer">
              {/* Blog Cards Column */}
              <Col lg={8} md={8} sm={12} xs={12}>
                <Row className="blgCards d-flex align-items-stretch">
                  {" "}
                  {/* d-flex align-items-stretch for equal height cards */}
                  {renderBlogCards()}
                </Row>
              </Col>

              {/* Sidebar Column */}
              <Col lg={4} md={4} sm={12} xs={12} className="mt-4 mt-md-0">
                <div
                  className="blgSearch p-3 border rounded shadow-sm sticky-top"
                  style={{ top: "20px" }}
                >
                  {/* Search Input */}
                  <div className="mb-4">
                    <h3 className="h5 fw-bold mb-3">Search Articles</h3>
                    <input
                      type="text"
                      placeholder="Search by title or content..."
                      style={searchInputStyle}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                    />
                  </div>

                  {/* Categories Filter */}
                  <div className="mb-4">
                    <h3 className="h5 fw-bold mb-3">Categories:</h3>
                    <ul className="list-unstyled categories d-flex flex-wrap gap-2">
                      {loading ? (
                        <Skeleton
                          count={6}
                          width={100}
                          height={30}
                          style={{ borderRadius: "20px" }}
                          inline
                        />
                      ) : (
                        uniqueCategories.map((category, index) => (
                          <li
                            key={index}
                            className={`badge ${
                              selectedCategory === category
                                ? "bg-primary"
                                : "bg-secondary-subtle text-dark border"
                            }`}
                            onClick={() => handleCategoryClick(category)}
                            style={{ cursor: "pointer", padding: "8px 12px" }}
                          >
                            {category}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  {/* Recent Blogs */}
                  <div>
                    <h3 className="h5 fw-bold mb-3">Recent Blogs</h3>
                    {blogsBackup.length ? (
                      <ul className="recentBlgs list-unstyled">
                        {blogsBackup.slice(0, 5).map((item, index) => (
                          <li key={index} className="mb-2">
                            <Link
                              href={`/blog/${item.slug}`}
                              target="_blank"
                              className="text-decoration-none text-dark d-block"
                            >
                              <small className="text-muted d-block">
                                {formatDate(item.updated_at)}
                              </small>
                              <strong>{item.title}</strong>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <SkeletonTheme color="#2c2c2c" highlightColor="#444">
                        <Skeleton count={5} height={30} className="mb-2" />
                      </SkeletonTheme>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Blog;
