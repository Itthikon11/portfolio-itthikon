import { useApp } from './context/AppContext';
import Mascots from './components/Mascots';
import Navbar from './components/Navbar';
import GradientWaves from './components/reactbits/GradientWaves';
import Contact from './components/sections/Contact';
import Education from './components/sections/Education';
import Home from './components/sections/Home';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';

const WAVES = {
  light: {
    horizonColor: '#f2fdff',
    waveColor: '#fffefe',
    crestColor: '#00bcff',
    speed: 0.5,
    amplitude: 2.05,
    waveScale: 0.55,
    waveRatio: 1.2,
    swell: 40,
    turbulence: 25,
    tilt: 0.81,
    zoom: 1.1,
    height: 7.2,
    fogDepth: 21,
    detail: 'medium',
    brightness: 0.85,
    opacity: 1,
    parallaxStrength: 0.46,
    grainIntensity: 0.05
  },
  dark: {
    horizonColor: '#121019',
    waveColor: '#231f33',
    crestColor: '#76718f',
    speed: 0.15,
    detail: 'low',
    parallaxStrength: 0.3,
    grainIntensity: 0.03
  }
};

const PAGE_VIEWS = { home: Home, education: Education, skills: Skills, projects: Projects, contact: Contact };

export default function App() {
  const { theme, page } = useApp();
  const Page = PAGE_VIEWS[page];
  return (
    <>
      <div className="bg-waves" aria-hidden="true">
        <GradientWaves {...WAVES[theme]} dpr={1} />
      </div>
      <Navbar />
      <main key={page} className="page">
        <Page />
      </main>
      <Mascots />
    </>
  );
}
