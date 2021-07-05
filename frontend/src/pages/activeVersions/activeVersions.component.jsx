import React from 'react'
import ReactApexChart from 'react-apexcharts'
import './activeVersions.styles.scss';

class ActiveVersions extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        softwares: [],      
        bar: {
            series: [{
                name: "Number of devices",
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 350
                },
                plotOptions: {
                  bar: {
                    horizontal: true,
                  }
                },
                dataLabels: {
                  enabled: false
                },
                xaxis: {
                  categories: [],
                }
              }
        },
        pie: {
            series: [],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: [],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }
        }
        
      };
    }

    componentDidMount(){
      fetch('http://localhost:3001/softwares', {
        method: 'GET',
    }).then(response => {
        if(response.status === 200){
            return response.json()
        } else{
            return Promise.reject()
        }
    }).then(softwares => {
        console.log(softwares)
        
        this.setState({
          softwares: softwares
        })
        this.fillData()
    }, function(){
        alert("Došlo je do pogreške")
    })
  }

  fillData = () => {
    var data = []
    var categories = []
    
    const objectArray = Object.values(this.state.softwares);
    const pom = Object.entries(objectArray[0])
  
    pom.forEach(([key, value]) => {
      categories.push(value.code)
      data.push(parseInt(value.numberOfDevices));
    });

    let barCopy = JSON.parse(JSON.stringify(this.state.bar));
    let pieCopy = JSON.parse(JSON.stringify(this.state.pie));

    barCopy.series[0].data = data;
    barCopy.options.xaxis.categories = categories;
    pieCopy.series = data;
    pieCopy.options.labels = categories;
    this.setState({
        bar: barCopy,
        pie: pieCopy
    })
}
    render() {
        return (
        <div>
          <h1>Active versions</h1>
          <div className="containerAV">
          <ReactApexChart options={this.state.bar.options} series={this.state.bar.series} type="bar" height={350} width={550}/>
          
          <ReactApexChart options={this.state.pie.options} series={this.state.pie.series} type="pie" width={450} />
        </div>
        </div>
        );
    }
}

export default ActiveVersions