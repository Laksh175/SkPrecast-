import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components';
import { Home, About, ProductsPage, ProductDetailPage, CataloguesPage, ContactUsPage, BlogPage, BlogDetailPage, GalleryPage, ManufacturingUnitPage, SitemapPage, CurrentJobsPage, TestimonialsPage, RssFeedPage } from './pages';
import { getProductBySlug } from './data/productsData';
import { getBlogPostBySlug } from './data/blogData';

const getInitialRoute = () => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // 0. Check for RSS feed
  if (path.includes('products.rss') || path === '/products.rss' || hash.includes('products.rss') || hash === '#rss') {
    return { name: 'rss-feed' };
  }

  // 1. Check if URL matches ANY of our blog posts dynamically
  if (
    (path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog') ||
    path.includes('_41150.htm') ||
    path.includes('_40190.htm')
  ) {
    const matchedBlog = getBlogPostBySlug(path) || (hash ? getBlogPostBySlug(hash) : null);
    if (matchedBlog) {
      return { name: 'blog-detail', slug: matchedBlog.slug };
    }
  }

  // 2. Check if URL matches ANY of our 35 products dynamically
  const matchedProduct = getProductBySlug(path) || (hash ? getProductBySlug(hash) : null);
  if (matchedProduct) {
    return { name: 'product-detail', slug: matchedProduct.slug };
  }

  // 3. Clean legacy hash redirects
  if (hash.includes('about')) {
    window.history.replaceState({}, '', '/about-us');
    return { name: 'about' };
  } else if (hash.includes('contact')) {
    window.history.replaceState({}, '', '/contact-us');
    return { name: 'contact' };
  } else if (hash.includes('testimonial')) {
    window.history.replaceState({}, '', '/testimonials.htm');
    return { name: 'testimonials' };
  } else if (hash.includes('current-job') || hash.includes('jobs')) {
    window.history.replaceState({}, '', '/current-jobs.htm');
    return { name: 'current-jobs' };
  } else if (hash.includes('manufacturing')) {
    window.history.replaceState({}, '', '/wall-manufacturing-unit.htm');
    return { name: 'manufacturing-unit' };
  } else if (hash.includes('gallery')) {
    window.history.replaceState({}, '', '/gallery.htm');
    return { name: 'gallery' };
  } else if (hash.includes('sitemap')) {
    window.history.replaceState({}, '', '/sitemap.htm');
    return { name: 'sitemap' };
  } else if (hash.includes('catalog')) {
    window.history.replaceState({}, '', '/catalogues');
    return { name: 'catalogues' };
  } else if (hash.includes('blog')) {
    window.history.replaceState({}, '', '/blog');
    return { name: 'blog' };
  } else if (hash.includes('products') || hash.includes('product')) {
    window.history.replaceState({}, '', '/products');
    return { name: 'products' };
  } else if (hash === '#/' || hash === '#home') {
    window.history.replaceState({}, '', '/');
    return { name: 'home' };
  }

  if (
    path.includes('/testimonials') || 
    path.includes('/testimonial') || 
    path === '/testimonials.htm' ||
    path === '/testimonial.htm'
  ) {
    return { name: 'testimonials' };
  }

  if (
    path.includes('/current-jobs') || 
    path === '/current-jobs.htm' ||
    path === '/current-job' ||
    path === '/jobs'
  ) {
    return { name: 'current-jobs' };
  }

  if (
    path.includes('/sitemap') ||
    path === '/sitemap.htm'
  ) {
    return { name: 'sitemap' };
  }

  if (
    path.includes('/contact-us') || 
    path.includes('/contact') || 
    path === '/contact-us.htm' ||
    path === '/contact.htm'
  ) {
    return { name: 'contact' };
  }

  if (
    path.includes('/about-us') || 
    path.includes('/about') || 
    path === '/about-us.htm'
  ) {
    return { name: 'about' };
  }

  if (
    path === '/blog' || 
    path === '/blog/' || 
    path === '/blog.htm'
  ) {
    return { name: 'blog' };
  }

  if (
    path.includes('/gallery') || 
    path === '/gallery.htm'
  ) {
    return { name: 'gallery' };
  }

  if (
    path.includes('/wall-manufacturing-unit') || 
    path === '/wall-manufacturing-unit.htm' ||
    path === '/manufacturing-unit'
  ) {
    return { name: 'manufacturing-unit' };
  }

  if (
    path.includes('/catalogues') || 
    path.includes('/catalogue') || 
    path.includes('/catalog') || 
    path === '/catalogues.htm' ||
    path === '/catalog.htm'
  ) {
    return { name: 'catalogues' };
  }

  if (
    path.includes('/products') || 
    path.includes('/product') || 
    path === '/products.htm' ||
    path.includes('/compound-wall') ||
    path.includes('/boundary-wall') ||
    path.includes('/cement-wall') ||
    path.includes('/other-products')
  ) {
    return { name: 'products' };
  }

  return { name: 'home' };
};

