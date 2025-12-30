import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiPenTool, FiLayers, FiMonitor, FiCode, FiSmartphone, FiArrowRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import HeroSection from './HeroSection';

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 3;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  
  @media (min-width: 1024px) {
    padding: 0 4rem;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(to right, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #e2e8f0;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledButton = styled(Link)`
  display: inline-block;
  background: #4f46e5;
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3), 0 2px 4px -1px rgba(79, 70, 229, 0.2);
  border: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3), 0 4px 6px -2px rgba(79, 70, 229, 0.2);
  }
`;

const Section = styled.section`
  padding: 6rem 0;
  background: var(--color-bg-primary);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--color-text-primary);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: var(--color-card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(118, 75, 162, 0.3), 0 10px 10px -5px rgba(118, 75, 162, 0.2);
    border-color: var(--color-accent);
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
  font-size: 1.75rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
`;

const ServiceDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
`;

const TestimonialSection = styled(Section)`
  background: var(--color-bg-secondary);
`;

const TestimonialCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: var(--color-card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const QuoteIcon = styled.div`
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
`;

const TestimonialText = styled.p`
  font-size: 1.25rem;
  font-style: italic;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.7;
`;

const TestimonialAuthor = styled.p`
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
`;


const Card = styled(motion.div)`
  background: var(--color-card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(118, 75, 162, 0.3);
    border-color: var(--color-accent);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
  font-size: 1.5rem;
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
  color: var(--color-text-primary);
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(118, 75, 162, 0.4);
  }
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;


const gradientAnimation = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;


const Home = () => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    
    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const services = [
    {
      icon: <FiPenTool />,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience and drive engagement.'
    },
    {
      icon: <FiCode />,
      title: 'Web Development',
      description: 'Custom web applications built with the latest technologies for optimal performance.'
    },
    {
      icon: <FiSmartphone />,
      title: 'Mobile Design',
      description: 'Responsive mobile designs that work seamlessly across all devices and screen sizes.'
    },
    {
      icon: <FiLayers />,
      title: 'Brand Identity',
      description: 'Complete brand identity solutions including logos, style guides, and marketing materials.'
    }
  ];

  const testimonials = [
    {
      quote: "Working with Cyber Monk Studioz transformed our online presence. Their design expertise is unmatched.",
      author: "Sarah Johnson",
      role: "CEO, Creative Solutions"
    },
    {
      quote: "The team delivered beyond our expectations. Their attention to detail and creative approach is remarkable.",
      author: "Michael Chen",
      role: "Founder, TechStart"
    }
  ];

  return (
    <div className="home-page" ref={domRef}>
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Services Section */}
      <Section>
        <ContentWrapper>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <motion.span 
              variants={fadeInUp}
              style={{
                background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.1rem',
                fontWeight: 600,
                letterSpacing: '2px',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
                position: 'relative',
                padding: '0 1rem'
              }}
            >
              Our Services
            </motion.span>
            <SectionTitle variants={fadeInUp}>
              What We Offer
            </SectionTitle>
            <motion.p 
              variants={fadeInUp}
              style={{
                maxWidth: '700px',
                margin: '0 auto',
                color: 'var(--color-text-secondary)',
                fontSize: '1.1rem',
                lineHeight: '1.7'
              }}
            >
              We provide comprehensive digital solutions tailored to your business needs, 
              helping you stand out in the digital landscape.
            </motion.p>
          </motion.div>
          
          <motion.div 
            style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              marginTop: '3rem'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <Card 
                key={index} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <IconWrapper>
                  {service.icon}
                </IconWrapper>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  color: 'var(--color-text-primary)',
                  fontWeight: 600
                }}>
                  {service.title}
                </h3>
                <p style={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  flexGrow: 1
                }}>
                  {service.description}
                </p>
                <Link to="/services" style={{
                  color: 'var(--color-accent)',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  marginTop: 'auto',
                  alignSelf: 'flex-start',
                  position: 'relative',
                }}>
                  Learn more <FiArrowRight style={{ marginLeft: '0.5rem', transition: 'transform 0.3s ease' }} />
                </Link>
              </Card>
            ))}
          </motion.div>
        </ContentWrapper>
      </Section>
      <Section>
        <ContentWrapper>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <h1 className="title">
              <span>Welcome to Cyber Monk Studioz</span>
            </h1>
            <motion.p 
              className="subtitle" 
              style={{
                fontSize: '1.1rem',
                maxWidth: '600px',
                opacity: 0.9,
                lineHeight: 1.8,
                margin: 'var(--spacing-md) 0 var(--spacing-xl)',
                fontFamily: 'var(--font-secondary)',
                fontWeight: 500,
                color: '#1a1a1a',
              }}
              variants={fadeInUp}
            >
              End-to-end creative and digital solutions crafted to elevate your brand.
              <br />
              <span style={{ fontStyle: 'italic', color: '#4a5568' }}>Crafting digital experiences that inspire and engage.</span>
            </motion.p>
            <motion.div 
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}
              variants={fadeInUp}
            >
              <Link to="/booking" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '0.8rem 2rem',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#1a1a1a',
                    backgroundColor: '#ffffff',
                    border: '2px solid #1a1a1a',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Book Now
                </motion.button>
              </Link>
              <Link to="/portfolio" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '0.8rem 2rem',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#ffffff',
                    background: 'linear-gradient(90deg, #1b1b1bff, #b6b4baff)',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  View Our Work
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </ContentWrapper>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <ContentWrapper>
          <motion.div
            variants={fadeInUp}
            style={{
              marginTop: 'var(--spacing-xxl)',
              paddingTop: 'var(--spacing-lg)',
              borderTop: '1px solid #e2e8f0',
            }}
          >
            <p style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              marginBottom: 'var(--spacing-md)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500
            }}>Client's Forum</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginTop: 'var(--spacing-lg)'
            }}>
              {[
                {
                  quote: "Cyber Monk Studioz transformed our online presence completely. Their attention to detail and creative approach is unmatched.",
                  author: "Sarah Johnson",
                  role: "CEO, TechStart Inc."
                },
                {
                  quote: "Working with Cyber Monk was a game-changer for our business. They delivered beyond our expectations.",
                  author: "Michael Chen",
                  role: "Marketing Director, GrowthLabs"
                },
                {
                  quote: "Professional, creative, and reliable. Highly recommend their services to anyone looking for top-notch digital solutions.",
                  author: "Emma Davis",
                  role: "Founder, CreativeMinds"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <FaQuoteLeft style={{
                    color: '#e2e8f0',
                    fontSize: '2rem',
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    opacity: 0.5
                  }} />
                  <p style={{
                    fontStyle: 'italic',
                    marginBottom: '1rem',
                    color: '#4a5568',
                    lineHeight: 1.6
                  }}>
                    {testimonial.quote}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '1rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#e2e8f0',
                      marginRight: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#718096',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}>
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p style={{
                        margin: 0,
                        fontWeight: 600,
                        color: '#2d3748'
                      }}>
                        {testimonial.author}
                      </p>
                      <p style={{
                        margin: '0.25rem 0 0',
                        fontSize: '0.85rem',
                        color: '#718096'
                      }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ContentWrapper>
      </Section>

      {/* Animated Divider */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          position: 'relative',
          width: '100%',
          height: '300px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem 0',
          padding: '2rem 0'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            background: 'linear-gradient(45deg, #f3f4f6 25%, #ffffff 50%, #f3f4f6 75%)',
            backgroundSize: '400% 400%',
            animation: 'gradientBG 8s ease infinite',
            opacity: 0.5
          }} 
        />
      </motion.div>

      {/* Final CTA Section */}
      <Section>
        <ContentWrapper>
          <motion.div
            variants={fadeInUp}
            style={{
              position: 'relative',
              padding: '100px 0',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '4rem'
            }}
          >
            <div className="container">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  color: 'var(--color-black)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Crafting Digital Experiences
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  color: 'var(--color-black)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                Transforming ideas into stunning visual realities through innovative design and technology.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ marginTop: '2.5rem' }}
              >
                <Link to="/contact">
                  <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '1rem 2.5rem',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '50px',
                      background: 'linear-gradient(90deg, #1b1b1b, #b6b4ba)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Get In Touch
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </ContentWrapper>
      </Section>
    </div>
  );
};

export default Home;
