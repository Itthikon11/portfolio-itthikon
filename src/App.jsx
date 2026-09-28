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
  light: { horizonColor: '#f3f6ff', waveColor: '#dfe7ff', crestColor: '#8eaaff' },
  dark: { horizonColor: '#121019', waveColor: '#231f33', crestColor: '#76718f' }
};

export default function App() {
  const { theme } = useApp();
  return (
    <>
      <div className="bg-waves" aria-hidden="true">
        <GradientWaves {...WAVES[theme]} speed={0.15} detail="low" dpr={1} parallaxStrength={0.3} grainIntensity={0.03} />
      </div>
      <Navbar />
      <main>
        <Home />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Mascots />
    </>
  );
}
