import { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import linkedinIcon from '../../public/InBug-White.png'
import githubIcon from '../../public/github-mark-white.png';
import './PortfolioContent.css';

const PortfolioContent = ({
  activeSection,
  onClose,
  showWelcome,
  setShowWelcome
}) => {
  const [visible, setVisible] = useState(false);
  const [state, handleSubmit] = useForm("xvgarvqd");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const contentRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.succeeded) {
      formRef.current?.reset();
      setShowSuccessMessage(true);
      setFormSubmitted(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (activeSection !== 'contact') {
      setShowSuccessMessage(false);
    }
  }, [activeSection]);

  const sectionContent = {
    about: (
      <>
        <h2>About Me</h2>
        <p>
          Hello! I'm Jakson. I studied computer science at the University of Minnesota and have been diving deep into machine learning
          and AI lately, but I’m interested in just about anything within the broader CS world; whether that’s data science,
          software engineering, or something in between.
        </p>
        <p>
          When I’m not coding, I’m usually outside. I like golfing, hiking, snowboarding, fishing, and trying to stay on the wall while
          rock climbing. Music is a big part of my life, and I’m often listening to something new or playing the piano. I also enjoy
          thrifting and keeping up with esports (watching and playing). I tend to gravitate toward things that are creative, hands-on,
          or a little competitive.
        </p>
        <p>
          This website is a mix of things I've worked on and things I care about. Thanks for stopping by!
        </p>
      </>
    ),
    projects: (
      <>
        <h2>Projects</h2>
        <div className="project-grid">
          <a
            href="https://drive.google.com/file/d/1Yn1DRqy9_5ekyvall0S1gveM9MBbbV3l/view"
            target="_blank"
            rel="noopener norefferer"
            className="project-card link"
          >
            <h3>Rocket League Reinforcement Learning Agents</h3>
            <p>Engineered and trained high-performance RL agents using PPO with custom reward shaping and Weights & Biases for experiment tracking, achieving consistent in-game performance over 1B+ training steps.</p>
            <div className="project-tech">Python · PPO · OpenAI Gym · Weights & Biases</div>
          </a>
          <a
            href="https://colab.research.google.com/drive/1uLKQp4X_9jMWgy-BXRwt2HmUs-foO-rl"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card link"
          >
            <h3>Esports Player Performance Prediction</h3>
            <p>
              Created a replay ingestion and analysis system using the Ballchasing API, enabling SVM, Logistic Regression, and Random Forest models to evaluate gameplay and support pro-level scouting and strategy.
            </p>
            <div className="project-tech">Python · Scikit-learn · Ballchasing API · Data Viz</div>
          </a>
          <a
            href="https://github.com/MDixey17/scrimbot"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card link"
          >
            <h3>Scrimbot – Esports Discord Bot</h3>
            <p>Developed a Discord bot used by 35,000 collegiate players for real-time scrim scheduling via Discord Gateway API with SQL optimization and enhanced command UX using Markdown formatting.</p>
            <div className="project-tech">JavaScript · Discord API · SQL · WebSockets</div>
          </a>
          <a
            href="https://cpargy.itch.io/discovering-the-unkown"
            target="_blank"
            rel="noopener norefferer"
            className="project-card link"
          >
            <h3>Otter Game Jam - Discovering the Unknown</h3>
            <p>Co-developed the concept, led the art direction, and contributed to gameplay programming in Unity for a game created to raise awareness about the Monterey Canyon and highlight concerns around climate change and the impact of human activity on fragile marine environments.</p>
            <div className="project-tech">Unity · C# · Photoshop · Git</div>
          </a>
          <div className="project-card">
            <h3>Autonomous Drone Transit Simulator</h3>
            <p>Developed a C++ based simulation with a web interface for managing autonomous drones for deliveries in an urban environment. Containerized using Docker for modular testing and deployment.</p>
            <p className="note">(Demo available on request)</p>
            <div className="project-tech">C++ · Docker · Agile · Software Design Patterns</div>
          </div>
          <a
            href="https://github.com/jaksoncoffin/sportscheduler"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card link"
          >
            <h3>SPORTS – Scheduling Platform</h3>
            <p>Collaborated on a modular scheduling system to manage community sports leagues, featuring automatic conflict detection, schedule generation, and rescheduling support. Developed in an Agile team using design principles like modularity and separation of concerns.</p>
            <div className="project-tech">Java · Unit Tests · Agile · Software Architecture</div>
          </a>

        </div>
      </>
    ),
    resume: (
      <>
        <div className="resume-header">
          <h2>Resume</h2>
          <a
            href="/assets/resume.pdf"
            download
            className="primary-button"
          >
            Download Full Resume (PDF)
          </a>
        </div>

        <div className="resume-section">
          <h3>Education</h3>
          <div className="education-item">
            <h4>B.S. in Computer Science</h4>
            <div className="education-details">
              <span className="education-institution">University of Minnesota, College of Science and Engineering</span>
              <span className="education-date">May 2025</span>
            </div>
            <p>Relevant Coursework: Machine Learning, Artificial Intelligence, Data Science, Software Engineering, Data Structures and Algorithms, Computer Architecture</p>
          </div>
        </div>

        <div className="resume-section">
          <h3>Skills</h3>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Programming & Technical</h4>
              <ul>
                <li>Python, Java, C, C++, JavaScript, R, Assembly</li>
                <li>Machine Learning · Data Science · Reinforcement Learning</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Tools & Technologies</h4>
              <ul>
                <li>PyTorch, TensorFlow, Scikit-learn, NumPy, Pandas</li>
                <li>PostgreSQL, Git, GitHub, VSCode, Jupyter Notebooks</li>
                <li>OpenAI Gym API, Discord API, Microsoft Azure, Jira, UML</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Soft Skills</h4>
              <ul>
                <li>Leadership & Team Coordination</li>
                <li>Strategic Thinking & Problem Solving</li>
                <li>Technical Communication</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h3>Projects</h3>
          <div className="experience-item">
            <div className="experience-header">
              <h4>Rocket League Reinforcement Learning Agents</h4>
            </div>
            <p>Engineered and trained high-performance RL agents using PPO with custom reward shaping, simulating over 1B training steps. Used Weights & Biases for experiment tracking and model optimization.</p>
          </div>
          <div className="experience-item">
            <div className="experience-header">
              <h4>Esports Player Performance Prediction</h4>
            </div>
            <p>Built a scalable replay analysis system using the Ballchasing API. Trained SVM, Logistic Regression, and Random Forest models, visualizing performance metrics for professional roster scouting and team strategy optimization.</p>
          </div>
          <div className="experience-item">
            <div className="experience-header">
              <h4>Scrimbot - Esports Discord Bot</h4>
            </div>
            <p>Developed a Discord bot for over 35,000 users with real-time scrim scheduling via WebSockets. Optimized SQL queries and refined UI with Markdown for improved UX.</p>
          </div>
        </div>

        <div className="resume-section">
          <h3>Leadership</h3>
          <div className="experience-item">
            <div className="experience-header">
              <h4>Club President & Varsity Captain</h4>
            </div>
            <div className="experience-company">University of Minnesota Rocket League Esports Club</div>
            <p>Led 3,000+ member club, managing team creation, events, and tournament logistics. Appointed varsity captain by Athletics, leading training and in-game strategy. Secured $20,000 in funding.</p>
          </div>
        </div>
      </>
    ),
    contact: (
      <>
        <h2>Contact</h2>
        <p>Whether you're interested in collaboration, have a question, or just want to connect — I'd love to hear from you.</p>

        <div className="contact-methods">
          <a href="mailto:jaksoncoffin@gmail.com" className="contact-item" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon">✉️</div>
            <div className="contact-info">
              <h3>Email</h3>
              <p>jaksoncoffin@gmail.com</p>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/jakson-coffin" className="contact-item" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon">
              <img src={linkedinIcon} alt="LinkedIn" className="icon-img" />
            </div>
            <div className="contact-info">
              <h3>LinkedIn</h3>
              <p>www.linkedin.com/in/jakson-coffin</p>
            </div>
          </a>
          <a href="https://github.com/jaksoncoffin" className="contact-item" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon">
              <img src={githubIcon} alt="GitHub" className="icon-img" />
            </div>
            <div className="contact-info">
              <h3>GitHub</h3>
              <p>github.com/jaksoncoffin</p>
            </div>
          </a>
        </div>

        {formSubmitted ? (
          <div className={`form-success-animated ${showSuccessMessage ? '' : 'form-success-static'}`}>
            ✦ Thank you! Your message has been sent. ✦
          </div>
        ) : (
          <div className="contact-form">
            <h3>Send me a message</h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" placeholder="Your name" required />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" placeholder="Your email" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Your message" required />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <button
                type="submit"
                className="primary-button"
                disabled={state.submitting}
              >
                Send Message
              </button>
            </form>
          </div>
        )}
      </>
    )
  };

  useEffect(() => {
    setVisible(!!activeSection);
  }, [activeSection]);

  useEffect(() => {
    if (contentRef.current) {
      const sc = contentRef.current.querySelector('.section-content');
      if (sc) sc.scrollTop = 0;
    }
  }, [activeSection]);

  useEffect(() => {
    const handleClick = () => {
      if (showWelcome) setShowWelcome(false);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [showWelcome, setShowWelcome]);

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
              {sectionContent[activeSection]}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioContent;