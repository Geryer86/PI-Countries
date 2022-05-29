import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <h1>HELLO WORLD</h1>
        <Switch>
          <Route exact path ='/' component={LandingPage}/>
          <Route exact path ='/home/' component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
