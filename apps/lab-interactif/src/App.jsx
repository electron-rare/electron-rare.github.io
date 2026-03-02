import { NavLink, Route, Routes } from 'react-router-dom';
import { LabHomePage } from './pages/LabHomePage';
import { SignalsPage } from './pages/SignalsPage';
import { PrototypesPage } from './pages/PrototypesPage';

export function App() {
  return (
    <div className="lab-app">
      <header className="lab-header">
        <div className="lab-shell">
          <a className="lab-brand" href="/">
            Retour site principal
          </a>
          <nav aria-label="Navigation lab">
            <ul>
              <li>
                <NavLink to="/" end>
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink to="/signals">Signals</NavLink>
              </li>
              <li>
                <NavLink to="/prototypes">Prototypes</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="lab-shell">
        <Routes>
          <Route path="/" element={<LabHomePage />} />
          <Route path="/signals" element={<SignalsPage />} />
          <Route path="/prototypes" element={<PrototypesPage />} />
        </Routes>
      </main>
    </div>
  );
}
