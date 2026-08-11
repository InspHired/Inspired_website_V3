// users/src/components/Schema.jsx
import { Helmet } from 'react-helmet-async';

/**
 * Organization Schema - For company/organization information
 * Place this on your homepage or global layout
 */
export const OrganizationSchema = ({ 
  name = "Your Brand Name",
  url = "https://yourdomain.com",
  logo = "https://yourdomain.com/logo.png",
  description = "Your company description",
  address = {
    addressCountry: "ZA",
    addressRegion: "Gauteng",
    postalCode: "2000",
    addressLocality: "Johannesburg",
    streetAddress: "123 Main Street"
  },
  contactPoint = {
    telephone: "+27-11-123-4567",
    contactType: "customer service",
    availableLanguage: ["English"],
    areaServed: "ZA"
  },
  sameAs = [
    "https://www.facebook.com/yourpage",
    "https://www.linkedin.com/company/yourcompany",
    "https://twitter.com/yourhandle"
  ]
}) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": name,
          "url": url,
          "logo": logo,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": address.addressCountry,
            "addressRegion": address.addressRegion,
            "postalCode": address.postalCode,
            "addressLocality": address.addressLocality,
            "streetAddress": address.streetAddress
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": contactPoint.telephone,
            "contactType": contactPoint.contactType,
            "availableLanguage": contactPoint.availableLanguage,
            "areaServed": contactPoint.areaServed
          },
          "sameAs": sameAs
        })}
      </script>
    </Helmet>
  );
};

/**
 * Breadcrumb Schema - For page hierarchy/navigation
 * Use this on every page
 */
export const BreadcrumbSchema = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        })}
      </script>
    </Helmet>
  );
};

/**
 * Article Schema - For blog posts, news, or content articles
 */
export const ArticleSchema = ({ 
  headline = "Article Title",
  description = "Article description",
  image = "https://yourdomain.com/article-image.jpg",
  datePublished = "2024-01-01",
  dateModified = "2024-01-01",
  author = "Author Name",
  publisher = {
    name: "Your Brand Name",
    logo: "https://yourdomain.com/logo.png"
  },
  url = "https://yourdomain.com/article"
}) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": headline,
          "description": description,
          "image": image,
          "datePublished": datePublished,
          "dateModified": dateModified,
          "author": {
            "@type": "Person",
            "name": author
          },
          "publisher": {
            "@type": "Organization",
            "name": publisher.name,
            "logo": {
              "@type": "ImageObject",
              "url": publisher.logo
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          }
        })}
      </script>
    </Helmet>
  );
};

/**
 * Product Schema - For services or products you offer
 */
export const ProductSchema = ({ 
  name = "Service Name",
  description = "Service description",
  image = "https://yourdomain.com/product-image.jpg",
  price = "0.00",
  priceCurrency = "ZAR",
  availability = "InStock",
  url = "https://yourdomain.com/service",
  brand = "Your Brand Name",
  offers = {
    price: "0.00",
    priceCurrency: "ZAR",
    availability: "InStock",
    url: "https://yourdomain.com/service"
  }
}) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": name,
          "description": description,
          "image": image,
          "brand": {
            "@type": "Brand",
            "name": brand
          },
          "offers": {
            "@type": "Offer",
            "price": offers.price,
            "priceCurrency": offers.priceCurrency,
            "availability": offers.availability,
            "url": offers.url
          }
        })}
      </script>
    </Helmet>
  );
};

/**
 * FAQ Schema - For Frequently Asked Questions pages
 */
export const FAQSchema = ({ faqs = [] }) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>
    </Helmet>
  );
};

/**
 * Person Schema - For team members, authors, or individual profiles
 */
export const PersonSchema = ({ 
  name = "Person Name",
  jobTitle = "Job Title",
  description = "Person description",
  image = "https://yourdomain.com/person-image.jpg",
  url = "https://yourdomain.com/team",
  email = "person@company.com",
  telephone = "+27-11-123-4567",
  sameAs = [
    "https://www.linkedin.com/in/person",
    "https://twitter.com/person"
  ],
  worksFor = {
    name: "Your Brand Name",
    url: "https://yourdomain.com"
  }
}) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": name,
          "jobTitle": jobTitle,
          "description": description,
          "image": image,
          "url": url,
          "email": email,
          "telephone": telephone,
          "sameAs": sameAs,
          "worksFor": {
            "@type": "Organization",
            "name": worksFor.name,
            "url": worksFor.url
          }
        })}
      </script>
    </Helmet>
  );
};

/**
 * Service Schema - For professional services
 */
export const ServiceSchema = ({ 
  name = "Service Name",
  description = "Service description",
  provider = "Your Brand Name",
  areaServed = "ZA",
  serviceType = "Career Consulting",
  url = "https://yourdomain.com/service",
  price = "0.00",
  priceCurrency = "ZAR"
}) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": name,
          "description": description,
          "provider": {
            "@type": "Organization",
            "name": provider
          },
          "areaServed": {
            "@type": "Country",
            "name": areaServed
          },
          "serviceType": serviceType,
          "url": url,
          "offers": {
            "@type": "Offer",
            "price": price,
            "priceCurrency": priceCurrency
          }
        })}
      </script>
    </Helmet>
  );
};

/**
 * WebPage Schema - For general pages
 */
export const WebPageSchema = ({ 
  name = "Page Title",
  description = "Page description",
  url = "https://yourdomain.com/page",
  datePublished = "2024-01-01",
  dateModified = "2024-01-01",
  publisher = "Your Brand Name"
}) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": name,
          "description": description,
          "url": url,
          "datePublished": datePublished,
          "dateModified": dateModified,
          "publisher": {
            "@type": "Organization",
            "name": publisher
          }
        })}
      </script>
    </Helmet>
  );
};

/**
 * JobPosting Schema - For job listings
 */
export const JobPostingSchema = ({ 
  title = "Job Title",
  description = "Job description",
  hiringOrganization = "Your Brand Name",
  jobLocation = "Johannesburg, South Africa",
  employmentType = "FULL_TIME",
  datePosted = "2024-01-01",
  validThrough = "2024-12-31",
  salary = "50000",
  salaryCurrency = "ZAR",
  url = "https://yourdomain.com/jobs"
}) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": title,
          "description": description,
          "hiringOrganization": {
            "@type": "Organization",
            "name": hiringOrganization
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "ZA",
              "addressLocality": jobLocation
            }
          },
          "employmentType": employmentType,
          "datePosted": datePosted,
          "validThrough": validThrough,
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": salaryCurrency,
            "value": {
              "@type": "QuantitativeValue",
              "value": salary,
              "unitText": "YEAR"
            }
          },
          "url": url
        })}
      </script>
    </Helmet>
  );
};

export default {
  OrganizationSchema,
  BreadcrumbSchema,
  ArticleSchema,
  ProductSchema,
  FAQSchema,
  PersonSchema,
  ServiceSchema,
  WebPageSchema,
  JobPostingSchema
};