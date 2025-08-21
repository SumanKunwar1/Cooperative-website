import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  PiggyBank, 
  CreditCard, 
  Building2, 
  Smartphone,
  Shield,
  Calculator,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/common/SEO';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockServices } from '../data/mockData';

const Services: React.FC = () => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    PiggyBank,
    CreditCard,
    Building2,
    Smartphone
  };

  const additionalServices = [
    {
      title: 'Insurance Services',
      description: 'Comprehensive insurance coverage for life, health, and property',
      icon: Shield,
      features: ['Life Insurance', 'Health Insurance', 'Property Insurance', 'Business Insurance']
    },
    {
      title: 'Investment Planning',
      description: 'Expert guidance for your investment and wealth management needs',
      icon: Calculator,
      features: ['Portfolio Management', 'Mutual Funds', 'Fixed Deposits', 'Investment Advisory']
    },
    {
      title: 'Group Banking',
      description: 'Specialized services for societies, clubs, and organizations',
      icon: Users,
      features: ['Group Savings', 'Bulk Transactions', 'Committee Accounts', 'Event Financing']
    },
    {
      title: 'Financial Literacy',
      description: 'Educational programs to improve financial knowledge and skills',
      icon: TrendingUp,
      features: ['Workshops', 'Seminars', 'Online Courses', 'Personal Consultations']
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Our Services - Constellation Saving and Credit Cooperative Ltd."
        description="Explore our comprehensive financial services including savings accounts, loans, digital banking, insurance, and investment planning for individuals and businesses."
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Comprehensive financial solutions designed to meet all your banking and business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Banking Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential financial services to help you manage your money and achieve your goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockServices.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="flex items-start mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mr-6">
                        {IconComponent && <IconComponent className="w-8 h-8 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {service.eligibility && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Eligibility:</h4>
                        <ul className="space-y-2">
                          {service.eligibility.map((requirement) => (
                            <li key={requirement} className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                              <span className="text-gray-700">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button fullWidth icon={ArrowRight} iconPosition="right">
                      Apply Now
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Extended services to support your complete financial journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                  <ul className="text-left space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Services Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Digital Banking at Your Fingertips
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Experience modern banking with our comprehensive digital platform. Manage your accounts, 
                transfer funds, pay bills, and access all our services from anywhere, anytime.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  '24/7 account access and monitoring',
                  'Instant fund transfers and payments',
                  'Mobile banking app with biometric security',
                  'Digital loan applications and approvals',
                  'Online investment and insurance services'
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Download Mobile App
                </Button>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    Access Online Banking
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                <div className="mb-6">
                  <Smartphone className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Mobile Banking Features</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="font-semibold">Account Balance</div>
                    <div className="text-blue-100">Real-time updates</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="font-semibold">Fund Transfer</div>
                    <div className="text-blue-100">Instant transfers</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="font-semibold">Bill Payment</div>
                    <div className="text-blue-100">All utilities</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="font-semibold">Loan Tracker</div>
                    <div className="text-blue-100">EMI schedules</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Our Services?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied members who trust Constellation for their financial needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Open Account Today
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;