import './App.css';
import * as React from "react";
import ProfilePage from "./ProfilePage";
import EmailList from "./EmailList";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import NavigationBar from "./NavigationBar";
import newMessage from "./newMessage";
import Home from "./Home";


class App extends React.Component {

    state = {
        isLoggedIn: true,
        token : ""
    }

    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get("logged_in")) {
            this.setState({
                isLoggedIn: true,
                token : cookies.get("logged_in")
            })
        }
    }

    render() {
        return (
            <div>

                <BrowserRouter>
                    {
                        this.state.isLoggedIn ?
                            <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                <NavigationBar/>
                                <Route path={"/"} component={ProfilePage} exact={true}/>
                                <Route path={"/ProfilePage"} component={ProfilePage} exact={true}/>
                                <Route path={"/emails"} component={EmailList} exact={true}/>
                                <Route path={"/newMessage"} component={newMessage} exact={true}/>
                            </div>
                            :
                            <div>
                                <Route path={"/"} component={Home}/>
                            </div>
                    }
                </BrowserRouter>
            </div>
        )
    }

}

export default App;
