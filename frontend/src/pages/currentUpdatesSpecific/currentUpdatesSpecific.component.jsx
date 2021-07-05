import React from 'react'
import ReactApexChart from 'react-apexcharts'
import './currentUpdatesSpecific.styles.scss';

class CurrentUpdatesSpecific extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        update: [],
        progress: {
          series: [98],
          colors: ["#20E647"],
          options: {
            chart: {
              height: 350,
              type: "radialBar",
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 135,
                track: {
                  background: '#333',
                  startAngle: -135,
                  endAngle: 135,
                },
                dataLabels: {
                  name: {
                    show: true,
                  },
                  value: {
                    fontSize: "30px",
                    show: true
                  }
                }
              }
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["#87D4F9"],
                stops: [0, 100]
              }
            },
            stroke: {
              lineCap: "butt"
            },
            labels: ["Cumulative acks"]
          }
        },
        completedDevices: {
          series: [99],
          colors: ["#20E647"],
          options: {
            chart: {
              height: 350,
              type: "radialBar",
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 135,
                track: {
                  background: '#333',
                  startAngle: -135,
                  endAngle: 135,
                },
                dataLabels: {
                  name: {
                    show: true,
                  },
                  value: {
                    fontSize: "30px",
                    show: true
                  }
                }
              }
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["#87D4F9"],
                stops: [0, 100]
              }
            },
            stroke: {
              lineCap: "butt"
            },
            labels: ["Completed devices"]
          }
        }      
      };
    }

    async componentDidMount() {
      const url = "http://localhost:3001/updateInfo/";


      const params = { id: this.props.match.params.id };

      await fetch(url + params.id, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
      }).then(res => {
          if (!res.ok) {
              throw new Error("HTTP Error! " + res.status)
          } else {
              return res.json()
          }
      }).then(update => {
          this.setState({
              update: update
          })
      }
      ).catch(e => {
          alert("Došlo je do pogreške: " + e.message)
      })
      console.log(this.state.update)
  }

    render() {
        return (
            <div className='wrapper'>
              <div className='title'>
                <h1>Update no. {this.state.update.id}</h1>
              </div>
              <div className='wrapperLeft'>
                <div className='item1'>
                  <p>Update id: {this.state.update.id}</p>
                </div>
                <div className='item2'>
                <p>Update started: {this.state.update.started}</p>
                </div>
                <div className='item3'>
                <p>Update status: {this.state.update.status}</p>
                </div>
                <div className='item4'>
                <p>Capsules: {this.state.update.capsules}</p>
                </div>
                <div className='item5'>
                <p>Device type: {this.state.update.deviceName}</p>
                </div>
                <div className='item6'>
                <p>Base software: {this.state.update.baseVersion}</p>
                </div>
                <div className='item7'>
                <p>Target software: {this.state.update.targetVersion}</p>
                </div>
                <div className='item8'>
                <p>Devices in update: {this.state.update.numberOfDevices}</p>
                </div>
              </div>
              <div className='wrapperRight'>
                <ReactApexChart options={this.state.progress.options} series={this.state.progress.series} type="radialBar" height={400} />
                <ReactApexChart options={this.state.completedDevices.options} series={this.state.completedDevices.series} type="radialBar" height={400} />
              </div>              
            </div>
        );
    }
}

export default CurrentUpdatesSpecific