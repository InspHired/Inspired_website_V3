import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Your Brand Name",
  description = "Default description of your service",
  keywords = "keyword1, keyword2, keyword3",
  url = "https://yourdomain.com",
  image = "https://yourdomain.com/og-image.jpg",
  type = "website",
  author = "Your Company"
}) => {
  const siteTitle = title === "Your Brand Name" ? title : `${title} | Your Brand Name`;

  return (
    <Helmet>
      
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      
      
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Your Brand Name" />
      
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      
      <link rel="canonical" href={url} />
      
     
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      
      <html lang="en" />
    </Helmet>
  );
};

export default SEO;