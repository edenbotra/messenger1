import * as React from "react";
import './profile.css'
import Cookies from "universal-cookie";
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
class ProfilePage extends React.Component {
    logout = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }
    render() {
        return (
            <div>
                <link rel="stylesheet" href="css/estilos.css"/>
                    <link href='https://fonts.googleapis.com/css?family=Quicksand:300,400,700' rel='stylesheet' type='text/css'/>
                        <link href='https://fonts.googleapis.com/css?family=Lato:400,300' rel='stylesheet' type='text/css'/>
                            <link href="https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet"/>
                <div className="container">
                    <header>
                        <div className="bio">
                            <img src="http://www.croop.cl/UI/twitter/images/up.jpg" alt="background" className="bg"/>
                                <div className="desc">
                                    <h3>MESSENGER</h3>
                                    <p> Messenger makes it easy and fun to stay close to your favorite people.</p>
                                </div>
                        </div>

                        <div className="avatarcontainer">
                            <img src="http://www.croop.cl/UI/twitter/images/carl.jpg" alt="avatar" className="avatar"/>
                                <div className="hover">
                                    <div  startIcon={MapsUgcIcon} >

                                    </div>
                                </div>
                        </div>


                    </header>

                    <div className="content">
                        <div className="data">
                            <ul>
                                <li>2,934<span>unread messages</span></li>
                                <li>1,119<span>stared messages</span></li>
                                <li>2,322<span>newest activity</span></li>

                            </ul>
                        </div>

                            <button className='button' onClick={this.logout}>
                                Logout</button>

                    </div>

                </div>

            </div>
        )
    }
}
export default ProfilePage;
