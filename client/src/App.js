import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Activities from './components/Activities'
import Details from './components/Details';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path ='/' component={LandingPage}/>
          <Route exact path ='/home/' component={Home}/>
          <Route exact path ='/home/:id' component={Details}/>
          <Route exact path ='/activities/' component={Activities}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
