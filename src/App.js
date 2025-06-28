
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import JobMatch from './JobMatch';
import './App.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('en')}>🇬🇧</button>
      <button onClick={() => changeLanguage('fr')}>🇫🇷</button>
      <button onClick={() => changeLanguage('nl')}>🇳🇱</button>
    </div>
  );
};

const Summary = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t('summaryTitle')}</h2>
      <p>{t('summaryContent')}</p>
    </section>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  const experiences = t('experience', { returnObjects: true });

  return (
    <section>
      <h2>{t('experienceTitle')}</h2>
      <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
        {experiences.map((job, index) => (
          <div className="experience-slide" key={index}>
            <h3>{job.title}</h3>
            <h4>{job.company}</h4>
            <span className="period">{job.period}</span>
            <p>{job.description}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

const Education = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t('educationTitle')}</h2>
      {t('education', { returnObjects: true }).map((edu, index) => (
        <div key={index}>
          <h3>{edu.institution}</h3>
          <p>{edu.degree} ({edu.period})</p>
        </div>
      ))}
    </section>
  );
};

const Skills = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t('skillsTitle')}</h2>
      <div>
        <h3>{t('skills.languagesTitle')}</h3>
        <ul>
          {t('skills.languages', { returnObjects: true }).map((lang, index) => <li key={index}>{lang}</li>)}
        </ul>
      </div>
      <div>
        <h3>{t('skills.professionalTitle')}</h3>
        <ul>
          {t('skills.professional', { returnObjects: true }).map((skill, index) => <li key={index}>{skill}</li>)}
        </ul>
      </div>
      <div>
        <h3>{t('skills.technicalTitle')}</h3>
        <ul>
          {t('skills.technical', { returnObjects: true }).map((skill, index) => <li key={index}>{skill}</li>)}
        </ul>
      </div>
    </section>
  );
};

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <div className="profile-video-container">
          <video className="profile-video" autoPlay loop muted playsInline>
            <source src="/profile-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="header-text">
          <h1>{t('name')}</h1>
          <p>{t('jobTitle')}</p>
          <p>{t('contact.email')} | {t('contact.phone')} | {t('contact.address')}</p>
          <p>
            <a href={t('contact.linkedin')} target="_blank" rel="noopener noreferrer">{t('linkedin')}</a>
          </p>
        </div>
        <LanguageSwitcher />
      </header>
      <div className="App-body">
        <Tabs>
          <TabList>
            <Tab>{t('summaryTitle')}</Tab>
            <Tab>{t('experienceTitle')}</Tab>
            <Tab>{t('educationTitle')}</Tab>
            <Tab>{t('skillsTitle')}</Tab>
            <Tab>{t('jobMatchTitle')}</Tab>
          </TabList>

          <TabPanel>
            <Summary />
          </TabPanel>
          <TabPanel>
            <Experience />
          </TabPanel>
          <TabPanel>
            <Education />
          </TabPanel>
          <TabPanel>
            <Skills />
          </TabPanel>
          <TabPanel>
            <JobMatch />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
