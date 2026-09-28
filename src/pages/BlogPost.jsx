import { useParams, Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/products";
import "./BlogPost.css";

const BODY_CONTENT = {
  "caring-for-your-wood": [
    "Every Touri Crafts piece is finished by hand, and a little care goes a long way in keeping it looking rich for years.",
    "Wipe with a soft, dry cloth after use — avoid soaking the wood or leaving it in direct sunlight for long periods.",
    "Every few months, a light coat of food-safe mineral oil (for boards) or furniture wax (for tables and lamps) will keep the wood conditioned and the grain glowing.",
  ],
  "story-behind-the-carvings": [
    "The lines etched into many of our pieces aren't just decoration — they're inspired by traditional tribal marks, once used across Nigerian communities to signify identity, lineage, and belonging.",
    "We carry that same spirit of identity into each carving, reimagining old symbols in a modern, everyday form.",
    "When you bring a Touri Crafts piece into your home, you're holding onto a small piece of that story.",
  ],
  "fun-facts-about-our-wood": [
    "Every board, table, and lamp we make starts as a raw, unshaped piece of timber — no two grain patterns are ever identical.",
    "We work primarily with solid hardwood, chosen for its strength and the way it ages beautifully over time.",
    "Every carving is done entirely by hand — no two Touri Crafts pieces will ever be perfectly identical.",
  ],
};

export default function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id);
  const body = BODY_CONTENT[id] || [];

  if (!post) {
    return (
      <div className="container blog-not-found">
        <p>This post could not be found.</p>
        <Link to="/blog">Back to blog</Link>
      </div>
    );
  }

  return (
    <article className="blog-post dark-section">
      <div className="blog-post-hero"><img src={post.image} alt={post.title} /></div>
      <div className="container blog-post-body">
        <Link to="/blog" className="blog-back-link">← Back to Blog</Link>
        <span className="blog-post-date">{post.date}</span>
        <h1>{post.title}</h1>
        {body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </article>
  );
}
