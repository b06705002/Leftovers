import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import "../Styles/Login.css";
import { serverConn } from '../utils';
import { GoogleMap, LoadScript, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';

const libraries = ['places'];

class Login extends Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        
        this.center = {
            lng: 121.5654177,
            lat: 25.0329694
        }
        this.onLoad = ref => this.searchBox = ref;
        this.state = {API_lat: null
                    , API_lng: null
                    , API_placeID: null
                    , API_address: null
                    , API_name: null
                    , mapVisible: false
                    , store: ''
                    , address: ''
                    , placeID: null
                    , LaL: null};
        this.containerStyle = {
            width: '100%',
            height: '800px',
        }
        this.show_hide_store = this.show_hide_store.bind(this);
        this.show_hide_user = this.show_hide_user.bind(this);
    }
    storeRegister = async() => {
        console.log('press!!!');
        // var store = document.getElementById("fullname_store").value;
        var pwd = document.getElementById("password2_store").value;
        var conpwd = document.getElementById("comfirm_password_store").value;
        // var address = document.getElementById("address_store").value;
        var phone = document.getElementById("phoneNo_store").value;
        var mail = document.getElementById("email_store").value;
        if (pwd === conpwd){
            let data = {store: this.state.store, mail: mail, pwd: pwd, address: this.state.address, phone: phone, apid: this.state.placeID, LaL: this.state.LaL};
            let response = await serverConn('/api/store/register', data);
            console.log('response', response);
            if(response.msg === 'duplicated') {
                console.log('duplicated');
            }
            else if(response.msg === 'fail') {
                console.log('fail');
            }
            else {
                console.log('success');
                this.props.setCookies(response);
                this.props.handleLogin('store');
            }
        }
    }

    storeLogin = async() => {
        var mail = document.getElementById("username_store").value;
        var pwd = document.getElementById("password_store").value;
        let data = {mail: mail, pwd: pwd};

        let response = await serverConn('api/store/login', data);
        if(response.msg === 'success') {
            console.log('success');
            this.props.setCookies(response);
            this.props.handleLogin("store");
        }
        else {
            console.log('fail');
        }
    }

    userRegister = async() => {
        var fullname = document.getElementById("fullname_user").value;
        var pwd = document.getElementById("password2_user").value;
        var conpwd = document.getElementById("comfirm_password_user").value;
        var phone = document.getElementById("phoneNo_user").value;
        var mail = document.getElementById("email_user").value;
        if (pwd === conpwd){
            let data = {mail: mail, pwd: pwd, phone: phone, name: fullname};
            let response = await serverConn('/api/user/register', data);
            if(response.msg === 'duplicated') {
                console.log('duplicated');
            }
            else if(response.msg === 'fail') {
                console.log('fail');
            }
            else {
                console.log('success');
                this.props.setCookies(response);
                this.props.handleLogin('user');
            }
        }
    }

    userLogin = async() => {
        var mail = document.getElementById("username_user").value;
        var pwd = document.getElementById("password_user").value;
        let data = {mail: mail, pwd: pwd};

        let response = await serverConn('api/user/login', data);
        if(response.msg === 'success') {
            console.log('success');
            this.props.setCookies(response);
            this.props.handleLogin("user");
        }
        else {
            console.log('fail');
        }
    }

    show_hide_user() {
        console.log("user");
        var login_user = document.getElementById("container1-user");
        var signup_user = document.getElementById("container2-user");
        var login_store = document.getElementById("container1-store");
        var signup_store = document.getElementById("container2-store");
      
        // 註冊切換到登入
        if (login_user.style.display === "none") {
            login_user.style.display = "block";  //login出現
            login_store.style.display = "block";  //login出現
            document.getElementById("username_user").value="";
            document.getElementById("password_user").value="";
            signup_user.style.display = "none";  //signup消失
            signup_store.style.display = "none";  //signup消失
            this.setState({mapVisible: false});
        } 

        // 登入切換到註冊
        else {
            login_user.style.display = "none";   //login消失
            login_store.style.display = "none";   //login消失
            signup_user.style.display = "block"; //signup出現
            signup_user.style.visibility="visible";
         
            document.getElementById("fullname_user").value="";
            document.getElementById("password2_user").value="";
            document.getElementById("comfirm_password_user").value="";
            this.setState({mapVisible: true});
        }
    }

    show_hide_store() {
        console.log("store");
        var login_user = document.getElementById("container1-user");
        var signup_user = document.getElementById("container2-user");
        var login_store = document.getElementById("container1-store");
        var signup_store = document.getElementById("container2-store");
      
        // 註冊切換到登入
        if (login_store.style.display === "none") {
            login_user.style.display = "block";  //login出現
            login_store.style.display = "block";  //login出現
            document.getElementById("username_store").value="";
            document.getElementById("password_store").value="";
            signup_user.style.display = "none";  //signup消失
            signup_store.style.display = "none";  //signup消失
            this.setState({mapVisible: false});
        } 

        // 登入切換到註冊
        else {
            login_user.style.display = "none";   //login消失
            login_store.style.display = "none";   //login消失
            signup_store.style.display = "block"; //signup出現
            signup_store.style.visibility="visible";
         
            document.getElementById("fullname_store").value="";
            document.getElementById("password2_store").value="";
            document.getElementById("comfirm_password_store").value="";
            this.setState({mapVisible: true});
        }
    }

    handleLoginSubmit = () => {
        fetch('/api', {
            method: "POST",
            body: JSON.stringify({
                content: "backendTst"
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => console.log(response))
    }

    onPlacesChanged = () => {
        console.log(this.searchBox.getPlaces());
        var place = this.searchBox.getPlaces()[0];
        console.log(place.geometry.location.lng());
        console.log(place.geometry.location.lat());
        this.setState({API_lng: place.geometry.location.lng(), API_lat: place.geometry.location.lat(), API_name: place.name, API_placeID: place.place_id, API_address: place.formatted_address});
    }

    confirmPlace = () => {
        this.setState({store: this.state.API_name, address: this.state.API_address, placeID: this.state.API_placeID, LaL: {lat: this.state.API_lat, lng: this.state.API_lng}}, function() {
            this.setState({API_lat: null, API_lng: null, API_address: null, API_name: null, API_placeID: null});
        });
    }

    render() {
        return (
            <div className="login">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="#">剩杰食堂</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Portfolio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        {/* <div className="system_name">
                            <h2>蝦米碗糕 <br /> 剩杰食堂老師居然很愛</h2>
                        </div> */}

                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://asiasociety.org/sites/default/files/styles/1200w/public/2019-05/190523_junzibing_asiablog.jpg" alt="First slide" />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://media-exp1.licdn.com/dms/image/C561BAQHsGu0_rbX2JQ/company-background_10000/0/1592190729149?e=2159024400&v=beta&t=duTt56eUqyz3JCxqdwPD1pZdKerPf6faMkkGR4Rd7UQ" alt="Second slide" />
                            <div className="carousel-caption d-none d-md-block"></div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://www.shamrockfoodservice.com/wp-content/uploads/2020/08/CM_Kitchentelligence-Live-Image-1400x780_0820.jpg" alt="Third slide" />
                            <div className="carousel-caption d-none d-md-block"></div>
                        </div>

                        <div className="user_login_page">
                            <div id="container1-user">
                                <div className="login">  
                                    <h3 className="user_login_color">一般使用者 登入 Login</h3>

                                    <form>
                                        <input type="text" id="username_user" name="username" placeholder="信箱帳號" required />
                                        <div className="tab"></div>
                                        <input type="text" id="password_user" name="password" placeholder="密碼" required />
                                        <div className="tab"></div>
                                        <input type="button" value="登入" className="submit-user" onClick={() => this.userLogin()} />
                                    </form>  
                                    <h6 onClick={this.show_hide_user}>註冊帳號 <br/> 來成為一般使用者吧❤</h6>
                                </div>
                            </div>
                        </div>

                        <div className="store_login_page">
                            <div id="container1-store">
                                <div className="login">  
                                <h3 className="store_login_color">合作店家 登入 Login</h3>
                                <form action="用戶管理.php">
                                    <input type="text" id="username_store" name="username" placeholder="信箱帳號" required />
                                    <div className="tab"></div>
                                    <input type="text" id="password_store" name="password" placeholder="密碼" required />
                                    <div className="tab"></div>
                                    <input type="button" value="登入" className="submit-store" onClick={() => this.storeLogin()} />
                                </form>  
                                <h6 onClick={this.show_hide_store}>註冊帳號 <br/> 來成為合作店家吧❤</h6>
                                </div>
                            </div>
                        </div>

                        <div className="user_signup_page">
                            <div id="container2-user">
                                <div className="signup">  
                                    <h3 className="user_signup_color">註冊成為一般使用者</h3>
                                    <form action="用戶管理.php">
                                        <input type="text" id="fullname_user" name="fullname" placeholder="使用者全名" required />
                                        <div className="tab"></div>
                                        <input type="text" id="password2_user" name="password" placeholder="密碼" required />
                                        <div className="tab"></div>
                                        <input type="text" id="comfirm_password_user" name="comfirm_password" placeholder="確認密碼" required />
                                        <div className="tab"></div>
                                        <input type="tel" id="phoneNo_user" name="phone_number" placeholder="手機號碼" required />
                                        <div className="tab"></div>
                                        <input type="email" id="email_user" name="email" placeholder="信箱帳號" required />
                                        <div className="tab"></div>
                                        <input type="button" value="註冊" className="submit-user" onClick={() => this.userRegister()}/>
                                    </form>  
                                    <h6 onClick={this.show_hide_user}>登入 <u>一般使用者/合作店家</u> 帳號</h6>
                                </div>
                            </div>
                        </div>

                        <div className="store_signup_page">
                            <div id="container2-store">
                                <div className="signup">  
                                    <h3 className="store_signup_color">註冊成為合作店家</h3>
                                    <form action="用戶管理.php">
                                        <input type="text" id="fullname_store" name="fullname" placeholder="店家全名" value={this.state.store} required disabled/>
                                        <div className="tab"></div>
                                        <input type="text" id="password2_store" name="password" placeholder="密碼" required />
                                        <div className="tab"></div>
                                        <input type="text" id="comfirm_password_store" name="comfirm_password" placeholder="確認密碼" required />
                                        <div className="tab"></div>
                                        <input type="text" id="address_store" name="address" placeholder="店家地址" value={this.state.address} required disabled/>
                                        <div className="tab"></div>
                                        <input type="tel" id="phoneNo_store" name="phone_number" placeholder="手機號碼" required />
                                        <div className="tab"></div>
                                        <input type="email" id="email_store" name="email" placeholder="信箱帳號" required />
                                        <div className="tab"></div>            
                                        <input type="button" value="註冊" className="submit-store" onClick={() => this.storeRegister()}/>
                                    </form>  
                                    <h6 onClick={this.show_hide_store}>登入 <u>一般使用者/合作店家</u> 帳號</h6>
                                </div>
                            </div>
                        </div>

                         {/* what are these ?*/}
                        {/* <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a> */}
                    </div>
                    <div style={{display: 'none'}}>
                        <input
                            id="pac-input"
                            class="controls"
                            type="text"
                            placeholder="Enter a location"
                        />
                    </div>
                    {this.state.mapVisible ? 
                    <LoadScript
                        googleMapsApiKey="AIzaSyCpvN91mgQHeKaaQHjfKw1prGDzzdA7cO0"
                        libraries={libraries}
                    >
                        <GoogleMap
                        mapContainerStyle={this.containerStyle}
                        center={this.state.API_lat ? {lat: this.state.API_lat, lng: this.state.API_lng} : {lat: 25.0329694, lng: 121.5654177}}
                        zoom={this.state.API_lat ? 17 : 13}
                        >
                            <StandaloneSearchBox
                                onLoad={this.onLoad}
                                onPlacesChanged={
                                    this.onPlacesChanged
                                }
                                >
                                <input
                                    type="text"
                                    placeholder="Customized your placeholder"
                                    style={{
                                    boxSizing: `border-box`,
                                    border: `1px solid transparent`,
                                    width: `360px`,
                                    height: `48px`,
                                    padding: `0 12px`,
                                    borderRadius: `3px`,
                                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                    fontSize: `14px`,
                                    outline: `none`,
                                    textOverflow: `ellipses`,
                                    position: "absolute",
                                    left: "50%",
                                    marginLeft: "-120px"
                                    }}
                                />
                            </StandaloneSearchBox>
                            {this.state.API_lat ?
                            <InfoWindow
                                position={{lat: this.state.API_lat, lng: this.state.API_lng}}
                                >
                                <>
                                    <div>名稱 ： {this.state.API_name}</div>
                                    <div>Place ID : {this.state.API_placeID}</div>
                                    <div>Address : {this.state.API_address}</div>
                                    <div>(Lat, Lng) : ({this.state.API_lat}, {this.state.API_lng})</div>
                                    <button type="button" onClick={this.confirmPlace}>確認</button>
                                </>
                            </InfoWindow>
                            :
                            <></>
                            }
                        <></>
                        </GoogleMap>
                    </LoadScript>
                    :
                    <></>
                    }
                    
                </div>
            </div>
        );
    }
}

export default Login;