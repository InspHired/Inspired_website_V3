// users/src/pages/BlogPage.jsx
import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { OrganizationSchema, BreadcrumbSchema } from "../components/Schema";
import { SEO_CONFIG } from "../config/seo.config";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'recruitment', label: 'Recruitment' },
    { id: 'career-tips', label: 'Career Tips' },
    { id: 'industry-news', label: 'Industry News' },
    { id: 'company-updates', label: 'Company Updates' },
  ];

  // ⚠️ TEMPORARY: Hardcoded API key for testing only
  // Remove this before deploying!
  const KIT_API_KEY = 'kit_1dc646f65fda7ff6833e857f509bb704';
  const KIT_API_URL = 'https://api.kit.com/v4';

  // Fetch blog posts from Kit.com API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('🔑 API Key exists?', !!KIT_API_KEY);

        if (!KIT_API_KEY) {
          console.warn('⚠️ Kit.com API key is missing. Using fallback data.');
          setPosts(getFallbackPosts());
          setLoading(false);
          return;
        }

        console.log('📡 Fetching from Kit API...');
        const response = await fetch(`${KIT_API_URL}/broadcasts`, {
          method: 'GET',
          headers: {
            'X-Kit-Api-Key': KIT_API_KEY,
            'Content-Type': 'application/json',
          }
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
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

        console.log('📊 Total broadcasts found:', broadcasts.length);

        // Filter to only published broadcasts
        const publishedBroadcasts = broadcasts.filter(item => {
          return item.published_at !== null && item.published_at !== undefined;
        });
        
        console.log('📊 Published broadcasts:', publishedBroadcasts.length);

        if (publishedBroadcasts.length === 0) {
          console.warn('⚠️ No published broadcasts found. Using fallback data.');
          setPosts(getFallbackPosts());
          setLoading(false);
          return;
        }

        const formattedPosts = publishedBroadcasts.map((item) => {
          // Get image from various sources
          let imageUrl = item.thumbnail_url || item.image_url || '/assets/blog-placeholder.jpg';
          
          // Try to extract image from content if no thumbnail
          if (!item.thumbnail_url && !item.image_url && item.content) {
            const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) {
              imageUrl = imgMatch[1];
            }
          }

          // Determine category from tags
          let category = 'industry-news';
          if (item.tags && item.tags.length > 0) {
            const tag = item.tags[0];
            category = tag.name || tag || 'industry-news';
          }

          return {
            id: item.id,
            title: item.subject || item.title || item.name || 'Untitled Post',
            // ✅ Use slug or fallback to id as string
            slug: item.slug || String(item.id),
            excerpt: item.excerpt || item.preview || '',
            content: item.content || item.body || '',
            image: imageUrl,
            category: category,
            author: item.created_by?.name || item.author || 'InspHired Team',
            date: item.published_at || item.created_at || new Date().toISOString(),
            readTime: item.read_time || `${Math.ceil((item.content?.length || 0) / 1000)} min read`,
          };
        });

        console.log('✅ Formatted posts:', formattedPosts.length);
        setPosts(formattedPosts);
      } catch (err) {
        console.error('❌ Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setPosts(getFallbackPosts());
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Fallback demo data
  const getFallbackPosts = () => {
    return [
      {
        id: 1,
        title: "The Future of Recruitment in Africa: AI and Human Connection",
        slug: "future-of-recruitment-africa-ai",
        excerpt: "Discover how artificial intelligence is transforming the recruitment landscape across Africa while maintaining the human touch that makes hiring truly effective.",
        image: "/assets/blog-ai-recruitment.jpg",
        category: "recruitment",
        author: "Landry Mutombo",
        date: "2026-03-15",
        readTime: "5 min read",
      },
      {
        id: 2,
        title: "5 Essential Career Tips for Recent Graduates",
        slug: "essential-career-tips-graduates",
        excerpt: "Navigate the job market with confidence. These essential tips will help you stand out and land your dream role.",
        image: "/assets/blog-career-tips.jpg",
        category: "career-tips",
        author: "Norma Banda",
        date: "2026-03-10",
        readTime: "4 min read",
      },
      {
        id: 3,
        title: "InspHired Connect: Revolutionizing Free Job Boards",
        slug: "insphired-connect-revolution",
        excerpt: "Learn how InspHired Connect is democratizing access to job opportunities across Southern Africa with zero-cost recruitment tools.",
        image: "/assets/blog-connect.jpg",
        category: "company-updates",
        author: "Rochelle Titus",
        date: "2026-03-05",
        readTime: "3 min read",
      },
      {
        id: 4,
        title: "Skills Gap in South Africa: Bridging the Divide",
        slug: "skills-gap-south-africa",
        excerpt: "Addressing the critical skills shortage in South Africa's workforce and how companies can develop the talent they need.",
        image: "/assets/blog-skills.jpg",
        category: "industry-news",
        author: "Deborah Mubenga",
        date: "2026-02-28",
        readTime: "6 min read",
      },
      {
        id: 5,
        title: "The Rise of Remote Work in Africa",
        slug: "rise-remote-work-africa",
        excerpt: "Exploring the shift to remote work across the continent and what it means for employers and job seekers alike.",
        image: "/assets/blog-remote.jpg",
        category: "recruitment",
        author: "Joyce Muya",
        date: "2026-02-20",
        readTime: "4 min read",
      },
      {
        id: 6,
        title: "Why Company Culture Matters in Recruitment",
        slug: "why-company-culture-matters",
        excerpt: "Understanding how company culture impacts talent attraction, retention, and overall business success.",
        image: "/assets/blog-culture.jpg",
        category: "recruitment",
        author: "Stefanie Peters",
        date: "2026-02-15",
        readTime: "5 min read",
      },
    ];
  };

  // Filter and search posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Truncate text
  const truncateText = (text, maxLength = 140) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // SEO Variables
  const companyName = SEO_CONFIG.companyName;
  const siteUrl = SEO_CONFIG.siteUrl;
  const pageTitle = "Blog | " + companyName;
  const pageDescription = "Stay updated with the latest insights, news, and tips from InspHired. Explore our blog for recruitment trends, career advice, and company updates.";
  const pageUrl = siteUrl + "/blog";

  // Breadcrumb schema
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: pageUrl }
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${siteUrl}/assets/og-blog.jpg`} />
        <meta property="og:site_name" content={companyName} />
        <meta property="og:locale" content="en_ZA" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        <meta name="theme-color" content="#509b9e" />
      </Helmet>

      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="blog-page">
        <style>{`
          .blog-page {
            color: var(--navy);
            background-color: var(--bg);
            line-height: 1.65;
            min-height: 100vh;
          }

          .blog-page .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 clamp(16px, 4vw, 32px);
            width: 100%;
          }

          /* ===== HERO ===== */
          .blog-hero {
            background: linear-gradient(145deg, #1a2e38 0%, #0f1e26 100%);
            padding: clamp(80px, 12vw, 120px) 0 clamp(60px, 8vw, 80px);
            color: #FFFFFF;
            position: relative;
            overflow: hidden;
            border-bottom: 4px solid rgba(80, 155, 158, 0.3);
          }

          .blog-hero::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 40%;
            height: 100%;
            background: radial-gradient(ellipse at 80% 50%, rgba(80, 155, 158, 0.1) 0%, transparent 70%);
            pointer-events: none;
          }

          .blog-hero-content {
            position: relative;
            z-index: 2;
            max-width: 720px;
          }

          .blog-hero .eyebrow {
            display: inline-block;
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--teal, #509b9e);
            background: rgba(80, 155, 158, 0.15);
            padding: 6px 16px;
            border-radius: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(80, 155, 158, 0.15);
          }

          .blog-hero h1 {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: clamp(2.4rem, 5vw, 3.6rem);
            font-weight: 700;
            margin: 0 0 16px 0;
            letter-spacing: -1px;
            line-height: 1.15;
          }

          .blog-hero p {
            font-size: clamp(1rem, 1.2vw, 1.1rem);
            color: rgba(255, 255, 255, 0.7);
            max-width: 580px;
            line-height: 1.7;
          }

          /* ===== FILTER BAR ===== */
          .filter-bar {
            padding: clamp(24px, 3vw, 32px) 0;
            background: #FFFFFF;
            border-bottom: 1px solid var(--border-light);
            position: sticky;
            top: 72px;
            z-index: 50;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          .filter-bar-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
          }

          .filter-categories {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .filter-btn {
            padding: 8px 20px;
            border: 1px solid var(--border-light);
            border-radius: 30px;
            background: transparent;
            color: var(--navy);
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
          }

          .filter-btn:hover {
            background: rgba(80, 155, 158, 0.08);
            border-color: var(--teal);
          }

          .filter-btn.active {
            background: var(--teal);
            color: #FFFFFF;
            border-color: var(--teal);
          }

          .filter-search {
            position: relative;
            min-width: 200px;
          }

          .filter-search input {
            width: 100%;
            padding: 10px 16px 10px 40px;
            border: 1px solid var(--border-light);
            border-radius: 30px;
            font-size: 0.9rem;
            font-family: inherit;
            background: var(--bg);
            transition: all 0.3s ease;
            color: var(--navy);
          }

          .filter-search input:focus {
            outline: none;
            border-color: var(--teal);
            box-shadow: 0 0 0 4px rgba(80, 155, 158, 0.1);
          }

          .filter-search .search-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #7a8790;
            pointer-events: none;
          }

          /* ===== BLOG GRID ===== */
          .blog-grid-section {
            padding: clamp(40px, 6vw, 60px) 0;
          }

          .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: clamp(24px, 3vw, 32px);
          }

          /* ===== BLOG CARD ===== */
          .blog-card {
            background: #FFFFFF;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid var(--border-light);
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .blog-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
          }

          .blog-card-image {
            height: clamp(180px, 25vw, 220px);
            overflow: hidden;
            position: relative;
            background: #f0f0f0;
          }

          .blog-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }

          .blog-card:hover .blog-card-image img {
            transform: scale(1.05);
          }

          .blog-card-image .category-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: rgba(31, 53, 64, 0.8);
            color: #FFFFFF;
            backdrop-filter: blur(4px);
          }

          .blog-card-image .placeholder-image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #e5dfd5 0%, #d5cfc5 100%);
            color: #7a8790;
            font-size: 3rem;
          }

          .blog-card-body {
            padding: clamp(20px, 2.5vw, 28px);
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }

          .blog-card-meta {
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 0.8rem;
            color: #7a8790;
            margin-bottom: 12px;
            flex-wrap: wrap;
          }

          .blog-card-meta .author {
            color: var(--teal);
            font-weight: 600;
          }

          .blog-card-title {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: clamp(1.1rem, 1.5vw, 1.3rem);
            font-weight: 700;
            color: var(--navy);
            margin: 0 0 12px 0;
            line-height: 1.3;
            transition: color 0.3s ease;
          }

          .blog-card:hover .blog-card-title {
            color: var(--teal);
          }

          .blog-card-excerpt {
            font-size: 0.9rem;
            color: #5B6670;
            line-height: 1.6;
            flex-grow: 1;
            margin-bottom: 16px;
          }

          .blog-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 16px;
            border-top: 1px solid var(--border-light);
          }

          .blog-card-read-time {
            font-size: 0.8rem;
            color: #7a8790;
          }

          .blog-card-read-more {
            color: var(--teal);
            font-weight: 600;
            font-size: 0.85rem;
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }

          .blog-card-read-more:hover {
            color: #39797c;
            gap: 8px;
          }

          /* ===== LOADING ===== */
          .blog-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            min-height: 300px;
          }

          .blog-loading .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-light);
            border-top-color: var(--teal);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          .blog-loading p {
            margin-top: 16px;
            color: #7a8790;
          }

          /* ===== EMPTY STATE ===== */
          .blog-empty {
            text-align: center;
            padding: 60px 20px;
          }

          .blog-empty .icon {
            font-size: 3rem;
            margin-bottom: 16px;
          }

          .blog-empty h3 {
            font-family: 'Playfair Display', Georgia, serif !important;
            font-size: 1.5rem;
            color: var(--navy);
            margin-bottom: 8px;
          }

          .blog-empty p {
            color: #5B6670;
            max-width: 400px;
            margin: 0 auto;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          /* ===== RESPONSIVE ===== */
          @media (max-width: 1024px) {
            .blog-grid {
              grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            }
          }

          @media (max-width: 820px) {
            .filter-bar-inner {
              flex-direction: column;
              align-items: stretch;
            }
            
            .filter-categories {
              justify-content: center;
            }
            
            .filter-search {
              min-width: unset;
            }
            
            .blog-grid {
              grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            }
          }

          @media (max-width: 600px) {
            .blog-hero {
              padding: 60px 0 40px;
            }
            
            .blog-grid {
              grid-template-columns: 1fr;
              max-width: 420px;
              margin: 0 auto;
            }
            
            .blog-card-image {
              height: 160px;
            }
            
            .filter-categories {
              gap: 6px;
            }
            
            .filter-btn {
              font-size: 0.75rem;
              padding: 6px 14px;
            }
          }
        `}</style>

        {/* ===== HERO ===== */}
        <section className="blog-hero">
          <div className="container">
            <div className="blog-hero-content">
              <span className="eyebrow">Insights & Updates</span>
              <h1>InspHired Blog</h1>
              <p>
                Stay informed with the latest recruitment trends, career advice, industry news, 
                and updates from the InspHired team.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FILTER BAR ===== */}
        <div className="filter-bar">
          <div className="container">
            <div className="filter-bar-inner">
              <div className="filter-categories">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="filter-search">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== BLOG GRID ===== */}
        <section className="blog-grid-section">
          <div className="container">
            {loading ? (
              <div className="blog-loading">
                <div className="spinner"></div>
                <p>Loading posts...</p>
              </div>
            ) : error ? (
              <div className="blog-empty">
                <div className="icon">⚠️</div>
                <h3>Something went wrong</h3>
                <p>{error}</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="blog-empty">
                <div className="icon">📝</div>
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="blog-grid">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="blog-card">
                    <div className="blog-card-image">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const parent = e.target.parentElement;
                            const badge = parent.querySelector('.category-badge');
                            parent.innerHTML = `
                              <div class="placeholder-image">📝</div>
                              ${badge ? badge.outerHTML : ''}
                            `;
                          }}
                        />
                      ) : (
                        <div className="placeholder-image">📝</div>
                      )}
                      <span className="category-badge">
                        {categories.find(c => c.id === post.category)?.label || post.category}
                      </span>
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <span className="author">{post.author}</span>
                        <span>•</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{truncateText(post.excerpt)}</p>
                      <div className="blog-card-footer">
                        <span className="blog-card-read-time">⏱️ {post.readTime}</span>
                        <Link to={`/blog/${post.slug}`} className="blog-card-read-more">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;