import Breadcrumbs from '@/components/Breadcrumbs';
import { Image } from 'antd';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const Statistics = [
    { value: '10.5K', label: 'Sellers active on our site' },
    { value: '$36K', label: 'Monthly product sales' },
    { value: '45.5K', label: 'Customers active on our site' },
    { value: '25K', label: 'Annual gross sales on our site' },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Hook for triggering animations when in view
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumbs />
      </motion.div>

      {/* Our Story Section */}
      <motion.section
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="flex flex-col md:flex-row items-center my-12"
      >
        {/* Text Content */}
        <motion.div variants={fadeIn} className="md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">OUR STORY</h1>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2005, we started with an active presence on Bangladeshi soil. Supported by a wide range of talented and
            creative individuals, we have been able to reach out to customers in the region.
            We offer more than 1M+ products and services solutions. Our products have been sold to more than 150 countries worldwide.
            We are exclusive and offer a diverse assortment in categories.
          </p>
        </motion.div>
        {/* Image */}
        <motion.div variants={fadeIn} className="md:w-1/2">
          <Image
            src="https://th.bing.com/th/id/R.e75fc4cbe3cc2d6662fd3a9dc0a82419?rik=HRKN%2f1J5MdiY5w&riu=http%3a%2f%2fwww.yaguara.co%2fwp-content%2fuploads%2f2022%2f10%2fHow-To-Start-A-Bookstore-Online-Yaguara.png&ehk=v3Euq%2bvCJW063fjSHP6CnZfYlaByayOZujBCAmjgxDs%3d&risl=&pid=ImgRaw&r=0"
            alt="Two people shopping"
            className="w-full h-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </motion.section>

      <motion.section
        ref={teamRef}
        initial="hidden"
        animate={teamInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center my-12"
      >
        <motion.div variants={fadeIn} className="hover:shadow-lg transition-shadow duration-300">
          <Image
            src="/images/tom-cruise.jpg" // Replace with the correct image path or URL for Tom Cruise
            alt="Tom Cruise"
            className="w-32 h-32 mx-auto rounded-full mb-4 transform hover:scale-110 transition-transform duration-300"
          />
          <h4 className="text-xl font-semibold">Tom Cruise</h4>
          <p className="text-gray-500">Founder & Chairman</p>
          <div className="flex justify-center gap-2 mt-2">
            <a href="#">
              <Image
                src="/linkedin-icon.png"
                alt="LinkedIn"
                className="w-6 h-6 hover:opacity-80 transition-opacity duration-200"
              />
            </a>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="hover:shadow-lg transition-shadow duration-300">
          <Image
            src="/images/emma-watson.jpg" // Replace with the correct image path or URL for Emma Watson
            alt="Emma Watson"
            className="w-32 h-32 mx-auto rounded-full mb-4 transform hover:scale-110 transition-transform duration-300"
          />
          <h4 className="text-xl font-semibold">Emma Watson</h4>
          <p className="text-gray-500">Managing Director</p>
          <div className="flex justify-center gap-2 mt-2">
            <a href="#">
              <Image
                src="/linkedin-icon.png"
                alt="LinkedIn"
                className="w-6 h-6 hover:opacity-80 transition-opacity duration-200"
              />
            </a>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="hover:shadow-lg transition-shadow duration-300">
          <Image
            src="/images/will-smith.jpg" // Replace with the correct image path or URL for Will Smith
            alt="Will Smith"
            className="w-32 h-32 mx-auto rounded-full mb-4 transform hover:scale-110 transition-transform duration-300"
          />
          <h4 className="text-xl font-semibold">Will Smith</h4>
          <p className="text-gray-500">Product Designer</p>
          <div className="flex justify-center gap-2 mt-2">
            <a href="#">
              <Image
                src="/linkedin-icon.png"
                alt="LinkedIn"
                className="w-6 h-6 hover:opacity-80 transition-opacity duration-200"
              />
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center my-12"
      >
        <motion.div variants={fadeIn} className="flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
          <Image
            src="/delivery-icon.png"
            alt="Free Delivery"
            className="w-12 h-12 mb-2 transform hover:scale-110 transition-transform duration-300"
          />
          <h4 className="text-lg font-semibold">FREE FAST DELIVERY</h4>
          <p className="text-gray-500">Free delivery on all orders ($140)</p>
        </motion.div>
        <motion.div variants={fadeIn} className="flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
          <Image
            src="/support-icon.png"
            alt="Customer Service"
            className="w-12 h-12 mb-2 transform hover:scale-110 transition-transform duration-300"
          />
          <h4 className="text-lg font-semibold">24/7 CUSTOMER SERVICE</h4>
          <p className="text-gray-500">Friendly 24/7 customer support</p>
        </motion.div>
        <motion.div variants={fadeIn} className="flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
          <Image
            src="/money-back-icon.png"
            alt="Money Back"
            className="w-12 h-12 mb-2 transform hover:scale-110 transition-transform duration-300"
          />
          <h4 className="text-lg font-semibold">MONEY BACK GUARANTEE</h4>
          <p className="text-gray-500">We return money within 30 days</p>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;