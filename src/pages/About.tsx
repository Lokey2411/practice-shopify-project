
import Breadcrumbs from '@/components/Breadcrumbs';
import { Image, Button } from 'antd';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

// Define interfaces for TypeScript
interface Statistic {
  value: string;
  label: string;
}

interface TeamMember {
  name: string;
  role: string;
  img: string;
}

interface Service {
  icon: string;
  title: string;
  desc: string;
}

const About = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const Statistics: Statistic[] = [
    { value: '10.5K', label: 'Active Sellers' },
    { value: '$36K', label: 'Monthly Sales' },
    { value: '45.5K', label: 'Active Customers' },
    { value: '25K', label: 'Annual Gross Sales' },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Intersection Observer for animations
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Preload images and simulate loading
  useEffect(() => {
    const images = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Story
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Team Meeting
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Services
      'https://images.unsplash.com/photo-1506794778202-cad84cf0d804?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Tom Cruise
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Emma Watson
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Will Smith
      'https://images.unsplash.com/photo-1600585154526-990d71c4e0f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Delivery
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Support
      'https://images.unsplash.com/photo-1600585154526-990d71c4e0f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Money-back
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // LinkedIn
    ];
    let loadedImages = 0;
    const loadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Handle errors to prevent hanging
      });
    };
    Promise.all(images.map(loadImage)).then(() => {
      setIsLoading(false);
    });
  }, []);

  // Skeleton UI Component
  const Skeleton = ({ className }: { className: string }) => (
    <div className={`animate - pulse bg - gray - 200 dark: bg - gray - 700 ${className} `} />
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* SEO Metadata */}
      <header>
        <title>About Us - Your Company Name</title>
        <meta
          name="description"
          content="Learn about our story, team, and services. Discover how we provide top-notch products and customer support since 2005."
        />
        <meta name="keywords" content="about us, company story, team, services, e-commerce" />
      </header>

      {/* Breadcrumbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-8 py-4 mb-6 text-sm text-gray-500 dark:text-gray-400 flex justify-center"
        aria-label="Breadcrumb navigation"
      >
        <Breadcrumbs />
      </motion.div>

      {/* Our Story Section */}
      <motion.section
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-12"
        aria-labelledby="story-heading"
      >
        <motion.div variants={fadeIn} className="lg:flex lg:items-center lg:gap-8">
          <div className="lg:w-1/2 mb-6 lg:mb-0">
            <h1 id="story-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              Our Story
            </h1>
            {isLoading ? (
              <Skeleton className="h-32 w-full rounded-lg" />
            ) : (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                Founded in 2005 in Bangladesh, we’ve grown with the support of talented individuals to serve customers globally.
                Offering over 1M+ products across 150+ countries, our diverse catalog spans multiple categories, ensuring quality
                and exclusivity for every shopper.
              </p>
            )}
          </div>
          <motion.div variants={fadeIn} className="lg:w-1/2 flex justify-center">
            {isLoading ? (
              <Skeleton className="w-full h-64 rounded-lg max-w-md" />
            ) : (
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Customers shopping in a bookstore"
                className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 max-w-md"
                preview={false}
                loading="lazy"
              />
            )}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-12"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">
          Company Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Statistics.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {isLoading ? (
                <Skeleton className="h-12 w-24 mx-auto rounded-lg" />
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</h3>
                  <p className="text-gray-500 dark:text-gray-300 mt-2">{stat.label}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        initial="hidden"
        animate={teamInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-12"
        aria-labelledby="team-heading"
      >
        <h2 id="team-heading" className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { name: 'Tom Cruise', role: 'Founder & Chairman', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf0d804?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
            { name: 'Emma Watson', role: 'Managing Director', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
            { name: 'Will Smith', role: 'Product Designer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
          ].map((member, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 max-w-xs mx-auto"
            >
              {isLoading ? (
                <Skeleton className="w-32 h-32 mx-auto rounded-full mb-4" />
              ) : (
                <Image
                  src={member.img}
                  alt={`${member.name}, ${member.role} `}
                  className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                  preview={false}
                  loading="lazy"
                />
              )}
              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-gray-500 dark:text-gray-300">{member.role}</p>
              <div className="flex justify-center gap-3 mt-4">
                <a href="#" aria-label={`LinkedIn profile of ${member.name} `}>
                  {isLoading ? (
                    <Skeleton className="w-6 h-6 rounded-full" />
                  ) : (
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                      alt=""
                      className="w-6 h-6 hover:opacity-80 transition-opacity duration-200"
                      preview={false}
                    />
                  )}
                </a>
              </div>
            </motion.div>
          ))}
          {isLoading ? null : (
            <motion.div
              variants={fadeIn}
              className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 col-span-full lg:col-span-3 flex justify-center"
            >
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Team meeting collaboration"
                className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300 max-w-2xl"
                preview={false}
                loading="lazy"
              />
              <p className="text-gray-500 dark:text-gray-300">Our team collaborating on new projects.</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="container mx-auto px-4 py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-12"
        aria-labelledby="services-heading"
      >
        <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: 'https://images.unsplash.com/photo-1600585154526-990d71c4e0f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
              title: 'Free Fast Delivery',
              desc: 'Free delivery on all orders over $140',
            },
            {
              icon: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
              title: '24/7 Customer Service',
              desc: 'Friendly support available around the clock',
            },
            {
              icon: 'https://images.unsplash.com/photo-1600585154526-990d71c4e0f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
              title: 'Money Back Guarantee',
              desc: 'Full refund within 30 days',
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 flex flex-col items-center"
            >
              {isLoading ? (
                <Skeleton className="w-12 h-12 mx-auto mb-4 rounded-full" />
              ) : (
                <Image
                  src={service.icon}
                  alt={`${service.title} icon`}
                  className="w-12 h-12 mx-auto mb-4 hover:scale-110 transition-transform duration-300"
                  preview={false}
                  loading="lazy"
                />
              )}
              <h4 className="text-lg font-semibold">{service.title}</h4>
              <p className="text-gray-500 dark:text-gray-300 mt-2">{service.desc}</p>
            </motion.div>
          ))}
          {isLoading ? null : (
            <motion.div
              variants={fadeIn}
              className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 col-span-full lg:col-span-4 flex justify-center"
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Customer support team"
                className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300 max-w-2xl"
                preview={false}
                loading="lazy"
              />
              <p className="text-gray-500 dark:text-gray-300">Dedicated support for our customers.</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto px-4 py-12 text-center bg-white dark:bg-gray-800 rounded-lg shadow-md"
        aria-labelledby="cta-heading"
      >
        <h2 id="cta-heading" className="sr-only">
          Call to Action
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3"
            href="/products"
          >
            Explore Our Products
          </Button>
          <Button
            size="large"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-600 font-semibold rounded-lg px-6 py-3"
            href="/contact"
          >
            Contact Us
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default About;