function App() {
  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // 0. Check for RSS feed
      if (path.includes('products.rss') || path === '/products.rss' || hash.includes('products.rss') || hash === '#rss') {
        setCurrentRoute({ name: 'rss-feed' });
        return;
      }

      // 1. Dynamic Match for Blog Detail Posts
      if (
        (path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog') ||
        path.includes('_41150.htm') ||
        path.includes('_40190.htm') ||
        hash.includes('_41150') ||
        hash.includes('_40190')
      ) {
        const matchedBlog = getBlogPostBySlug(path) || (hash ? getBlogPostBySlug(hash) : null);
        if (matchedBlog) {
          setCurrentRoute({ name: 'blog-detail', slug: matchedBlog.slug });
          return;
        }
      }

      // 2. Dynamic Match for any of the 35 products
      const matchedProduct = getProductBySlug(path) || (hash ? getProductBySlug(hash) : null);
      if (matchedProduct) {
        setCurrentRoute({ name: 'product-detail', slug: matchedProduct.slug });
        return;
      }

      if (
        path.includes('/testimonials') || 
        path.includes('/testimonial') || 
        path === '/testimonials.htm' ||
        path === '/testimonial.htm' ||
        hash.includes('testimonial')
      ) {
        setCurrentRoute({ name: 'testimonials' });
      } else if (
        path.includes('/current-jobs') || 
        path === '/current-jobs.htm' ||
        path === '/current-job' ||
        path === '/jobs' ||
        hash.includes('current-job') ||
        hash.includes('jobs')
      ) {
        setCurrentRoute({ name: 'current-jobs' });
      } else if (
        path.includes('/sitemap') || 
        path === '/sitemap.htm' ||
        hash.includes('sitemap')
      ) {
        setCurrentRoute({ name: 'sitemap' });
      } else if (
        path.includes('/contact-us') || 
        path.includes('/contact') || 
        path === '/contact-us.htm' ||
        path === '/contact.htm' ||
        hash.includes('contact')
      ) {
        setCurrentRoute({ name: 'contact' });
      } else if (
        path.includes('/about-us') || 
        path.includes('/about') || 
        path === '/about-us.htm' ||
        hash.includes('about')
      ) {
        setCurrentRoute({ name: 'about' });
      } else if (
        path === '/blog' || 
        path === '/blog/' || 
        path === '/blog.htm' ||
        hash === '#/blog' ||
        hash === '#blog'
      ) {
        setCurrentRoute({ name: 'blog' });
      } else if (
        path.includes('/gallery') || 
        path === '/gallery.htm' ||
        hash.includes('gallery')
      ) {
        setCurrentRoute({ name: 'gallery' });
      } else if (
        path.includes('/wall-manufacturing-unit') || 
        path === '/wall-manufacturing-unit.htm' ||
        path === '/manufacturing-unit' ||
        hash.includes('manufacturing')
      ) {
        setCurrentRoute({ name: 'manufacturing-unit' });
      } else if (
        path.includes('/catalogues') || 
        path.includes('/catalogue') || 
        path.includes('/catalog') || 
        path === '/catalogues.htm' ||
        path === '/catalog.htm' ||
        hash.includes('catalog')
      ) {
        setCurrentRoute({ name: 'catalogues' });
      } else if (
        path.includes('/products') || 
        path.includes('/product') || 
        path === '/products.htm' ||
        path.includes('/compound-wall') ||
        path.includes('/boundary-wall') ||
        path.includes('/cement-wall') ||
        path.includes('/other-products') ||
        hash.includes('products')
      ) {
        setCurrentRoute({ name: 'products' });
      } else {
        setCurrentRoute({ name: 'home' });
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('app-navigate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('app-navigate', handleRouteChange);
    };
  }, []);

  if (currentRoute.name === 'rss-feed') {
    return <RssFeedPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header currentRoute={currentRoute.name} />
      <main className="flex-1">
        {currentRoute.name === 'product-detail' ? (
          <ProductDetailPage slug={currentRoute.slug} />
        ) : currentRoute.name === 'blog-detail' ? (
          <BlogDetailPage slug={currentRoute.slug} />
        ) : currentRoute.name === 'testimonials' ? (
          <TestimonialsPage />
        ) : currentRoute.name === 'current-jobs' ? (
          <CurrentJobsPage />
        ) : currentRoute.name === 'sitemap' ? (
          <SitemapPage />
        ) : currentRoute.name === 'contact' ? (
          <ContactUsPage />
        ) : currentRoute.name === 'about' ? (
          <About />
        ) : currentRoute.name === 'blog' ? (
          <BlogPage />
        ) : currentRoute.name === 'gallery' ? (
          <GalleryPage />
        ) : currentRoute.name === 'manufacturing-unit' ? (
          <ManufacturingUnitPage />
        ) : currentRoute.name === 'catalogues' ? (
          <CataloguesPage />
        ) : currentRoute.name === 'products' ? (
          <ProductsPage />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

