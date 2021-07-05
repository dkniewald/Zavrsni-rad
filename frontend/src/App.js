import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component'
import Footer from "./components/footer/footer.component";
import MyMap from "./pages/map/map.component";
import ActiveVersions from "./pages/activeVersions/activeVersions.component";
import CurrentUpdates from "./pages/currentUpdates/currentUpdates.component";
import CurrentUpdatesSpecific from "./pages/currentUpdatesSpecific/currentUpdatesSpecific.component";

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      backendURL: "http://localhost:3001/"
    }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className = 'page-container'>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/googleMap" component={MyMap} />
            <Route exact path="/activeVersions" component={ActiveVersions} />
            <Route exact path="/currentUpdates" component={CurrentUpdates} />
            <Route exact path="/currentUpdates/:id" component={CurrentUpdatesSpecific} />
          </Switch>
        </div>
        <Footer/>        
      </div>
    )
  }
}

export default App;