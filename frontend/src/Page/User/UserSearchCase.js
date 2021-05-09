import React, { Component, useRef } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import "../../Styles/UserSearchCase.css";
import CaseItem from "../../Component/CaseItem";
import { serverConn } from '../../utils';
import GPS from "../../assets/icon/gps.png";
import Modal from 'react-modal';

const libraries = ['places'];

class UserBrowseCase extends Component {
    /*
    This is Store Browse Case Page, user should be able to:
        1. browse a list of issued, on going cases
        2. view detail of a case when click on the case
    */
    constructor(props) {
        super(props);
        this.state = {center_lat: null
                    , center_lng: null
                    , caseList: []
                    , clicked: -1
                    , modalOpen: false
                    , selectedCase: {}};
        this.onLoad = ref => this.searchBox = ref;
        this.containerStyle = {
            width: '100%',
            height: '100%',
        }
        this.setPosition = this.setPosition.bind(this);
        this.positionError = this.positionError.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.retrieveCases = this.retrieveCases.bind(this);
    }
    componentDidMount() {
        console.log('try to get location');
        this.retrieveCases();
        navigator.geolocation.getCurrentPosition(this.setPosition, this.positionError, {enableHighAccuracy: true, maximumAge: 0});
    }

    // if user's position is successfully retrieved
    setPosition(pos) {
        console.log('position', parseFloat(pos.coords.latitude), parseFloat(pos.coords.longitude));
        this.user_lat = parseFloat(pos.coords.latitude);
        this.user_lng = parseFloat(pos.coords.longitude);
        this.setState({center_lat: parseFloat(pos.coords.latitude), center_lng: parseFloat(pos.coords.longitude)});
    }

    // if user's position is failed to retrieve
    positionError(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    // handle styling change when a case is clicked
    handleClick(index) {
        var list = this.state.caseList;
        var selected;
        for(let i=0; i<list.length; i++) {
            if(i !== index) {
                list[i].class = "";
            }
            else {
                list[i].class = "clicked";
                selected = list[i];
            }
        }

        this.setState({caseList: list, modalOpen: true, selectedCase: selected});
    }

    // when a case's marker is click, move the center of the map to the marker
    // and scroll the list on the right to the specific case
    handleClickMarker(index) {
        this.state.caseList[index].ref.current.scrollIntoView();
        this.handleClick(index);
        this.setState({center_lat: this.user_lat + (index + 1) * 0.001, center_lng: this.user_lng + (index + 1) * 0.001})
    }

    // retrieve all current cases from server
    retrieveCases = async() => {
        let response = await serverConn("/api/user/showGoods", {});
        if(response.msg === 'success') {
            this.setState({caseList: response.data}, function() {
                let list = this.state.caseList;
                for(let i=0; i<list.length; i++) {
                    list[i].onClick = this.handleClick;
                    list[i].class = '';
                    list[i].ref = React.createRef();
                }
                this.setState({caseList: list});
            });
        }
        else {
            console.log('failed to retrieve information')
        }
    }
    render() {
        return (
            <div className="Container searchCase">
                <div className="View map-View">
                    <LoadScript
                        googleMapsApiKey="AIzaSyCpvN91mgQHeKaaQHjfKw1prGDzzdA7cO0"
                        libraries={libraries}
                    >
                        <GoogleMap
                        mapContainerStyle={this.containerStyle}
                        center={this.state.center_lat ? {lat: this.state.center_lat, lng: this.state.center_lng} : {lat: 25.0329694, lng: 121.5654177}}
                        zoom={this.state.center_lat ? 18 : 13}
                        >
                            <></>
                            <Modal
                                isOpen={this.state.modalOpen}>
                                <h1>this is modal</h1>
                                <h2>{this.state.selectedCase.store}</h2>
                                <h2>{this.state.selectedCase.item}</h2>
                                <h2>{this.state.selectedCase.amount}</h2>
                                <h2>{this.state.selectedCase.price}</h2>
                                <h2>{this.state.selectedCase.time}</h2>
                                <button onClick={() => this.setState({modalOpen: false})}>close</button>
                            </Modal>
                            {
                                this.state.center_lat ?
                                <Marker position={{lat: this.user_lat, lng: this.user_lng}} icon={{url: GPS, scaledSize: {height: 40, width: 40}, fillColor: '#FF0000'}}/>
                                :
                                <></>
                            }
                            {
                                this.state.caseList.length ?
                                this.state.caseList.map((item, index) => {
                                    return <Marker position={{lat: this.user_lat + (index + 1) * 0.001, lng: this.user_lng + (index + 1) * 0.001}} onClick={() => this.handleClickMarker(index)}/>
                                })
                                :
                                <></>
                            }
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div className="View cases-View">
                    <ul>
                        {this.state.caseList.map((item, index) => {
                            return <CaseItem caseInfo={item} onClick={item.onClick} class={item.class} key={index} index={index}/>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}


export default UserBrowseCase;