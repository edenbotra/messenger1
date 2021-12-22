import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import './newMessage.css';

class newMessage extends React.Component {

    state ={
        addressee_id : "",
        subject : "" ,
        content : "",
        userExist:false,
        feedback:''

    }

    sendTo= (e) => {
        let addressee = e.target.value;
        this.setState({
            addressee_id: addressee},
            () => {axios.get("http://localhost:8989/checkIfUserExistByUsername",{
                params:{username: this.state.addressee_id}})
                .then((response)=>{
                    this.setState({
                        userExist: response.data
                    });})});}




    setSubject = (e) => {
        const subject = e.target.value;
        this.setState({
            subject:subject,
        })}


    setContent = (e) => {
        const content = e.target.value;
        this.setState({
            content:content,
        })}

    sendMessage = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/send-message",{
            params:{
                senderToken: cookies.get("logged_in"),
                addressee_id : this.state.addressee_id,
                subject : this.state.subject ,
                content : this.state.content,

            }
        })
            .then((response)=>{
                if(response.data){
                    this.setState({
                        addressee_id :"",
                        subject :"",
                        content:"",
                        feedback:"message send successfully"
                    })
                }else {
                    this.setState({
                        feedback: "user number is not on messenger, invite him:) "
                    })
                }

            })

    }


    render() {
        return(

            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <form id="msform">

                        <fieldset>
                            <h2 className="fs-title">SEND A MESSAGE, BE FRIENDLY!</h2>
                            <input type="text"
                                   name="phone"
                                   onChange={this.sendTo}
                                   placeholder="phone number"
                                   value={this.state.addressee_id}

                            />
                            <input type="text"
                                   name="lname"
                                   placeholder="subject"
                                   onChange={this.setSubject}
                                   value={this.state.subject}
                            />
                            <input
                                type="text"
                                name="lname"
                                onChange={this.setContent}
                                value={this.state.content}
                                placeholder="message content"
                            />
                            <button
                                    className="next action-button"
                                    onClick={this.sendMessage}
                                    disabled={!(this.state.addressee_id!==''&&this.state.subject !== '' && this.state.content !=='')}>
                                    SEND
                            </button>
                        </fieldset>

                    </form>
                  <div>{this.state.feedback}</div>
                </div>
            </div>


        )

    }

}
export default newMessage;

