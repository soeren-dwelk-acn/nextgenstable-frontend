import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import ShowHorses from './components/ShowHorses'
import AddHorse from './components/AddHorse'
import ManageFeedings from './components/ManageFeedings'
import LogoFader from './components/LogoFader'
import EffectHeader from './components/EffectHeader'
import ManageStables from './components/ManageStables'
import Home from './components/Home'

function App() {
  const [horses, setHorses] = useState([]);

  const [stables, setStables] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/stables")
      .then((result) => result.json())
      .then((result) => setStables(result))
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/horses")
      .then((result) => result.json())
      .then((result) => setHorses(result))
  }, []);

  return (
    <Router>

      <div id="header">
        <LogoFader />
        <EffectHeader />
      </div>

      <nav>
        <ul>
          <li><Link to="/manage-stables">Manage Stables</Link></li>
          <li><Link to="/add-horse">Add Horse</Link></li>
          <li><Link to="/manage-feedings">Manage Feeding</Link></li>
          <li><Link to="/show-horses">Show Horses</Link></li>
        </ul>
      </nav>

      <main className="editor">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage-stables" element={<ManageStables stables={stables} />} />
          <Route path="/add-horse" element={<AddHorse stables={stables} />} />
          <Route path="/manage-feedings" element={<ManageFeedings horses={horses} feedings={[]} />} />
          <Route path="/show-horses" element={<ShowHorses stables={stables} horses={horses} setHorses={setHorses} />} />
        </Routes>
      </main>

      <footer>
        <p>Copyright &copy; 2024 My Website</p>
      </footer>
    </Router>
  );
}

export default App
