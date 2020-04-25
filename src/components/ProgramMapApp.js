import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardContainer from './cards/CardContainer'
import ProgramMapContainer from './ProgramMapContainer';

class ProgramMapApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapOpen: false,
      map: null,
      programSelected: 'Agriculture'
    }
  }

  componentDidMount() {
    function handleFirstTab(e) {
      if (e.keyCode === 9) {
        document.body.classList.add('user-is-tabbing');
        
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
      }
    }
    function handleMouseDownOnce() {
      document.body.classList.remove('user-is-tabbing');
      
      window.removeEventListener('mousedown', handleMouseDownOnce);
      window.addEventListener('keydown', handleFirstTab);
    }
    window.addEventListener('keydown', handleFirstTab);
  }

  programSelect = (event) => {
    this.setState({programSelected: event.target.value})
  };

  openMap = (title) => {
    if (this.state.mapOpen) {
      this.setState({mapOpen: false, map: title})
    } else {
      this.setState({mapOpen: true, map: title})
    }
  }

  closeMap = () => {
    if (this.state.mapOpen) {
      this.setState({mapOpen: false})
    }
  }

  keyCloseMap = (e) => {
    if (this.state.mapOpen && e.keyCode === 13) {
      this.setState({mapOpen: false})
    }
  }

  render () {
    return (
      <Router>
        <Route exact={true} path='/'>
          <CardContainer openMap={this.openMap} programSelected={this.state.programSelected} programSelect={this.programSelect} />
        </Route>
        <Route path={`/ProgramMap/:urlTitle/`} >
          <ProgramMapContainer map={this.state.map} />
        </Route>
      </Router>
    )
  }
}

export default ProgramMapApp