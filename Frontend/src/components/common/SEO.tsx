import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Constellation Saving and Credit Cooperative Ltd. | Kathmandu, Nepal',
  description = 'Professional financial cooperative services in Kathmandu, Nepal. Offering savings accounts, loans, digital banking, and business directory services.',
  keywords = 'cooperative bank, savings account, loans, Nepal, Kathmandu, financial services, credit cooperative',
  image = '/logo.png',
  url = 'https://constellation.com',
  type = 'website'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Constellation Saving and Credit Cooperative Ltd." />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional */}
      <meta name="author" content="Constellation Saving and Credit Cooperative Ltd." />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;