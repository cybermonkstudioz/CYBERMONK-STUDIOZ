import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaQuoteLeft } from 'react-icons/fa';

// Styled Components
// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  color: #1a1a1a;
  padding: 6rem 0;
  z-index: 1;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.05) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 20%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 255, 0.95) 100%);
    z-index: 1;
    animation: ${float} 15s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(0deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 2;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }

  .floating-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.4;
    animation: float 12s ease-in-out infinite;
    z-index: 0;
  }

  .floating-orb.one {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #4f46e5, #8b5cf6);
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .floating-orb.two {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #9333ea, #c084fc);
    bottom: 10%;
    right: 10%;
    animation-delay: 2s;
    animation-duration: 15s;
  }

  .floating-orb.three {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #7c3aed, #a78bfa);
    top: 60%;
    left: 30%;
    animation-delay: 4s;
    animation-duration: 18s;
  }
`;

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
  background: #ffffff;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1a1a1a;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #8b5cf6);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;


const TestimonialSection = styled(Section)`
  background: #f8fafc;
`;

const TestimonialCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #ffffff;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const QuoteIcon = styled.div`
  font-size: 2.5rem;
  color: #4f46e5;
  margin-bottom: 1.5rem;
`;

const TestimonialText = styled.p`
  font-size: 1.25rem;
  font-style: italic;
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.7;
`;

const TestimonialAuthor = styled.p`
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const TestimonialRole = styled.p`
  color: #6b7280;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const gradientAnimation = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const AnimatedShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  opacity: 0.6;
  filter: blur(60px);
  z-index: 0;
  animation: ${float} 15s ease-in-out infinite;
  
  &:nth-child(1) {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    width: 200px;
    height: 200px;
    bottom: 20%;
    right: 15%;
    animation-delay: 3s;
    background: linear-gradient(45deg, #ec4899, #f43f5e);
  }
  
  &:nth-child(3) {
    width: 150px;
    height: 150px;
    top: 50%;
    right: 20%;
    animation-delay: 6s;
    background: linear-gradient(45deg, #10b981, #06b6d4);
  }
`;

const Home = () => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
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

  const testimonials = [
    {
      quote: "Working with Cyber Monk Studioz transformed our online presence. Their design expertise is unmatched.",
      author: "Ganesh Kumar"
    },
    {
      quote: "The team delivered beyond our expectations. Their attention to detail and creative approach is remarkable.",
      author: "Ravikumar"
    },
    {
      quote: "Highly professional, extremely creative, and always on time,The video production quality was outstanding and captured our brand's essence perfectly.",
      author: "Rajesh"
    }
  ];

  return (
    <div>
      <HeroSection>
        <AnimatedShape />
        <AnimatedShape />
        <AnimatedShape />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Hero content will go here */}
          </motion.div>
        </div>
      </HeroSection>
      <TestimonialSection>
        <ContentWrapper>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <SectionTitle variants={fadeInUp}>Client's Forum</SectionTitle>
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard>
                <QuoteIcon>
                  <FaQuoteLeft />
                </QuoteIcon>
                <TestimonialText>{testimonials[currentTestimonial].quote}</TestimonialText>
                <TestimonialAuthor>{testimonials[currentTestimonial].author}</TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
          </motion.div>
        </ContentWrapper>
      </TestimonialSection>
    </div>
  );
};

export default Home;