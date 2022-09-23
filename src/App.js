import './App.scss';
import ColorStage from './components/ColorStage/ColorStage';
import SidePanel from './components/SidePanel/SidePanel';


function App() {
  return (
    <div className="app">
      <div className='main'>
        <SidePanel/>
        <ColorStage/>
      </div>
    </div>
  );
}

export default App;
