import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProjectDetailsContainer = styled.div`
  padding: 6rem 0 4rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  min-height: 100vh;
  color: #ffffff;
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

const WebApplicationDetails = () => {
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
            <ProjectTitle>Web Application</ProjectTitle>
            <ProjectSubtitle>Custom web application for business automation</ProjectSubtitle>
          </ProjectHeader>
          
          <ProjectImage 
            src="https://s3-alpha.figma.com/hub/file/6235856616/2dcfa04b-0f3f-43e3-bb68-3a9dd899f7c3-cover.png" 
            alt="Web Application Project"
          />
          
          <ProjectContent>
            <ProjectSection>
              <SectionTitle>Project Overview</SectionTitle>
              <SectionText>
                A comprehensive web application designed to streamline business operations through intelligent automation. 
                This custom solution addresses complex workflow challenges while maintaining an intuitive user experience.
              </SectionText>
              <SectionText>
                The application features real-time data processing, advanced analytics, and seamless integration with 
                existing business systems to enhance productivity and decision-making processes.
              </SectionText>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Technical Stack</SectionTitle>
              <SectionText>
                Built with modern technologies to ensure scalability, performance, and maintainability.
              </SectionText>
              <TechStack>
                <TechTag>Vue.js</TechTag>
                <TechTag>Django</TechTag>
                <TechTag>PostgreSQL</TechTag>
                <TechTag>REST API</TechTag>
                <TechTag>Docker</TechTag>
                <TechTag>AWS</TechTag>
              </TechStack>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Key Features</SectionTitle>
              <FeatureList>
                <li>✓ Real-time dashboard with live data updates</li>
                <li>✓ Automated workflow management</li>
                <li>✓ Advanced reporting and analytics</li>
                <li>✓ Multi-user collaboration tools</li>
                <li>✓ Secure authentication and authorization</li>
              </FeatureList>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Project Impact</SectionTitle>
              <SectionText>
                This web application has significantly improved operational efficiency, reducing manual processing time 
                by 60% and increasing overall productivity by 40%. The solution has been successfully deployed 
                across multiple departments with excellent user adoption rates.
              </SectionText>
            </ProjectSection>
          </ProjectContent>
        </Container>
      </ProjectDetailsContainer>
    </motion.div>
  );
};

export default WebApplicationDetails;
