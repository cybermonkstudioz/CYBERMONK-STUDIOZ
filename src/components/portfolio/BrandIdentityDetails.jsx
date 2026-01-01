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

const BrandIdentityDetails = () => {
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
            <ProjectTitle>Brand Identity</ProjectTitle>
            <ProjectSubtitle>Complete brand identity for a modern startup</ProjectSubtitle>
          </ProjectHeader>
          
          <ProjectImage 
            src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/f7cb5753-6ab2-4dab-a063-88ddcdc0635f.png" 
            alt="Brand Identity Project"
          />
          
          <ProjectContent>
            <ProjectSection>
              <SectionTitle>Project Overview</SectionTitle>
              <SectionText>
                A comprehensive brand identity system designed to establish a strong visual presence in the market. 
                This project encompasses all essential brand elements to create a cohesive and memorable brand experience.
              </SectionText>
              <SectionText>
                The brand identity features modern design principles, versatile applications, and strategic thinking 
                to ensure the brand stands out in competitive markets and resonates with target audiences.
              </SectionText>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Deliverables</SectionTitle>
              <SectionText>
                Complete brand package with all essential elements for consistent brand presentation.
              </SectionText>
              <TechStack>
                <TechTag>Logo Design</TechTag>
                <TechTag>Brand Guidelines</TechTag>
                <TechTag>Business Cards</TechTag>
                <TechTag>Letterhead</TechTag>
                <TechTag>Social Media Templates</TechTag>
                <TechTag>Brand Style Guide</TechTag>
              </TechStack>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Key Features</SectionTitle>
              <FeatureList>
                <li>✓ Custom logo with multiple variations</li>
                <li>✓ Comprehensive color palette</li>
                <li>✓ Typography system</li>
                <li>✓ Brand application examples</li>
                <li>✓ Digital and print assets</li>
                <li>✓ Brand usage guidelines</li>
              </FeatureList>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Brand Impact</SectionTitle>
              <SectionText>
                This brand identity has helped the startup establish market recognition within 3 months of launch. 
                The solution features consistent application across all touchpoints and has contributed to a 200% increase 
                in brand recall and customer engagement metrics.
              </SectionText>
            </ProjectSection>
          </ProjectContent>
        </Container>
      </ProjectDetailsContainer>
    </motion.div>
  );
};

export default BrandIdentityDetails;
