import React from 'react'
//import ReactApexChart from 'react-apexcharts'
import './currentUpdates.styles.scss';
import CurrentUpdatesMetaDataContainer from '../../components/currentUpdates-metadata-container/currentUpdates-metadata-container.component'

class CurrentUpdates extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        updates: []      
      };
    }

    componentDidMount(){
      fetch('http://localhost:3001/updates', {
          method: 'GET'
      }).then(response => { 
          return response.json()
      }).then(updates => {
        const objectArray = Object.values(updates);
          this.setState({
            updates: Object.values(objectArray[0])
          })
      })
  }
    render() {
        return (
          <div>
            <h1>Current updates</h1>
          <div className = 'currentU-header-container'>
              <h3>Update no.</h3>
              <h3>Base version</h3>
              <h3>Target version</h3>
              <h3>Created</h3>
              <h3>Info</h3>
          </div>
          {this.state.updates.map(update =>
              <CurrentUpdatesMetaDataContainer num = {update.id} baseVersion = {update.baseVersion} targetVersion = {update.targetVersion} created = {update.created}/>
          )}
      </div>
        );
    }
}

export default CurrentUpdates