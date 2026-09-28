import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { BLOG_POSTS } from "../data/products";
import "./Blog.css";

export default function Blog() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("blog-card-visible");
      }),
      { threshold: 0.15 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="blog-page dark-section">
      <div className="container">
        <div className="blog-header">
          <span className="section-label">From the Workshop</span>
          <h1 className="section-title">Stories, Culture & Craft</h1>
          <p>African culture, the meaning behind our carvings, and how to care for the wood in your home.</p>
        </div>

        <div className="blog-grid">
          {BLOG_POSTS.map((post, i) => (
            <Link to={`/blog/${post.id}`} key={post.id} ref={(el) => (cardsRef.current[i] = el)} className="blog-card">
              <div className="blog-card-image"><img src={post.image} alt={post.title} /></div>
              <span className="blog-card-date">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
