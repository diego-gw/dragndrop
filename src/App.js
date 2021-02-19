import logo from './logo.svg';
import './App.css';
import SideBar from "./components/SideBar";
import Canvas from "./components/Canvas";
import CanvasClass from "./components/CanvasClass";

function App() {
  return (
    <div className="main-page">
      <SideBar />
      <CanvasClass />
    </div>
  );
}

export default App;
