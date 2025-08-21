import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, TrendingUp, Building, Calendar, Globe } from 'lucide-react';
import SEO from '../components/common/SEO';
import Card from '../components/ui/Card';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our operations.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Our members and community are at the heart of everything we do.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We embrace modern technology to provide better services to our members.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in service delivery and member satisfaction.'
    }
  ];

  const milestones = [
    { year: '2019', event: 'Constellation Saving and Credit Cooperative Ltd. established', icon: Building },
    { year: '2020', event: 'Digital banking platform launched', icon: Globe },
    { year: '2021', event: 'Business directory service introduced', icon: Users },
    { year: '2022', event: 'E-commerce platform for members launched', icon: TrendingUp },
    { year: '2023', event: 'Reached 1000+ active members milestone', icon: Award },
    { year: '2024', event: 'Online ticketing and event management system', icon: Calendar }
  ];

  const leadership = [
    {
      name: 'Mr. Rajesh Sharma',
      position: 'Chairman',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Over 15 years of experience in cooperative banking and community development.'
    },
    {
      name: 'Ms. Sunita Thapa',
      position: 'Managing Director',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Financial expert with extensive background in credit management and digital banking.'
    },
    {
      name: 'Mr. Bikash Pradhan',
      position: 'General Manager',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Technology leader driving digital transformation in cooperative banking.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="About Us - Constellation Saving and Credit Cooperative Ltd."
        description="Learn about our mission, vision, leadership team, and history of serving the Kathmandu community through cooperative banking services."
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Constellation</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Empowering communities through cooperative principles and innovative financial solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Constellation Saving and Credit Cooperative Ltd. was founded in 2019 with a vision to create 
                a financial institution that truly serves its community. Based in Kathmandu, Nepal, we have 
                grown from a small cooperative to a comprehensive financial services provider.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our unique approach combines traditional cooperative values with modern technology, offering 
                our members not just banking services, but a complete ecosystem that includes business 
                directory, e-commerce platform, and event management services.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we proudly serve over 1,000 active members and maintain partnerships with more than 
                200 local businesses, making us a cornerstone of the Kathmandu business community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <Card className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                  <div className="text-gray-600">Active Members</div>
                </Card>
                <Card className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                  <div className="text-gray-600">Partner Businesses</div>
                </Card>
              </div>
              <div className="space-y-6 mt-8">
                <Card className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                  <div className="text-gray-600">Years of Service</div>
                </Card>
                <Card className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">NPR 50M+</div>
                  <div className="text-gray-600">Loans Disbursed</div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide accessible, innovative, and member-focused financial services that promote 
                  economic growth, support local businesses, and strengthen our community through 
                  cooperative principles and digital excellence.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be Nepal's leading cooperative financial institution, recognized for innovation, 
                  community impact, and sustainable growth, while setting the standard for modern 
                  cooperative banking in the digital age.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h3>
            <p className="text-xl text-gray-600">Meet the experienced professionals leading Constellation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{leader.name}</h4>
                  <p className="text-blue-600 font-medium mb-4">{leader.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h3>
            <p className="text-xl text-gray-600">Key milestones in our cooperative's growth</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-blue-200 h-full"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <Card>
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ${
                        index % 2 === 0 ? 'ml-auto' : ''
                      }`}>
                        <milestone.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      {index % 2 === 0 && <span className="text-2xl font-bold text-blue-600 mr-4">{milestone.year}</span>}
                      {index % 2 !== 0 && <span className="text-2xl font-bold text-blue-600 ml-4">{milestone.year}</span>}
                    </div>
                    <p className="text-gray-700">{milestone.event}</p>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;