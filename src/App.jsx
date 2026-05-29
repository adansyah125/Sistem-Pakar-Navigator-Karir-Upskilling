import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProfileSelection from './pages/ProfileSelection'
import LoadingAssessment from './pages/LoadingAssessment'
import Assessment from './pages/Assessment'
import Diagnosis from './pages/Diagnosis'
import Roadmap from './pages/Roadmap'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile-selection" element={<ProfileSelection />} />
      <Route path="/loading" element={<LoadingAssessment />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/diagnosis" element={<Diagnosis />} />
      <Route path="/roadmap" element={<Roadmap />} />
    </Routes>
  )
}
