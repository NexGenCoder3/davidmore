import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { developerInfo } from '@/data/developer';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

/**
 * SEO component for managing page meta tags
 * Handles title, description, and Open Graph tags
 */
export function SEOHead({ 
  title, 
  description, 
  // Photo by Oyemike Princewill on Unsplash
  image = 'https://images.unsplash.com/photo-1662333085102-f6ae3be21c91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3Njk1NjB8&ixlib=rb-4.1.0&q=80&w=1080',
  type = 'website',
  noindex = false
}: SEOHeadProps) {
  const location = useLocation();
  
  const fullTitle = title 
    ? `${title} | ${developerInfo.name}` 
    : `${developerInfo.name} - ${developerInfo.tagline}`;
  
  const defaultDescription = developerInfo.heroIntroduction;
  const fullDescription = description || defaultDescription;
  
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const upsertLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Resolve image to absolute URL so crawlers fetch it correctly
    const absoluteImage = image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;

    // Standard
    updateMetaTag('description', fullDescription);

    // Open Graph
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', absoluteImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', fullTitle, true);
    updateMetaTag('og:locale', 'en_US', true);
    updateMetaTag('og:site_name', developerInfo.name, true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', absoluteImage);
    updateMetaTag('twitter:image:alt', fullTitle);

    // SEO basics
    updateMetaTag('author', developerInfo.name);
    updateMetaTag('keywords', `developer, hacker, security researcher, ${developerInfo.name}, full-stack developer, ${developerInfo.tagline}`);
    upsertLink('canonical', fullUrl);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // JSON-LD structured data — replaced per render
    const ldId = 'seo-jsonld';
    document.getElementById(ldId)?.remove();
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = ldId;
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebSite',
      name: fullTitle,
      headline: fullTitle,
      description: fullDescription,
      url: fullUrl,
      image: absoluteImage,
      author: {
        '@type': 'Person',
        name: developerInfo.name,
        jobTitle: developerInfo.tagline,
        url: baseUrl,
      },
    });
    document.head.appendChild(ld);
  }, [fullTitle, fullDescription, fullUrl, image, type, noindex, baseUrl]);

  return null;
}
