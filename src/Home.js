import React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import {Redirect} from "react-router";
import './Home.css';
import {Button, Snackbar} from "@material-ui/core";
import "./sideBar.css";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import {Alert} from "@mui/material";

class Home extends React.Component  {

    state = {
        username: "",
        password: "",
        showError:false,

    }
    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }



    isMobilePhone = (number) => {
        const pattern = /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
        return pattern.test(number);
    }
    passwordValidation(password) {
           //strong password- at least 8 characters, at least one uppercase,at least one lowercase, at least one digit, at least one digit
        const pattern =/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
        return pattern.test(password);
    }


    signUp = () => {
        if(!this.isMobilePhone(this.state.username)){
            alert("invalid phone");
        }
        if(!this.passwordValidation(this.state.password)){
            alert("weak password!please notice that your password has at least 8 characters," +
                " at least one uppercase," +
                "at least one lowercase, " +
                "at least one digit, at least one digit")

        }
        if (this.isMobilePhone(this.state.username)&&
            this.passwordValidation(this.state.password)){
            axios.get("http://localhost:8989/create-account", {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
                .then((response) => {
                    if (response.data) {
                        this.setState({
                            response: "Your account has been created!"


                        }
                        )
                    } else {

                        this.setState({
                            showError: true,
                            response: "This username is already taken"})
                    }
                })
        }

    }


    login = () => {
                axios.get("http://localhost:8989/sign-in", {
                    params: {
                        username: this.state.username,
                        password: this.state.password
                    }
                })
                    .then(response=> {
            switch (response.data){
                case "userNotExist" :this.setState({
                    response: "no user related to this phone number"
                });
                break;
                case "invalidPassword":this.setState({response: "wrong password"});break
                case "userBlocked": alert("you are blocked, pls contact us");break;
                default :
                    this.setState({
                        showError:true

                    });
                    const cookies = new Cookies()
                    cookies.set("logged_in", response.data)
                    window.location.reload();

            }

        })
            }




    render() {
        const hasRequiredDetails = !(this.state.username === "" || this.state.password === "");

            if(this.state.success)
            return (<Redirect to={"/UserPage"}/>)
                return(
                 <div>
                     <Button startIcon={<PersonPinIcon/>}>welcome</Button>
                     <pre><h2 className="title">Hang out   <br/>   anytime,   <br/>    anywhere</h2></pre>
                         <form className="form1">
                            <div>
                                <input
                                    className="un "
                                    type="text"
                                    align="center"
                                    onChange={this.onUsernameChange}
                                    placeholder="mobile number"
                                />
                            </div>
                            <div>
                                <input
                                    className="pass"
                                    type="password"
                                    align="center"
                                    onChange={this.onPasswordChange}
                                    placeholder="password"
                                />
                            </div>
                             <Button onClick={this.login}
                                     disabled={!hasRequiredDetails}
                                     startIcon={<LoginIcon />}
                                     className="sidebar_compose">
                                 login
                             </Button>
                             <Button onClick={this.signUp}
                                     disabled={!hasRequiredDetails}
                                     startIcon={<PersonAddAltIcon />}
                                     className="sidebar_compose">
                                 sign in
                             </Button>
                             <p className="forgot" align="center">
                                 Messenger makes it easy and fun to stay close to your favorite people.
                             </p>
                        </form>
                     {
                         this.state.response === "no user related to this phone number" || this.state.response === "wrong password" || this.state.response === "This username is already taken" ?
                             <div className="error">{this.state.response}</div>
                             :
                             <div></div>
                     }

                     {

                         this.state.response==="Your account has been created!"?

                             <Alert severity="success" aria-setsize={50}>welcome!you successfully joined messenger</Alert>


                         :
                         <div></div>

                     }


            </div>
        )

    }

}
export default Home;