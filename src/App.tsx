import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pinyin from './pages/Pinyin'
import Vocabulary from './pages/Vocabulary'
import Dialogue from './pages/Dialogue'
import Practice from './pages/Practice'
import Lesson from './pages/Lesson'
import Videos from './pages/Videos'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pinyin" element={<Pinyin />} />
        <Route path="/lesson/:day" element={<Lesson />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/dialogue" element={<Dialogue />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </Router>
  )
}

export default App
