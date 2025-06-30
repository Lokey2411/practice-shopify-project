import Breadcrumbs from '@/components/Breadcrumbs';
import { Image, Button } from 'antd';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

// Define interfaces for TypeScript
interface Statistic {
  value: string;
  label: string;
  icon?: string;
}

interface TeamMember {
  name: string;
  role: string;
  img: string;
  bio: string;
}

interface Service {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

const About = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const Statistics: Statistic[] = [
    { value: '10.5K+', label: 'Active Sellers' },
    { value: '$36M+', label: 'Monthly Sales' },
    { value: '45.5K+', label: 'Active Customers' },
    { value: '25M+', label: 'Annual Gross Sales' },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: 'Tom Cruise',
      role: 'Founder & Chairman',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf0d804?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      bio: 'Visionary leader with 20+ years of experience in e-commerce and digital transformation.'
    },
    {
      name: 'Emma Watson',
      role: 'Managing Director',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      bio: 'Strategic thinker driving operational excellence and customer satisfaction.'
    },
    {
      name: 'Will Smith',
      role: 'Product Designer',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      bio: 'Creative innovator crafting exceptional user experiences and product solutions.'
    },
  ];

  const services: Service[] = [
    {
      icon: '🚚',
      title: 'Free Fast Delivery',
      desc: 'Free delivery on all orders over $140 with same-day processing',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🛡️',
      title: '24/7 Customer Service',
      desc: 'Friendly support available around the clock via chat, phone, and email',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💯',
      title: 'Money Back Guarantee',
      desc: 'Full refund within 30 days with no questions asked',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  // Enhanced animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
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
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Preload images
  useEffect(() => {
    const images = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf0d804?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    ];

    const loadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    };

    Promise.all(images.map(loadImage)).then(() => {
      setTimeout(() => setIsLoading(false), 500);
    });
  }, []);

  // Enhanced Skeleton UI Component
  const Skeleton = ({ className }: { className: string }) => (
    <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${className}`} />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={fadeIn} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8">
              Building the future of e-commerce, one customer at a time
            </p>
            <Button
              size="large"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              href="#story"
            >
              Discover Our Story
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Breadcrumbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container mx-auto px-4 py-6"
      >
        <Breadcrumbs />
      </motion.div>

      {/* Our Story Section */}
      <motion.section
        id="story"
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <motion.div variants={fadeIn} className="lg:flex lg:items-center lg:gap-8">
            <div className="lg:w-1/2 mb-6 lg:mb-0 p-12">
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                Building Dreams Since 2005
              </h2>
              {isLoading ? (
                <Skeleton className="h-32 w-full rounded-lg" />
              ) : (
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    Founded in 2005 in Bangladesh, we've grown from a small local shop to a global e-commerce powerhouse,
                    serving customers across 150+ countries with over 1M+ products.
                  </p>
                  <p>
                    Our mission is to provide exceptional shopping experiences through innovative technology,
                    quality products, and unwavering customer support.
                  </p>
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Trusted by 45K+ customers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">18 years of excellence</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <motion.div variants={fadeIn} className="lg:w-1/2 flex justify-center p-12">
              {isLoading ? (
                <Skeleton className="w-full h-96 rounded-2xl" />
              ) : (
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                    alt="Our journey from 2005 to present"
                    className="w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-700"
                    preview={false}
                    loading="lazy"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">18+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Years of Excellence</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl p-12">
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Numbers That Matter
            </h2>
            <p className="text-xl text-blue-100">
              Our impact in numbers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Statistics.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center group"
              >
                {isLoading ? (
                  <Skeleton className="h-32 w-full rounded-2xl" />
                ) : (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                    <p className="text-blue-100 font-medium">{stat.label}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        initial="hidden"
        animate={teamInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <motion.div variants={fadeIn} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm font-semibold mb-4">
            Meet Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent">
            The Minds Behind Our Success
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our leadership team brings together decades of experience in e-commerce, technology, and customer service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { name: 'Tom Cruise', role: 'Founder & Chairman', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf0d804?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
            { name: 'Emma Watson', role: 'Managing Director', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
            { name: 'Will Smith', role: 'Product Designer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' },
          ].map((member, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="group"
            >
              {isLoading ? (
                <Skeleton className="h-96 w-full rounded-2xl" />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.img}
                      alt={`${member.name}, ${member.role}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      preview={false}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{member.name}</h4>
                    <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Visionary leader with 20+ years of experience in e-commerce and digital transformation.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <motion.div variants={fadeIn} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We go above and beyond to ensure your shopping experience is nothing short of exceptional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: '🚚',
              title: 'Free Fast Delivery',
              desc: 'Free delivery on all orders over $140 with same-day processing',
            },
            {
              icon: '🛡️',
              title: '24/7 Customer Service',
              desc: 'Friendly support available around the clock via chat, phone, and email',
            },
            {
              icon: '💯',
              title: 'Money Back Guarantee',
              desc: 'Full refund within 30 days with no questions asked',
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="group"
            >
              {isLoading ? (
                <Skeleton className="h-80 w-full rounded-2xl" />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{service.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.desc}</p>
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Available 24/7
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <motion.div variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their shopping needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                type="primary"
                size="large"
                className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                href="/products"
              >
                Explore Our Products
              </Button>
              <Button
                size="large"
                className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold rounded-full px-8 py-4 text-lg transition-all duration-300"
                href="/contact"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;