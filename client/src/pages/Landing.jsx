// pages/Landing.jsx

import Nav             from '../components/Nav/Nav';
import Hero            from '../components/Hero/Hero';
import StatsStrip      from '../components/StatsStrip/StatsStrip';
import DemoPanel       from '../components/DemoPanel/DemoPanel';
import ProcessSteps    from '../components/ProcessSteps/ProcessSteps';
import UsersSection    from '../components/UsersSection/UsersSection';
import TerminalPreview from '../components/TerminalPreview/TerminalPreview';
import FinalCTA        from '../components/FinalCTA/FinalCTA';
import Footer          from '../components/Footer/Footer';
import AnalysisModal   from '../components/AnalysisModal/AnalysisModal';

import useUpload       from '../hooks/useUpload';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Landing() {

  const {
    file,
    isAnalysing,
    analysisData,
    handleFileSelect,
    resetUpload,
    handleAnalysisComplete,
  } = useUpload();

  useScrollReveal();

  const triggerUpload = () => document.getElementById('fileInput')?.click();

  return (
    <>
      <Nav onUploadClick={triggerUpload} />

      <main>
        <Hero           onFileSelect={handleFileSelect} />
        <StatsStrip />
        <DemoPanel />
        <ProcessSteps />
        <UsersSection />
        <TerminalPreview analysisData={analysisData} isAnalysing={isAnalysing} />
        <FinalCTA       onUploadClick={triggerUpload} />
      </main>

      <Footer />

      <AnalysisModal
        isOpen       = {isAnalysing}
        filename     = {file?.name}
        analysisData = {analysisData}
        onClose      = {resetUpload}
        onComplete   = {handleAnalysisComplete}
      />
    </>
  );
}
