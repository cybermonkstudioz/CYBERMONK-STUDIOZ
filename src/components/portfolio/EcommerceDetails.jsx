import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProjectDetailsContainer = styled.div`
  padding: 6rem 0 4rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  min-height: 100vh;
  color: #ffffff;
  
  @media (max-width: 768px) {
    min-height: auto;
    height: auto;
    padding: 4rem 0 2rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ProjectHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const ProjectTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProjectSubtitle = styled.p`
  font-size: 1.25rem;
  color: #a0a0a0;
  margin-bottom: 2rem;
`;

const ProjectImage = styled.img`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 3rem;
  display: block;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(118, 75, 162, 0.3);
`;

const ProjectContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProjectSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const SectionText = styled.p`
  line-height: 1.7;
  color: #a0a0a0;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: rgba(79, 70, 229, 0.2);
  color: #8b5cf6;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(139, 92, 246, 0.3);
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: #8b5cf6;
  padding: 0.75rem 1.5rem;
  border: 2px solid #8b5cf6;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    background: #8b5cf6;
    color: #ffffff;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 0.75rem;
    color: #a0a0a0;
  }
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const EcommerceDetails = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <ProjectDetailsContainer>
        <Container>
          <BackButton to="/portfolio">
            ← Back to Portfolio
          </BackButton>
          
          <ProjectHeader>
            <ProjectTitle>E-commerce Platform</ProjectTitle>
            <ProjectSubtitle>A full-featured e-commerce solution with modern UI/UX</ProjectSubtitle>
          </ProjectHeader>
          
          <ProjectImage 
            src="https://assets.justinmind.com/wp-content/uploads/2019/08/best-ecommerce-websites-furniture-webshop.png" 
            alt="E-commerce Platform Project"
          />
          
          <ProjectContent>
            <ProjectSection>
              <SectionTitle>Project Overview</SectionTitle>
              <SectionText>
                A comprehensive e-commerce platform designed to provide seamless online shopping experiences. 
                This solution combines powerful backend functionality with an intuitive frontend to drive sales and customer satisfaction.
              </SectionText>
              <SectionText>
                The platform features advanced product management, secure payment processing, and real-time inventory tracking 
                to ensure smooth operations for both customers and administrators.
              </SectionText>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Technical Stack</SectionTitle>
              <SectionText>
                Built with cutting-edge technologies to ensure scalability, security, and exceptional performance.
              </SectionText>
              <TechStack>
                <TechTag>React</TechTag>
                <TechTag>Node.js</TechTag>
                <TechTag>MongoDB</TechTag>
                <TechTag>Stripe API</TechTag>
                <TechTag>Redis</TechTag>
                <TechTag>AWS</TechTag>
              </TechStack>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Key Features</SectionTitle>
              <FeatureList>
                <li>✓ Responsive design for all devices</li>
                <li>✓ Advanced product search and filtering</li>
                <li>✓ Secure payment gateway integration</li>
                <li>✓ Real-time inventory management</li>
                <li>✓ Customer reviews and ratings system</li>
                <li>✓ Admin dashboard with analytics</li>
              </FeatureList>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Business Impact</SectionTitle>
              <SectionText>
                This e-commerce platform has helped businesses increase online sales by 150% within the first 6 months. 
                The solution features a 40% reduction in cart abandonment rate and a 60% improvement in conversion rates 
                compared to previous platforms.
              </SectionText>
            </ProjectSection>
          </ProjectContent>
        </Container>
      </ProjectDetailsContainer>
    </motion.div>
  );
};

export default EcommerceDetails;
