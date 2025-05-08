import { useState, useEffect, useRef } from 'react';
import './PortfolioContent.css';

const PortfolioContent = ({
  activeSection,
  onClose,
  showWelcome,
  setShowWelcome
}) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(null);
  const contentRef = useRef(null);

  const sectionContent = {
    about: (
      <>
        <h2>About Me</h2>
        <p>Hello! My name is Jakson Coffin. I graduated from the University of Minnesota Twin Cities in May 2025
          (Bachelor of Science - Computer Science). I often utilize my passion for astronomy and physics to create</p>

        <p>I specialize in frontend development with React, creating responsive and interactive web applications
          that captivate users and provide seamless experiences across all devices.</p>

        <p>When I'm not coding, you'll find me stargazing, exploring new technologies, or contributing to
          open-source projects that make the web more accessible and engaging.</p>
      </>
    ),
    projects: (
      <>
        <h2>Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Rocket League Reinforcement Learning Agents</h3>
            <p>Engineered and trained high-performance RL agents using PPO with custom reward shaping and Weights & Biases for experiment tracking, achieving consistent in-game performance over 1B+ training steps.</p>
            <div className="project-tech">Python · PPO · OpenAI Gym · Weights & Biases</div>
          </div>
          <div className="project-card">
            <h3>Esports Player Performance Prediction</h3>
            <p>Created a replay ingestion and analysis system using the Ballchasing API, enabling SVM, Logistic Regression, and Random Forest models to evaluate gameplay and support pro-level scouting and strategy.</p>
            <div className="project-tech">Python · Scikit-learn · Ballchasing API · Data Viz</div>
          </div>
          <div className="project-card">
            <h3>Scrimbot - Esports Discord Bot</h3>
            <p>Developed a Discord bot used by 35K+ collegiate players for real-time scrim scheduling via Discord Gateway API with SQL optimization and enhanced command UX using Markdown formatting.</p>
            <div className="project-tech">JavaScript · Discord API · SQL · WebSockets</div>
          </div>
        </div>
      </>
    ),
    resume: (
      <>
        <div className="resume-header">
          <h2>Resume</h2>
          <button className="download-resume">Download Full Resume (PDF)</button>
        </div>

        <div className="resume-section">
          <h3>Skills</h3>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Programming Languages</h4>
              <ul>
                <li>Python</li>
                <li>Java</li>
                <li>C / C++</li>
                <li>JavaScript</li>
                <li>R</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Libraries & Tools</h4>
              <ul>
                <li>PyTorch / TensorFlow</li>
                <li>Scikit-learn / NumPy / Pandas</li>
                <li>Matplotlib / Seaborn</li>
                <li>Jupyter Notebooks</li>
                <li>OpenAI Gym API</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Tech & Platforms</h4>
              <ul>
                <li>PostgreSQL</li>
                <li>Git / GitHub / VSCode</li>
                <li>Microsoft Azure</li>
                <li>Jira / UML</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h3>Experience</h3>
          <div className="experience-item">
            <div className="experience-header">
              <h4>Returns Associate</h4>
              <span className="experience-date">Oct 2020 – Jul 2021</span>
            </div>
            <div className="experience-company">HOM Furniture, Coon Rapids, MN</div>
            <p>Trained and mentored team members on return process best practices, improving workflow efficiency and supporting operations across departments.</p>
          </div>
        </div>

        <div className="resume-section">
          <h3>Projects</h3>
          <div className="experience-item">
            <div className="experience-header">
              <h4>Rocket League Reinforcement Learning Agents</h4>
            </div>
            <p>Trained PPO agents in Rocket League simulations over 1B+ steps, using custom rewards and tracking via Weights & Biases to optimize performance.</p>
          </div>
          <div className="experience-item">
            <div className="experience-header">
              <h4>Esports Player Performance Prediction</h4>
            </div>
            <p>Built a scalable system using Ballchasing API, trained SVM and Random Forest models, and created visualizations to support professional team scouting and strategy.</p>
          </div>
          <div className="experience-item">
            <div className="experience-header">
              <h4>Scrimbot - Esports Discord Bot</h4>
            </div>
            <p>Developed a Discord bot for 35K+ users with real-time matchmaking via WebSockets and optimized SQL handling for performance and uptime.</p>
          </div>
        </div>

        <div className="resume-section">
          <h3>Leadership</h3>
          <div className="experience-item">
            <div className="experience-header">
              <h4>Club President & Varsity Captain</h4>
            </div>
            <div className="experience-company">University of Minnesota Rocket League Esports Club</div>
            <p>Oversee a 3,000+ member club, lead varsity team strategy and training, and secured $20,000 in fundraising to support club operations and growth.</p>
          </div>
        </div>

        <div className="resume-section">
          <h3>Education</h3>
          <div className="education-item">
            <h4>B.S. in Computer Science</h4>
            <div className="education-details">
              <span className="education-institution">University of Minnesota, College of Science and Engineering</span>
              <span className="education-date">Expected May 2025 · GPA: 3.6</span>
            </div>
            <p>Relevant Coursework: Machine Learning, AI, Data Science, Software Engineering, Data Structures, Computer Architecture</p>
          </div>
        </div>
      </>
    ),
    contact: (
      <>
        <h2>Contact</h2>
        <p>Whether you're interested in collaboration, have a question, or just want to connect — I'd love to hear from you.</p>

        <div className="contact-methods">
          <div className="contact-item">
            <div className="contact-icon">✉️</div>
            <div className="contact-info">
              <h3>Email</h3>
              <p>jaksoncoffin@gmail.com</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">💼</div>
            <div className="contact-info">
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/jakson-coffin</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">🐙</div>
            <div className="contact-info">
              <h3>GitHub</h3>
              <p>github.com/jaksoncoffin</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send me a message</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </>
    )
  };

  useEffect(() => {
    if (activeSection) {
      setContent(sectionContent[activeSection]);
      setVisible(true);
    } else {
      setVisible(false);
      setContent(null);
    }
  }, [activeSection]);

  // reset scroll on each open
  useEffect(() => {
    if (contentRef.current) {
      const sc = contentRef.current.querySelector('.section-content');
      if (sc) sc.scrollTop = 0;
    }
  }, [activeSection]);

  // dismiss welcome on first click anywhere
  useEffect(() => {
    const handleClick = () => {
      if (showWelcome) setShowWelcome(false);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [showWelcome, setShowWelcome]);

  // block constellation clicks & blur while welcome
  useEffect(() => {
    document.body.classList.toggle('block-constellations', showWelcome);
  }, [showWelcome]);

  return (
    <>
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-message">
            <h2>Welcome to my Cosmic Portfolio</h2>
            <p>Click on the glowing constellations scattered around the stars to explore each section.</p>
            <p className="click-to-dismiss">✦ Click anywhere to begin ✦</p>
          </div>
        </div>
      )}

      <div className={`portfolio-content ${activeSection && visible ? 'visible' : 'hidden'}`}>
        {activeSection && visible && (
          <div className="content-wrapper" ref={contentRef}>
            <div className="section-content">
              <button
                className="close-button cosmic-close"
                onClick={onClose}
                aria-label="Close section"
              >
                <span className="star-x">✦</span>
              </button>
              {content}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioContent;