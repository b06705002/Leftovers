import React, { Component } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import "../../Styles/UserSearchCase.css";
import CaseItem from "../../Component/CaseItem";

const libraries = ['places'];

class UserBrowseCase extends Component {
    /*
    This is Store Browse Case Page, user should be able to:
        1. browse a list of issued, on going cases
        2. view detail of a case when click on the case
    */
    constructor(props) {
        super(props);
        this.state = {user_lat: null
                    , user_lng: null
                    , stores: []};
        this.onLoad = ref => this.searchBox = ref;
        this.containerStyle = {
            width: '100%',
            height: '100%',
        }
        this.setPosition = this.setPosition.bind(this);
        this.positionError = this.positionError.bind(this);
        
    }
    componentDidMount() {
        console.log('try to get location');
        navigator.geolocation.getCurrentPosition(this.setPosition, this.positionError, {enableHighAccuracy: true, maximumAge: 0});
    }

    setPosition(pos) {
        console.log('position', parseFloat(pos.coords.latitude), parseFloat(pos.coords.longitude));
        this.setState({user_lat: parseFloat(pos.coords.latitude), user_lng: parseFloat(pos.coords.longitude)});
    }
    positionError(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    
    render() {
        return (
            <div className="Container">
                <LoadScript
                    googleMapsApiKey="AIzaSyCpvN91mgQHeKaaQHjfKw1prGDzzdA7cO0"
                    libraries={libraries}
                >
                    <GoogleMap
                    mapContainerStyle={this.containerStyle}
                    center={this.state.user_lat ? {lat: this.state.user_lat, lng: this.state.user_lng} : {lat: 25.0329694, lng: 121.5654177}}
                    zoom={this.state.user_lat ? 18 : 13}
                    >
                        <></>
                        {
                            this.state.user_lat ?
                            <Marker position={{lat: this.state.user_lat, lng: this.state.user_lng}}/>
                            :
                            <></>
                        }
                    </GoogleMap>
                </LoadScript>
            </div>
        );
    }
}


export default UserBrowseCase;