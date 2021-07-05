import React from 'react'
import './map.styles.scss'
import GoogleMapReact from 'google-map-react';
import LocationPin from "../../components/locationPin/locationPin.component";
import ZAGREB_CENTER from '../../const/zg_center';

class MyMap extends React.Component {
    constructor() {
        super();
        this.state = {
            locations:[ 
                {
                    name: 'Prvi marker',
                    lat: 45.8150,
                    lng: 16.0000
                },
                {
                    name: 'Drugi marker',
                    lat: 45.8170,
                    lng: 15.9805
                },
                {
                    name: 'Treći marker',
                    lat: 45.8270,
                    lng: 16.0025
                },
                {
                    name: 'Četvrti marker',
                    lat: 45.8180,
                    lng: 16.0030
                },
                {
                    name: 'Peti marker',
                    lat: 45.8205,
                    lng: 15.9995
                },
                {
                    name: 'Šesti marker',
                    lat: 45.8120,
                    lng: 16.0085
                },
                {
                    name: 'Sedmi marker',
                    lat: 45.8220,
                    lng: 16.0105
                }
            ]
        }
    }

    render() {
        return (
            <div className="map">
                <h2 className="map-h2">Trenutni čvorovi u upotrebi</h2>

                <div className="google-map">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyClhEnoDyclGxy20CrEBtyxxObTjvqpGoo' }}
                        defaultCenter={ZAGREB_CENTER}
                        defaultZoom={13}
                    >

                        {this.state.locations.map(location =>
                            <LocationPin
                                lat={location.lat}
                                lng={location.lng}
                                name={location.name}
                            />                        
                        )}  
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default MyMap