import React, { lazy, Suspense, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Seo from './components/Seo';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import TrustedBrands from './components/TrustedBrands';
import Footer from './components/Footer';

const CampaignEstimator = lazy(() => import('./components/CampaignEstimator'));
const CreatorUniverse = lazy(() => import('./components/CreatorUniverse'));
const LiveFeed = lazy(() => import('./components/LiveFeed'));
const CampaignTimeline = lazy(() => import('./components/CampaignTimeline'));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));
const CaseStudy = lazy(() => import('./components/CaseStudy'));
const Services = lazy(() => import('./components/Services'));
const CreatorNetwork = lazy(() => import('./components/CreatorNetwork'));
const InsightsBlog = lazy(() => import('./components/InsightsBlog'));
const ContactSection = lazy(() => import('./components/ContactSection'));

const CampaignModal = lazy(() => import('./components/CampaignModal'));
const CreatorModal = lazy(() => import('./components/CreatorModal'));
const LoginModal = lazy(() => import('./components/LoginModal'));
const CaseStudyModal = lazy(() => import('./components/CaseStudyModal'));
const CreatorProfileViewerModal = lazy(() => import('./components/CreatorProfileViewerModal'));

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}

export default function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

function HomePage() {
  const [activeRoute, setActiveRoute] = useState('home');
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [selectedProfileCreator, setSelectedProfileCreator] = useState(null);
  const [campaignModalData, setCampaignModalData] = useState(null);

  // Handlers
  const handleStartCampaign = (data) => {
    setCampaignModalData(data || null);
    setIsCampaignModalOpen(true);
  };

  const handleJoinCreator = () => {
    setIsCreatorModalOpen(true);
  };

  const handleSelectCreator = (creator) => {
    setSelectedProfileCreator(creator);
  };

  const handleSelectReel = (reel) => {
    setCampaignModalData({
      category: reel.category,
      creatorName: reel.creator
    });
    setIsCampaignModalOpen(true);
  };

  const handleOpenCaseStudy = (cs) => {
    setSelectedCaseStudy(cs);
  };

  const handleLaunchFromEstimator = (estimatorOutput) => {
    setCampaignModalData({
      budget: estimatorOutput.budget,
      category: 'Multi-Channel'
    });
    setIsCampaignModalOpen(true);
  };

  const handleNavigate = (routeId) => {
    setActiveRoute(routeId);
    const elem = document.getElementById(routeId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F6F4F0] text-[#F7F8FC] selection:bg-violet-200 selection:text-stone-900 dark:bg-[#070A12] dark:selection:bg-indigo-500 dark:selection:text-white">
      {/* Desktop Magnetic Custom Cursor */}
      <Seo />
      <CustomCursor />

      {/* Global Navigation Bar */}
      <Navbar
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        onOpenCampaignModal={() => handleStartCampaign()}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main Content Assembly */}
      <main className="relative">
        {/* 1. Hero Section with Live 3D Smartphone and Reel Player */}
        <Hero
          onStartCampaign={() => handleStartCampaign()}
          onExploreCreators={() => handleNavigate('creators')}
          onSelectCreator={handleSelectCreator}
        />

        <TrustedBrands />

        {/* Interactive campaign simulator */}
        <Suspense fallback={<SectionFallback />}>
          <div className="relative z-20 w-full px-5 py-8 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto w-full max-w-[1400px]">
              <CampaignEstimator onLaunchFromEstimator={handleLaunchFromEstimator} />
            </div>
          </div>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CreatorUniverse onSelectCreator={handleSelectCreator} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <LiveFeed onSelectReel={handleSelectReel} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CampaignTimeline onStartBrief={() => handleStartCampaign()} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AnalyticsDashboard />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CaseStudy onOpenCaseStudyModal={handleOpenCaseStudy} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services onSelectService={(svc) => handleStartCampaign({ category: svc.name })} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CreatorNetwork onExplore={() => handleNavigate('creators')} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <InsightsBlog onSelectPost={(post) => handleStartCampaign({ category: post.category })} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection
            onStartCampaign={() => handleStartCampaign()}
            onJoinCreator={handleJoinCreator}
          />
        </Suspense>
      </main>

      {/* Dark Premium Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Dialogs */}
      <Suspense fallback={null}>
        {isCampaignModalOpen && (
          <CampaignModal
            isOpen={isCampaignModalOpen}
            onClose={() => setIsCampaignModalOpen(false)}
            initialData={campaignModalData}
          />
        )}
        {isCreatorModalOpen && (
          <CreatorModal
            isOpen={isCreatorModalOpen}
            onClose={() => setIsCreatorModalOpen(false)}
          />
        )}
        {isLoginModalOpen && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}
        {selectedCaseStudy && (
          <CaseStudyModal
            isOpen={!!selectedCaseStudy}
            caseStudy={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
            onLaunchSimilar={(cs) => handleStartCampaign({ category: cs.category })}
          />
        )}
        {selectedProfileCreator && (
          <CreatorProfileViewerModal
            isOpen={!!selectedProfileCreator}
            creator={selectedProfileCreator}
            onClose={() => setSelectedProfileCreator(null)}
            onStartCampaign={(creator) => {
              setSelectedProfileCreator(null);
              setCampaignModalData({
                category: creator.category || 'Fashion & Lifestyle',
                creatorName: creator.name
              });
              setIsCampaignModalOpen(true);
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
