import Breadcrumbs from '@/components/Breadcrumbs';
import { Image } from 'antd';
const About = () => {
  const Statistics = [
    { value: '10.5K', label: 'Sellers active on our site' },
    { value: '$36K', label: 'Monthly product sales' },
    { value: '45.5K', label: 'Customers active on our site' },
    { value: '25K', label: 'Annual gross sales on our site' },
  ];


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Our Story Section */}
      <section className="flex flex-col md:flex-row items-center my-12">
        {/* Text Content */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">OUR STORY</h1>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2005, we started with an active presence on Bangladeshi soil. Supported by a wide range of talented and
            creative individuals, we have been able to reach out to customers in the region.
            We offer more than 1M+ products and services solutions. Our products have been sold to more than 150 countries worldwide.
            We are exclusive and offer a diverse assortment in categories.
          </p>
        </div>
        {/* Image */}
        <div className="md:w-1/2">
          <Image
            src="https://th.bing.com/th/id/R.e75fc4cbe3cc2d6662fd3a9dc0a82419?rik=HRKN%2f1J5MdiY5w&riu=http%3a%2f%2fwww.yaguara.co%2fwp-content%2fuploads%2f2022%2f10%2fHow-To-Start-A-Bookstore-Online-Yaguara.png&ehk=v3Euq%2bvCJW063fjSHP6CnZfYlaByayOZujBCAmjgxDs%3d&risl=&pid=ImgRaw&r=0" alt="Two people shopping"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center my-12">
        {Statistics.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-blue-600">{stat.value}</h2>
            <p className="text-gray-500 mt-2">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="grid grid-cols-3 md:grid-cols-3 gap-6 text-center my-12">

        <div>
          <Image
            src="https://tse1.mm.bing.net/th/id/OIP.a_C9v1H7RBbVyFjU4udThgHaKX?cb=iwc2&rs=1&pid=ImgDetMain"
            alt="Tom Cruise"
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h4 className="text-xl font-semibold">Tom Cruise</h4>
          <p className="text-gray-500">Founder & Chairman</p>
          <div className="flex justify-center gap-2 mt-2">
            <a href="#"><Image src="/linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" /></a>

          </div>
        </div>

        <div>
          <Image
            src="https://tse1.mm.bing.net/th/id/OIP.4vQhkx6x96D1AHAcIp3R8QAAAA?cb=iwc2&w=250&h=307&rs=1&pid=ImgDetMain"
            alt="Emma Watson"
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h4 className="text-xl font-semibold">Emma Watson</h4>
          <p className="text-gray-500">Managing Director</p>
          <div className="flex justify-center gap-2 mt-2">
            <a href="#"><Image src="/linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" /></a>
          </div>
        </div>
        {/* Team Member 3 */}
        <div>
          <Image
            src="https://tse1.mm.bing.net/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?cb=iwc2&rs=1&pid=ImgDetMain"
            alt="Will Smith"
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h4 className="text-xl font-semibold">Will Smith</h4>
          <p className="text-gray-500">Product Designer</p>
          <div className="flex justify-center gap-2 mt-2">
            <a href="#"><Image src="/linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" /></a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center my-12">
        <div className="flex flex-col items-center">
          <Image src="/delivery-icon.png" alt="Free Delivery" className="w  mb-2" />
          <h4 className="text-lg font-semibold">FREE FAST DELIVERY</h4>
          <p className="text-gray-500">Free delivery on all orders ($140)</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/support-icon.png" alt="Customer Service" className=" mb-2" />
          <h4 className="text-lg font-semibold">24/7 CUSTOMER SERVICE</h4>
          <p className="text-gray-500">Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/money-back-icon.png" alt="Money Back" className=" mb-2" />
          <h4 className="text-lg font-semibold">MONEY BACK GUARANTEE</h4>
          <p className="text-gray-500">We return money within 30 days</p>
        </div>
      </section>
    </div>
  );
};

export default About;