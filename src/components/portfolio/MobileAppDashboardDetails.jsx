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

const MobileAppDashboardDetails = () => {
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
            <ProjectTitle>Mobile App Dashboard</ProjectTitle>
            <ProjectSubtitle>Clean and intuitive user interface design for mobile dashboard</ProjectSubtitle>
          </ProjectHeader>
          
          <ProjectImage 
            src="https://cdn.dribbble.com/users/285267/screenshots/17394538/medibank-dashboard-app.png" 
            alt="Mobile App Dashboard Project"
          />
          
          <ProjectContent>
            <ProjectSection>
              <SectionTitle>Project Overview</SectionTitle>
              <SectionText>
                A sophisticated mobile dashboard application designed to provide users with comprehensive data visualization 
                and seamless account management. This solution combines elegant design with powerful functionality 
                to deliver an exceptional user experience.
              </SectionText>
              <SectionText>
                The dashboard features real-time data updates, intuitive navigation, and personalized insights 
                to help users make informed decisions and manage their activities efficiently.
              </SectionText>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Technical Stack</SectionTitle>
              <SectionText>
                Built with cutting-edge mobile development technologies to ensure performance and scalability.
              </SectionText>
              <TechStack>
                <TechTag>React Native</TechTag>
                <TechTag>Redux</TechTag>
                <TechTag>Chart.js</TechTag>
                <TechTag>Node.js</TechTag>
                <TechTag>MongoDB</TechTag>
                <TechTag>Firebase</TechTag>
              </TechStack>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>Key Features</SectionTitle>
              <FeatureList>
                <li>✓ Real-time data visualization</li>
                <li>✓ Interactive charts and graphs</li>
                <li>✓ Secure authentication system</li>
                <li>✓ Push notifications</li>
                <li>✓ Offline mode support</li>
                <li>✓ Dark/light theme toggle</li>
                <li>✓ Biometric login options</li>
              </FeatureList>
            </ProjectSection>
            
            <ProjectSection>
              <SectionTitle>User Experience Impact</SectionTitle>
              <SectionText>
                This mobile dashboard has achieved a 4.8-star rating on app stores with over 100,000 downloads. 
                User engagement has increased by 75% and session duration by 45% compared to previous versions. 
                The app features a 95% crash-free rate and exceptional performance metrics.
              </SectionText>
            </ProjectSection>
          </ProjectContent>
        </Container>
      </ProjectDetailsContainer>
    </motion.div>
  );
};

export default MobileAppDashboardDetails;
