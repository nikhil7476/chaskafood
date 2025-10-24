import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import axiosInstance from "../../../axios/axios";
import { Container, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { formatDate } from "@/utils/helper";
import {
  BsWhatsapp,
  BsLinkedin,
  BsPinterest,
  BsTwitter,
  BsShareFill,
  BsArrowUpRightCircleFill,
} from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdMenuBook } from "react-icons/md";

const SingleBlog = ({ blog }) => {
  const [blogData, setBlogData] = useState(blog || {});
  const [loading, setLoading] = useState(!blog);
  const [readingTime, setReadingTime] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);
  const router = useRouter();

  // Load blog if SSR failed
  useEffect(() => {
    if (!blog && router.isReady) {
      fetchBlog(router.query.id);
    } else if (blog) {
      calculateReadingTime(blog.description);
    }
  }, [router.isReady, blog]);

  const fetchBlog = async (slug) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/getBlogBySlug/${slug}`);
      const data = res?.data?.data;
      if (res?.data?.status && data) {
        const fetched = Array.isArray(data) && data.length ? data[0] : data;
        setBlogData(fetched);
        calculateReadingTime(fetched?.description);
      }
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateReadingTime = (content = "") => {
    const words = content.trim().split(/\s+/).length || 0;
    setReadingTime(Math.ceil(words / 150));
  };

  const BlogContent = ({ content }) => {
    const sanitized =
      typeof window !== "undefined" ? DOMPurify.sanitize(content) : content;
    return (
      <div
        className="blogDisc"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    );
  };

  const shareUrl = (platform) => {
    const currentUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://nextupgrad.us/blog/${router.query?.id}`;
    const title = encodeURIComponent(blogData?.title || "Blog");
    const urls = {
      whatsapp: `https://wa.me/?text=${title} - ${currentUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${title}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${currentUrl}&description=${title}`,
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${currentUrl}`,
    };
    return urls[platform] || "#";
  };

  // Fetch recent posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await axiosInstance.get("/getBlog");
        if (res?.data?.status) {
          const allBlogs = Array.isArray(res.data.data) ? res.data.data : [];
          const currentSlug = blogData?.slug || "";
          const filtered = allBlogs
            .filter((b) => b.slug !== currentSlug)
            .sort(
              (a, b) =>
                new Date(b.updated_at || b.created_at) -
                new Date(a.updated_at || a.created_at)
            )
            .slice(0, 5);
          setRecentPosts(filtered);
        }
      } catch (err) {
        console.error("Error fetching recent posts:", err);
      }
    };

    fetchRecentPosts();
  }, [blogData]);

  return (
    <>
      <Head>
        <title>{blogData?.title || "NextUpgrad Blog"}</title>
        <meta name="title" content={blogData?.title || "Nextupgrad"} />
        <meta
          name="description"
          content={
            blogData?.short_description?.substring(0, 160) ||
            "Explore insights into Web and Software with NextUpgrad."
          }
        />
      </Head>

      <div className="singleMain position-relative">
        {/* Banner */}
        <section
          className="singleBnr py-5"
          style={{ backgroundColor: blogData?.color_code || "#142330" }}
        >
          <Container>
            {loading ? (
              <Skeleton count={6} />
            ) : (
              <Row className="align-items-center text-white gy-4">
                <Col lg={6} md={7}>
                  <h1 className="fw-bold mb-3">{blogData?.title}</h1>
                  <div className="d-flex align-items-center gap-2">
                    <Link href="/blog" legacyBehavior>
                      <a className="text-white text-decoration-none">Blogs</a>
                    </Link>
                    <IoIosArrowForward />
                    <span>This Article</span>
                  </div>
                </Col>
                <Col lg={5} md={5} className="text-center text-md-end">
                  {blogData?.banner_image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${blogData.banner_image}`}
                      alt={blogData?.title || "Blog Banner"}
                      width={500}
                      height={300}
                      className="img-fluid rounded shadow"
                      unoptimized
                    />
                  )}
                </Col>
              </Row>
            )}
          </Container>
        </section>

        {/* Content */}
        <section className="singleCont py-5 position-relative">
          <Container>
            <Row className="justify-content-between">
              {/* Blog */}
              <Col lg={8} md={10}>
                {loading ? (
                  <Skeleton count={10} />
                ) : (
                  <>
                    <div className="descBlg mb-5">
                      <BlogContent content={blogData?.description} />
                    </div>

                    {/* Author */}
                    <div className="text-center border-top pt-4">
                      <Image
                        src={
                          blogData?.author_image
                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${blogData.author_image}`
                            : "/author.webp"
                        }
                        alt={blogData?.author || "Author"}
                        width={100}
                        height={100}
                        className="rounded-circle mb-3"
                        unoptimized
                      />
                      <h5 className="mb-1">{blogData?.author}</h5>
                      <p className="text-muted mb-3">
                        {blogData?.author_bio ||
                          "This is the author of this blog."}
                      </p>
                      <ul className="list-inline text-secondary mb-0">
                        <li className="list-inline-item me-3">
                          <SlCalender />{" "}
                          {blogData?.updated_at
                            ? formatDate(blogData?.updated_at)
                            : ""}
                        </li>
                        <li className="list-inline-item">
                          <MdMenuBook /> {readingTime} min read
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </Col>

              {/* Sidebar */}
              <Col lg={3} className="d-none d-lg-block">
                <div
                  className="p-3 bg-white rounded-3 shadow-sm border"
                  style={{
                    position: "sticky",
                    top: "130px",
                    width: "260px",
                    zIndex: 10,
                  }}
                >
                  {/* Share */}
                  <div className="mb-4">
                    <div className="fw-semibold mb-2 text-dark">
                      <BsShareFill /> Share
                    </div>
                    <div className="d-flex gap-3">
                      <Link href={shareUrl("whatsapp")} target="_blank">
                        <BsWhatsapp size={20} className="text-success" />
                      </Link>
                      <Link href={shareUrl("linkedin")} target="_blank">
                        <BsLinkedin size={20} className="text-primary" />
                      </Link>
                      <Link href={shareUrl("pinterest")} target="_blank">
                        <BsPinterest size={20} className="text-danger" />
                      </Link>
                      <Link href={shareUrl("twitter")} target="_blank">
                        <BsTwitter size={20} className="text-info" />
                      </Link>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="border-top pt-3">
                    <h6 className="fw-semibold mb-3">Category</h6>
                    {blogData?.catogary ? (
                      <p className="text-dark text-decoration-none small">
                        {blogData.catogary}
                      </p>
                    ) : (
                      <div className="small text-muted">Uncategorized</div>
                    )}
                  </div>

                  {/* Recent Posts */}
                  <div className="border-top pt-3 mt-3">
                    <h6 className="fw-semibold mb-3">Recent Posts</h6>
                    {recentPosts.length === 0 && (
                      <div className="small text-muted">No recent posts</div>
                    )}
                    {recentPosts.map((post) => (
                      <div
                        key={post._id}
                        className="d-flex align-items-center gap-2 mb-3"
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${post.banner_image}`}
                          alt={post.title}
                          width={60}
                          height={45}
                          className="rounded object-fit-cover"
                          unoptimized
                        />
                        <Link
                          href={`/blog/${post.slug}`}
                          title={post.title}
                          className="text-dark small text-decoration-none"
                          target="_blank"
                        >
                          {post.title.length > 60
                            ? post.title.slice(0, 60) + "..."
                            : post.title}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="border-top pt-3 mt-3">
                    <Link
                      href="/#contact"
                      className="d-flex align-items-center gap-2 text-dark text-decoration-none small"
                    >
                      <BsArrowUpRightCircleFill size={18} />
                      Have an idea?
                    </Link>
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

// SSR
export async function getServerSideProps(context) {
  const { id } = context.query;
  let blog = null;
  try {
    const res = await axiosInstance.get(`/getBlogBySlug/${id}`);
    const data = res?.data?.data;
    if (res?.data?.status && data) {
      blog = Array.isArray(data) && data.length ? data[0] : data;
    }
  } catch (err) {
    console.error("SSR fetch error:", err);
  }
  return { props: { blog } };
}

export default SingleBlog;
