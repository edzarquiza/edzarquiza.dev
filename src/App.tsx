import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectDetail from './pages/ProjectDetail'
import EcommercePerformanceAnalysis from './pages/EcommercePerformanceAnalysis'
import IncidentPerformanceAnalysis from './pages/IncidentPerformanceAnalysis'
import WorkforceRetentionAnalysis from './pages/WorkforceRetentionAnalysis'
import DemandIntelligenceAnalysis from './pages/DemandIntelligenceAnalysis'
import AutomatedFinancePipeline from './pages/AutomatedFinancePipeline'
import FlowOps from './pages/FlowOps'
import AureliaAI from './pages/AureliaAI'
import About from './pages/About'
import Credentials from './pages/Credentials'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/ecommerce-performance-analysis" element={<EcommercePerformanceAnalysis />} />
          <Route path="/work/incident-performance-operational-analysis" element={<IncidentPerformanceAnalysis />} />
          <Route path="/work/workforce-retention-career-progression" element={<WorkforceRetentionAnalysis />} />
          <Route path="/work/demand-intelligence-retail-forecasting" element={<DemandIntelligenceAnalysis />} />
          <Route path="/work/automated-finance-data-pipeline" element={<AutomatedFinancePipeline />} />
          <Route path="/work/flowops" element={<FlowOps />} />
          <Route path="/work/aurelia-ai" element={<AureliaAI />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/credentials" element={<Credentials />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
