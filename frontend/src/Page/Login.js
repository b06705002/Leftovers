import React, { Component } from 'react';
import "../Styles/Login.css";

class Login extends Component {

    constructor(props) {
        super(props);
    }

    login() {
        var mail = document.getElementById("username_store").value;
        var pwd = document.getElementById("password_store").value;
        console.log(mail, pwd);
        fetch('/api', {
            method: 'POST', 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mail: mail, pwd: pwd})
        }).then(response => {
            if (response.ok){
                return response.json()
            }
        }).then(data => console.log(data.msg))
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
        } 

        // 登入切換到註冊
        else {
            login_user.style.display = "none";   //login消失
            login_store.style.display = "none";   //login消失
            signup_user.style.display = "block"; //signup出現
            signup_user.style.visibility="visible";
         
            document.getElementById("fullname_user").value="";
            document.getElementById("username2_user").value="";
            document.getElementById("password2_user").value="";
            document.getElementById("comfirm_password_user").value="";
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
        } 

        // 登入切換到註冊
        else {
            login_user.style.display = "none";   //login消失
            login_store.style.display = "none";   //login消失
            signup_store.style.display = "block"; //signup出現
            signup_store.style.visibility="visible";
         
            document.getElementById("fullname_store").value="";
            document.getElementById("username2_store").value="";
            document.getElementById("password2_store").value="";
            document.getElementById("comfirm_password_store").value="";
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

                                    <form onSubmit={this.handleLoginSubmit}>
                                        <input type="text" id="username_user" name="username" placeholder="信箱帳號" required />
                                        <div className="tab"></div>
                                        <input type="text" id="password_user" name="password" placeholder="密碼" required />
                                        <div className="tab"></div>
                                        <input type="button" value="登入" className="submit-user" onClick={this.login} />
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
                                    <input type="button" value="登入" className="submit-store" onClick={this.login} />
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
                                        <input type="text" id="username2_user" name="username" placeholder="帳號" required />
                                        <div className="tab"></div>
                                        <input type="text" id="password2_user" name="password" placeholder="密碼" required />
                                        <div className="tab"></div>
                                        <input type="text" id="comfirm_password_user" name="comfirm_password" placeholder="確認密碼" required />
                                        <div className="tab"></div>
                                        <input type="tel" id="phoneNo_user" name="phone_number" placeholder="手機號碼" required />
                                        <div className="tab"></div>
                                        <input type="email" id="email_user" name="email" placeholder="信箱帳號" required />
                                        <div className="tab"></div>
                                        <input type="submit" value="註冊" className="submit-user" />
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
                                        <input type="text" id="fullname_store" name="fullname" placeholder="店家全名" required />
                                        <div className="tab"></div>
                                        <input type="text" id="username2_store" name="username" placeholder="帳號" required />
                                        <div className="tab"></div>
                                        <input type="text" id="password2_store" name="password" placeholder="密碼" required />
                                        <div className="tab"></div>
                                        <input type="text" id="comfirm_password_store" name="comfirm_password" placeholder="確認密碼" required />
                                        <div className="tab"></div>
                                        <input type="text" id="address_store" name="address" placeholder="店家地址" required />
                                        <div className="tab"></div>
                                        <input type="tel" id="phoneNo_store" name="phone_number" placeholder="手機號碼" required />
                                        <div className="tab"></div>
                                        <input type="email" id="email_store" name="email" placeholder="信箱帳號" required />
                                        <div className="tab"></div>            
                                        <input type="submit" value="註冊" className="submit-store" />
                                    </form>  
                                    <h6 onClick={this.show_hide_store}>登入 <u>一般使用者/合作店家</u> 帳號</h6>
                                </div>
                            </div>
                        </div>

                         {/* what are these ?*/}
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;