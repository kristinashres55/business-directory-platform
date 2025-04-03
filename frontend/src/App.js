import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Main />
    </div>
  );
}

export default App;
