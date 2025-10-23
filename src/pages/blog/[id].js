import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { formatDate } from "@/utils/helper";
import {
  BsWhatsapp,
  BsLinkedin,
  BsPinterest,
  BsTwitter,
  BsShareFill,
  BsArrowUpRightCircleFill,
} from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdMenuBook } from "react-icons/md";

const SingleBlog = ({ blog }) => {
  const [blogData, setBlogData] = useState(blog || {});
  const [loading, setLoading] = useState(!blog);
  const [readingTime, setReadingTime] = useState(0);
  const router = useRouter();
  const { isReady, query } = router;

  useEffect(() => {
    if (isReady && blog) {
      setBlogData(blog);
      setLoading(false);
      calculateReadingTime(blog?.description);
    }
  }, [isReady, blog]);

  const BlogContent = ({ content }) => {
    const sanitizedContent =
      typeof window !== "undefined"
        ? DOMPurify.sanitize(content || "")
        : content || "";
    return (
      <div
        className="blogDisc"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    );
  };

  const calculateReadingTime = (content) => {
    const wordCount = content?.split(" ").length || 0;
    const time = Math.ceil(wordCount / 150);
    setReadingTime(time);
  };

  const shareUrl = (platform) => {
    const currentUrl = query?.id
      ? `https://nextupgrad.us/blog/${query.id}`
      : "https://nextupgrad.us/blog";
    const title = encodeURIComponent(blogData?.title || "Blog");

    switch (platform) {
      case "whatsapp":
        return `https://wa.me/?text=${title} - ${currentUrl}`;
      case "linkedin":
        return `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${title}`;
      case "pinterest":
        return `https://pinterest.com/pin/create/button/?url=${currentUrl}&description=${title}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${title}&url=${currentUrl}`;
      default:
        return "#";
    }
  };

  return (
    <>
      <Head>
        <title>{blogData?.title}</title>
        <meta name="title" content={blogData?.title || "Nextupgrad"} />
        <meta
          name="description"
          content={
            blogData?.short_description?.substring(0, 160) ||
            "Dive into our blog for insights into Web and Software."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://nextupgrad.us/blog/${query?.id}`}
        />
        <meta property="og:title" content={blogData?.title || "Nextupgrad"} />
        <meta
          property="og:description"
          content={
            blogData?.short_description?.substring(0, 160) ||
            "Expert insights into Web and Software."
          }
        />
        <meta
          property="og:image"
          content={
            blogData?.banner_image
              ? process.env.NEXT_PUBLIC_IMAGE_URL + blogData?.banner_image
              : "https://nextupgrad.us/assets/og-tag-image.webp"
          }
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://nextupgrad.us/blog/${query?.id}`}
        />
        <meta
          property="twitter:title"
          content={blogData?.title || "Nextupgrad"}
        />
        <meta
          property="twitter:description"
          content={
            blogData?.short_description?.substring(0, 160) ||
            "Expert insights into Web and Software."
          }
        />
        <meta
          property="twitter:image"
          content={
            blogData?.banner_image
              ? process.env.NEXT_PUBLIC_IMAGE_URL + blogData?.banner_image
              : "https://nextupgrad.us/logo-2orange-1.webp"
          }
        />
      </Head>
      <div className="singleMain">
        <section
          className="singleBnr"
          style={{ backgroundColor: `${blogData?.color_code || "#142330"}` }}
        >
          <Container>
            {loading ? (
              <Row className="mb-4 justify-content-center">
                <Col lg={8} md={8} sm={12} xs={12}>
                  <SkeletonTheme color="#2c2c2c" highlightColor="#444">
                    <Skeleton count={5} />
                  </SkeletonTheme>
                </Col>
              </Row>
            ) : (
              <Row className="justify-content-between singleBlg">
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  className="align-content-center"
                >
                  <h1>{blogData?.title}</h1>
                  <div>
                    <Link className="ctaBtn text-white" href="/blog">
                      Blogs
                    </Link>
                    <IoIosArrowForward />
                    <Link className="ctaBtn text-white" href="#">
                      This Article
                    </Link>
                  </div>
                </Col>
                <Col lg={5} md={5} sm={12} xs={12}>
                  {blogData?.banner_image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${blogData.banner_image}`}
                      alt={blogData?.title || "Blog Banner"}
                      title={blogData?.title || "Blog Banner"}
                      width={496}
                      height={298}
                    />
                  )}
                </Col>
              </Row>
            )}
          </Container>
        </section>
        <section className="singleCont">
          <Container>
            {loading ? (
              <Row className="mb-4 justify-content-center">
                <Col lg={8} md={8} sm={12} xs={12}>
                  <SkeletonTheme color="#2c2c2c" highlightColor="#444">
                    <Skeleton count={5} />
                  </SkeletonTheme>
                </Col>
              </Row>
            ) : (
              <Row className="mb-4 justify-content-center">
                <Col lg={8} md={8} sm={12} xs={12}>
                  <div className="descBlg">
                    <BlogContent content={blogData?.description} />
                  </div>
                </Col>
              </Row>
            )}
            <Row className="justify-content-center">
              <Col lg={8} md={8} sm={12} xs={12}>
                <div className="authorMeta">
                  <div className="authorImg">
                    <Image
                      src={
                        blogData?.author_image
                          ? process.env.NEXT_PUBLIC_IMAGE_URL +
                            blogData.author_image
                          : "/assets/author.webp"
                      }
                      alt={blogData?.author || "Author"}
                      title={blogData?.author || "Author"}
                      width={100}
                      height={100}
                    />
                    <p className="mt-2 mb-0">{blogData?.author}</p>
                    {blogData?.author_handle && (
                      <Link
                        href={blogData.author_handle}
                        target="_blank"
                        style={{ textTransform: "lowercase", color: "#e76f51" }}
                      >
                        <span>@</span>
                        {blogData?.author}
                      </Link>
                    )}
                  </div>
                  <div className="authorCont">
                    <p>
                      {blogData?.author_bio ||
                        "This is the Author of this blog."}
                    </p>
                    <ul>
                      <li>
                        <SlCalender />{" "}
                        {blogData?.updated_at
                          ? formatDate(blogData?.updated_at)
                          : ""}
                      </li>
                      <li>
                        <MdMenuBook /> {readingTime} min read
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="sdeMain">
            <ul>
              <li>
                <div className="sdeOne">
                  <Link href="/seo-services" target="_blank">
                    <AiFillSetting />
                    <p className="m-0">View Our Services</p>
                  </Link>
                </div>
              </li>
              <li>
                <div className="sdeTwo">
                  <Link href="/contact-us" target="_blank">
                    <BsArrowUpRightCircleFill />
                    <p className="m-0">
                      Have an Idea Request
                      <br />A Quote
                    </p>
                  </Link>
                </div>
              </li>
              <li>
                <div className="sdeThree">
                  <BsShareFill />
                  <p className="m-0">Share this blog</p>
                </div>
                <div className="socioLnk">
                  <Link href={shareUrl("whatsapp")} target="_blank">
                    <BsWhatsapp />
                  </Link>
                  <Link href={shareUrl("linkedin")} target="_blank">
                    <BsLinkedin />
                  </Link>
                  <Link href={shareUrl("pinterest")} target="_blank">
                    <BsPinterest />
                  </Link>
                  <Link href={shareUrl("twitter")} target="_blank">
                    <BsTwitter />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  let blog = null;

  try {
    const blogRes = await axios.get(
      process.env.NEXT_PUBLIC_SITE_URL + `/getBlogBySlug/${id}`
    );

    console.log("blogRes.data.data[0]", blogRes.data.data[0]);

    if (blogRes?.data?.status) {
      blog = blogRes.data.data[0];
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  }

  return {
    props: {
      blog,
    },
  };
}

export default SingleBlog;
