// users/src/pages/BlogPostPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from "../config/seo.config";

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⚠️ TEMPORARY: Hardcoded API key for testing only
  // Remove this before deploying!
  const KIT_API_KEY = 'kit_1dc646f65fda7ff6833e857f509bb704';
  const KIT_API_URL = 'https://api.kit.com/v4';

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('🔑 API Key exists?', !!KIT_API_KEY);
        console.log('📊 Looking for slug/id:', slug);

        if (!KIT_API_KEY) {
          console.warn('⚠️ Kit.com API key is missing.');
          const fallbackPost = getFallbackPost(slug);
          if (fallbackPost) {
            setPost(fallbackPost);
          } else {
            setError('Post not found');
          }
          setLoading(false);
          return;
        }

        // Fetch all broadcasts
        const response = await fetch(`${KIT_API_URL}/broadcasts`, {
          method: 'GET',
          headers: {
            'X-Kit-Api-Key': KIT_API_KEY,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch broadcasts: ${response.status}`);
        }

        const data = await response.json();
        
        console.log('📊 Full API Response:', data);
        
        // Handle different response structures
        let broadcasts = [];
        if (data.broadcasts && Array.isArray(data.broadcasts)) {
          broadcasts = data.broadcasts;
          console.log('📊 Found broadcasts in data.broadcasts:', broadcasts.length);
        } else if (data.data && Array.isArray(data.data)) {
          broadcasts = data.data;
          console.log('📊 Found broadcasts in data.data:', broadcasts.length);
        } else if (Array.isArray(data)) {
          broadcasts = data;
          console.log('📊 Data is an array:', broadcasts.length);
        }

        console.log('📊 Available broadcasts:', broadcasts.map(b => ({
          id: b.id,
          slug: b.slug || 'NO_SLUG',
          subject: b.subject || b.title
        })));

        // ✅ Try multiple ways to find the broadcast
        let broadcast = null;
        
        // 1. Try by slug
        broadcast = broadcasts.find(b => b.slug === slug);
        if (broadcast) {
          console.log('✅ Found by slug:', broadcast.subject);
        }
        
        // 2. Try by id (if slug is a number)
        if (!broadcast) {
          broadcast = broadcasts.find(b => String(b.id) === String(slug));
          if (broadcast) {
            console.log('✅ Found by id:', broadcast.subject);
          }
        }
        
        // 3. Try by subject (if slug matches part of the subject)
        if (!broadcast) {
          broadcast = broadcasts.find(b => 
            b.subject && b.subject.toLowerCase().includes(slug.toLowerCase())
          );
          if (broadcast) {
            console.log('✅ Found by subject match:', broadcast.subject);
          }
        }
        
        // 4. If still not found, use the first published broadcast
        if (!broadcast) {
          const published = broadcasts.filter(b => b.published_at !== null);
          if (published.length > 0) {
            broadcast = published[0];
            console.log('📊 Using first published broadcast as fallback:', broadcast.subject);
          }
        }
        
        if (broadcast) {
          setPost(transformPostData(broadcast));
        } else {
          console.warn('⚠️ No broadcast found. Using fallback data.');
          const fallbackPost = getFallbackPost(slug);
          if (fallbackPost) {
            setPost(fallbackPost);
          } else {
            setError('Post not found');
          }
        }

      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message || 'Failed to load blog post. Please try again.');
        const fallbackPost = getFallbackPost(slug);
        if (fallbackPost) {
          setPost(fallbackPost);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Transform Kit.com broadcast data to our format
  const transformPostData = (broadcast) => {
    let imageUrl = broadcast.thumbnail_url || broadcast.image_url || '/assets/blog-placeholder.jpg';
    
    if (!broadcast.thumbnail_url && !broadcast.image_url && broadcast.content) {
      const imgMatch = broadcast.content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) {
        imageUrl = imgMatch[1];
      }
    }

    let category = 'industry-news';
    if (broadcast.tags && broadcast.tags.length > 0) {
      const tag = broadcast.tags[0];
      category = tag.name || tag || 'industry-news';
    }

    return {
      id: broadcast.id,
      title: broadcast.subject || broadcast.title || broadcast.name || 'Untitled Post',
      slug: broadcast.slug || String(broadcast.id),
      content: broadcast.content || broadcast.body || '',
      excerpt: broadcast.excerpt || broadcast.preview || '',
      image: imageUrl,
      category: category,
      author: broadcast.created_by?.name || broadcast.author || 'InspHired Team',
      date: broadcast.published_at || broadcast.created_at || new Date().toISOString(),
      readTime: broadcast.read_time || `${Math.ceil((broadcast.content?.length || 0) / 1000)} min read`,
    };
  };

  // Fallback demo data
  const getFallbackPost = (slug) => {
    const fallbackPosts = {
      'future-of-recruitment-africa-ai': {
        id: 1,
        title: "The Future of Recruitment in Africa: AI and Human Connection",
        slug: "future-of-recruitment-africa-ai",
        content: `
          <h2>The Rise of AI in African Recruitment</h2>
          <p>Artificial intelligence is transforming the recruitment landscape across Africa. From automated candidate screening to predictive analytics, AI is helping companies find the right talent faster than ever before.</p>
          
          <h3>The Human Element</h3>
          <p>While AI handles the heavy lifting of data processing and initial screening, the human element remains crucial. Understanding cultural fit, soft skills, and the nuances of a candidate's experience still requires human insight.</p>
          
          <h3>The Future Outlook</h3>
          <p>As AI technology continues to evolve, we expect to see even more sophisticated matching algorithms that consider not just skills and experience, but also personality traits and cultural alignment.</p>
        `,
        image: "/assets/blog-ai-recruitment.jpg",
        category: "recruitment",
        author: "Landry Mutombo",
        date: "2026-03-15",
        readTime: "5 min read",
      },
      'essential-career-tips-graduates': {
        id: 2,
        title: "5 Essential Career Tips for Recent Graduates",
        slug: "essential-career-tips-graduates",
        content: `
          <h2>Navigating the Job Market</h2>
          <p>Starting your career journey can be overwhelming. Here are five essential tips to help you stand out and land your dream role.</p>
          
          <h3>1. Build Your Personal Brand</h3>
          <p>Your personal brand is how you present yourself to the world. Update your LinkedIn profile, create a professional portfolio, and showcase your skills and achievements.</p>
          
          <h3>2. Network Strategically</h3>
          <p>Networking is about building genuine relationships. Attend industry events, connect with professionals on LinkedIn, and don't be afraid to reach out for informational interviews.</p>
          
          <h3>3. Tailor Your Applications</h3>
          <p>Generic applications rarely succeed. Research each company and role, and tailor your CV and cover letter to show how your skills align with their needs.</p>
        `,
        image: "/assets/blog-career-tips.jpg",
        category: "career-tips",
        author: "Norma Banda",
        date: "2026-03-10",
        readTime: "4 min read",
      },
      'insphired-connect-revolution': {
        id: 3,
        title: "InspHired Connect: Revolutionizing Free Job Boards",
        slug: "insphired-connect-revolution",
        content: `
          <h2>Democratizing Job Access</h2>
          <p>InspHired Connect is changing the way job seekers and employers connect across Southern Africa. As a completely free job board and e-recruitment CRM, it's removing barriers to employment.</p>
          
          <h3>Free for Everyone</h3>
          <p>Small businesses, startups, NGOs, and job seekers can all use InspHired Connect at zero cost. This levels the playing field and creates more opportunities for everyone.</p>
          
          <h3>Smart Matching Technology</h3>
          <p>Our intelligent matching system connects the right candidates with the right opportunities, making the recruitment process faster and more efficient.</p>
        `,
        image: "/assets/blog-connect.jpg",
        category: "company-updates",
        author: "Rochelle Titus",
        date: "2026-03-05",
        readTime: "3 min read",
      },
      'skills-gap-south-africa': {
        id: 4,
        title: "Skills Gap in South Africa: Bridging the Divide",
        slug: "skills-gap-south-africa",
        content: `
          <h2>Addressing the Skills Shortage</h2>
          <p>South Africa faces a critical skills shortage that impacts economic growth and individual opportunity. Understanding this gap is the first step to bridging it.</p>
          
          <h3>The Challenge</h3>
          <p>Many industries struggle to find qualified candidates, while many job seekers lack the specific skills employers need. This mismatch creates unemployment and unfilled positions.</p>
          
          <h3>The Solution</h3>
          <p>Through training programs, apprenticeships, and partnerships with educational institutions, we can build the skills pipeline needed for South Africa's future workforce.</p>
        `,
        image: "/assets/blog-skills.jpg",
        category: "industry-news",
        author: "Deborah Mubenga",
        date: "2026-02-28",
        readTime: "6 min read",
      },
      'rise-remote-work-africa': {
        id: 5,
        title: "The Rise of Remote Work in Africa",
        slug: "rise-remote-work-africa",
        content: `
          <h2>Remote Work is Here to Stay</h2>
          <p>The shift to remote work has transformed the African workforce, creating new opportunities for talent across the continent and beyond.</p>
          
          <h3>Breaking Geographic Barriers</h3>
          <p>Talent is everywhere, and remote work allows companies to access the best candidates regardless of location. This is particularly powerful in Africa, where talent is abundant but opportunities can be limited regionally.</p>
          
          <h3>The Future of Work</h3>
          <p>As digital infrastructure improves across the continent, remote work will continue to grow, creating economic opportunities for individuals and businesses alike.</p>
        `,
        image: "/assets/blog-remote.jpg",
        category: "recruitment",
        author: "Joyce Muya",
        date: "2026-02-20",
        readTime: "4 min read",
      },
      'why-company-culture-matters': {
        id: 6,
        title: "Why Company Culture Matters in Recruitment",
        slug: "why-company-culture-matters",
        content: `
          <h2>Culture is Everything</h2>
          <p>Company culture is no longer just a nice-to-have—it's a critical factor in attracting and retaining top talent.</p>
          
          <h3>Attracting the Right Talent</h3>
          <p>When companies clearly communicate their values and culture, they attract candidates who are more likely to thrive and stay long-term.</p>
          
          <h3>Retention and Engagement</h3>
          <p>Employees who align with company culture are more engaged, productive, and likely to stay with the organization.</p>
        `,
        image: "/assets/blog-culture.jpg",
        category: "recruitment",
        author: "Stefanie Peters",
        date: "2026-02-15",
        readTime: "5 min read",
      },
    };
    
    return fallbackPosts[slug] || null;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get category label
  const getCategoryLabel = (categoryId) => {
    const categories = {
      'recruitment': 'Recruitment',
      'career-tips': 'Career Tips',
      'industry-news': 'Industry News',
      'company-updates': 'Company Updates',
    };
    return categories[categoryId] || categoryId;
  };

  // SEO Variables
  const companyName = SEO_CONFIG.companyName;
  const siteUrl = SEO_CONFIG.siteUrl;
  const pageTitle = post ? `${post.title} | ${companyName} Blog` : 'Blog Post | ' + companyName;
  const pageDescription = post?.excerpt || "Read the latest insights from InspHired's blog.";
  const pageUrl = `${siteUrl}/blog/${slug}`;

  // Show loading state
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '40px 20px',
        background: 'var(--bg, #faf6f0)'
      }}>
        <style>{`
          .blog-post-loading .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-light, #e5dfd5);
            border-top-color: var(--teal, #509b9e);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          .blog-post-loading p {
            margin-top: 16px;
            color: #7a8790;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div className="spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '40px 20px',
        textAlign: 'center',
        background: 'var(--bg, #faf6f0)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
        <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#1f3540', marginBottom: '8px' }}>Something went wrong</h3>
        <p style={{ color: '#d96b43', maxWidth: '400px', margin: '0 auto 20px' }}>{error}</p>
        <Link to="/blog" style={{
          display: 'inline-block',
          padding: '12px 28px',
          background: '#509b9e',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          textDecoration: 'none'
        }}>← Back to Blog</Link>
      </div>
    );
  }

  // Show not found state
  if (!post) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '40px 20px',
        textAlign: 'center',
        background: 'var(--bg, #faf6f0)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
        <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', color: '#1f3540', marginBottom: '8px' }}>Post Not Found</h3>
        <p style={{ color: '#5B6670', maxWidth: '400px', margin: '0 auto 20px' }}>The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" style={{
          display: 'inline-block',
          padding: '12px 28px',
          background: '#509b9e',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          textDecoration: 'none'
        }}>← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:site_name" content={companyName} />
        <meta property="og:locale" content="en_ZA" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        
        <meta name="theme-color" content="#509b9e" />
      </Helmet>

      <div className="blog-post-page">
        <style>{`
          .blog-post-page {
            background: var(--bg, #faf6f0);
            color: var(--navy, #1f3540);
            line-height: 1.65;
          }
          .blog-post-page .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 clamp(16px, 4vw, 32px);
          }

          /* ===== HERO ===== */
          .blog-post-hero {
            background: linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%);
            padding: clamp(60px, 10vw, 100px) 0 clamp(40px, 6vw, 60px);
            color: #FFFFFF;
            position: relative;
            overflow: hidden;
          }

          .blog-post-hero::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 40%;
            height: 100%;
            background: radial-gradient(ellipse at 80% 50%, rgba(80, 155, 158, 0.1) 0%, transparent 70%);
            pointer-events: none;
          }

          .blog-post-hero .container {
            position: relative;
            z-index: 2;
          }

          .blog-post-hero .back-link {
            display: inline-block;
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            font-size: 0.9rem;
            margin-bottom: 20px;
            transition: color 0.3s ease;
          }

          .blog-post-hero .back-link:hover {
            color: #ffffff;
          }

          .blog-post-hero .category-tag {
            display: inline-block;
            padding: 4px 16px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: rgba(80, 155, 158, 0.2);
            color: var(--teal, #509b9e);
            margin-bottom: 16px;
          }

          .blog-post-hero h1 {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: clamp(2rem, 4.5vw, 3.2rem);
            font-weight: 700;
            margin: 0 0 16px 0;
            letter-spacing: -1px;
            line-height: 1.15;
          }

          .blog-post-hero .meta {
            display: flex;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
          }

          .blog-post-hero .meta .author {
            color: var(--teal, #509b9e);
            font-weight: 600;
          }

          .blog-post-hero .meta .dot {
            color: rgba(255, 255, 255, 0.3);
          }

          .blog-post-hero .featured-image {
            margin-top: 32px;
            border-radius: 16px;
            overflow: hidden;
            max-height: 400px;
          }

          .blog-post-hero .featured-image img {
            width: 100%;
            height: 100%;
            max-height: 400px;
            object-fit: cover;
          }

          .blog-post-hero .featured-image .placeholder-image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #e5dfd5 0%, #d5cfc5 100%);
            color: #7a8790;
            font-size: 4rem;
          }

          /* ===== CONTENT ===== */
          .blog-post-content {
            padding: clamp(40px, 6vw, 60px) 0;
            background: #FFFFFF;
          }

          .blog-post-content .content-body {
            font-size: 1.05rem;
            line-height: 1.8;
            color: #2d3748;
          }

          .blog-post-content .content-body h2 {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: 1.8rem;
            font-weight: 700;
            margin: 40px 0 16px;
            color: var(--navy, #1f3540);
          }

          .blog-post-content .content-body h3 {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: 1.4rem;
            font-weight: 700;
            margin: 32px 0 12px;
            color: var(--navy, #1f3540);
          }

          .blog-post-content .content-body p {
            margin-bottom: 16px;
          }

          .blog-post-content .content-body ul, 
          .blog-post-content .content-body ol {
            margin: 16px 0 24px 24px;
          }

          .blog-post-content .content-body li {
            margin-bottom: 8px;
          }

          .blog-post-content .content-body blockquote {
            border-left: 4px solid var(--teal, #509b9e);
            padding: 16px 24px;
            margin: 24px 0;
            background: var(--bg, #faf6f0);
            border-radius: 0 12px 12px 0;
            font-style: italic;
            color: #4a5568;
          }

          .blog-post-content .content-body img {
            max-width: 100%;
            border-radius: 12px;
            margin: 24px 0;
          }

          /* ===== FOOTER ===== */
          .blog-post-footer {
            padding: 32px 0 60px;
            border-top: 1px solid var(--border-light, #e5dfd5);
            background: #FFFFFF;
          }

          .blog-post-footer .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--teal, #509b9e);
            text-decoration: none;
            font-weight: 600;
            transition: gap 0.3s ease;
          }

          .blog-post-footer .back-link:hover {
            gap: 12px;
          }

          /* ===== RESPONSIVE ===== */
          @media (max-width: 600px) {
            .blog-post-hero h1 {
              font-size: 1.8rem;
            }
            
            .blog-post-content .content-body {
              font-size: 0.95rem;
            }
            
            .blog-post-content .content-body h2 {
              font-size: 1.4rem;
            }
            
            .blog-post-content .content-body h3 {
              font-size: 1.2rem;
            }
          }
        `}</style>

        {/* ===== HERO ===== */}
        <section className="blog-post-hero">
          <div className="container">
            <Link to="/blog" className="back-link">← Back to Blog</Link>
            <span className="category-tag">{getCategoryLabel(post.category)}</span>
            <h1>{post.title}</h1>
            <div className="meta">
              <span className="author">{post.author}</span>
              <span className="dot">•</span>
              <span>{formatDate(post.date)}</span>
              <span className="dot">•</span>
              <span>⏱️ {post.readTime}</span>
            </div>
            <div className="featured-image">
              {post.image ? (
                <img 
                  src={post.image} 
                  alt={post.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="placeholder-image">📝</div>`;
                  }}
                />
              ) : (
                <div className="placeholder-image">📝</div>
              )}
            </div>
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <section className="blog-post-content">
          <div className="container">
            <div 
              className="content-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <section className="blog-post-footer">
          <div className="container">
            <Link to="/blog" className="back-link">← Back to Blog</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPostPage;