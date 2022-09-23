import './App.scss';
import ColorStage from './components/ColorStage/ColorStage';
import TopNav from './components/TopNav/TopNav';
import SideNav from './components/SideNav/SideNav';

function App() {
  return (
    <div className="app">
      <div className='side-main'>
        <SideNav/>
        <ColorStage/>
      </div>
    </div>
  );
}

export default App;
