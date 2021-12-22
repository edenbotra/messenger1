import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import "./emailList.css";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
class EmailList extends React.Component {
    state={
        token:"",
        messages:[],
    }
    componentDidMount() {
        this.getMessages();
    }

    deleteMessage = (id) => {
        axios.get("http://localhost:8989/delete-message", {
            params: {
                message_id:id
            }
        })
            .then((response) => {
                this.getMessages()
            })
    }

    readMessage = (id) => {
        axios.get("http://localhost:8989/message-read", {
            params: {
                id

            }
        })
            .then(() => {
                this.getMessages()
            })
    }



    getMessages = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-messages", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                this.setState({
                    messages: response.data
                })
            })
    }


    render() {
        return (
            <div>
                <h1>
                    <span className="blue">&lt;</span>Your<span className="blue">&gt;</span> <span>Messages</span></h1>
                <h1>  MESSENGER   <strong> BY NES</strong></h1>

                {
                    this.state.messages.length!== 0 ?


                  this.state.messages.map((message) => {
                    return(

                      <div id="wrapper">
                          <table id="keywords" cellSpacing="0" cellPadding="0">
                              <thead>
                              <tr>
                                  <th><span>FROM</span></th>
                                  <th><span>SUBJECT</span></th>
                                  <th><span>CONTENT</span></th>
                                  <th><span>SENT IN</span></th>
                                  <th><span>MARK AS READ</span></th>
                                  <th><span>DELETE MESSAGE</span></th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td>{message.sender}</td>
                                  <td>{message.subject}</td>
                                  <td>{message.content}</td>
                                  <td>{message.dispatch}</td>
                                  <td>

                                      <button  disabled={message.read===1} onClick={() => this.readMessage(message.id)} >
                                       read
                                      </button>

                                  </td>
                                  <td>
                                      <IconButton  onClick={() => this.deleteMessage(message.id)} aria-label="delete" size="large">
                                      <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                  </td>

                              </tr>


                              </tbody>
                          </table>
                      </div>

                  );

                })
                    :
                    <div>
                         NO MESSAGES YET !
                    </div>
                }
            </div>
        )
    }
}

export default EmailList;