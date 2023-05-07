// import styles from main module, but later i did inline styling due to heavey errors
import Styles from "../Main/Main.module.css"
// import home page img
import homeImg from "./home.png";
// importing css part
import './home.module.css'
// using states -- and it cause for internal rendering
import { useEffect, useRef, useState } from "react";
// Main component that receives focusNote as a prop
function Main({ focusNote }) {
    // State to manage saved messages and store them in localStorage
    const [saveMessages, setSaveMessages] = useState(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")) : [])
    // State to manage the current message being typed
    const [message, setMessage] = useState("")
    // Create date, month, and time variables for the message date and time
    const date = new Date();
    // there are for, setting date and time when message is sent in group, it shows date and time
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentTime = date.getHours() + ":" + date.getMinutes() + " " + ((date.getHours < 12) ? "AM" : "PM");
    // assigned to current date constant, will use that constant globally
    const currentDate = date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()
    // Function to create a new message and add it to saveMessages state
    const messageButton = () => {
        if (message !== "") {
            // created it and focus note
            let id = focusNote.id
            setSaveMessages((pre) => {
                // return to setsave message 
                return [...pre, { id: id, currentTime: currentTime, currentDate: currentDate, message: message }] // Main div message content
            })
        }
    };
    // Reference for scrolling to the end of the messages
    const messageEndRef = useRef(null)
    // Update localStorage when saveMessages state changes
    useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(saveMessages))
    }, [saveMessages])
    // Scroll to the bottom of the messages when a new message is added
    useEffect(() => {
        // this is for scroll bottom
        const scrollToBottom = () => {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        scrollToBottom()
    }, [messageEndRef, message])
    return (
        <div className={Styles.mainContainer}>
            {/* Check if focusNote is defined and render content accordingly */}
            {(focusNote !== undefined) ?
                <div className={Styles.rightContainer}>
                    {/* Navbar */}
                    <div className={Styles.navbar}>
                        <h4 style={{ backgroundColor: focusNote.color }}>{focusNote.title.charAt(0) + focusNote.title.charAt(focusNote.title.indexOf(" ") + 1)}</h4>
                        <p>{focusNote.title}</p>
                    </div>
                    {/* Mid Field */}
                    <div className={Styles.recentMsgContainer} >
                        {/* Render messages corresponding to the focusNote */}
                        {focusNote !== undefined
                            // eslint-disable-next-line array-callback-return
                            ? saveMessages.map((msg) => {
                                const focusNotes = focusNote.id;
                                if (msg.id === focusNotes) {
                                    return (
                                        // return to div, adding styles
                                        <div className={Styles.recentMsg} ref={messageEndRef}>
                                            {/* Time & Date */}
                                            < div className={Styles.msgDTContainer}>
                                                {/* adding date and time in paragraph tag */}
                                                <p>{msg.currentTime}</p>
                                                <p>{msg.currentDate}</p>
                                            </div>
                                            {/* Message */}
                                            <div className={Styles.msgTContainer}>
                                                <p>{msg.message}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                            // If focusNote is undefined, show a default empty message
                            : <>
                                {/* Time & Date */}
                                < div className={Styles.msgDTContainer}>
                                    {/* paragraph form */}
                                    <p></p>
                                    <p></p>
                                </div>
                                {/* Message */}
                                <div className={Styles.msgTContainer}>
                                    {/* parapgaph form */}
                                    <p></p>
                                </div>
                            </>
                        }
                    </div>
                    {/* Input Box */}
                    <div className={Styles.inputBoxContainer}>
                        {/* Real Input Box */}
                        <textarea type="text"
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') { messageButton() }
                            }}
                            // adding enter key and set message is equal to null
                            value={message}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') { setMessage("") }
                            }}
                            placeholder="Enter your text here....." name="message" />
                        {/* Adding src image */}
                        <img src="/Images/submit-Img.png" alt="submit-button" id={Styles.submitBtn} onClick={messageButton} />
                    </div>
                </div>
               


                : <div style={{ background: "#F7ECDC", width: "1100px", height: "712px" }} className="home flex">
                    <img style={{ marginTop: "185px", marginLeft: "330px" }} src={homeImg} alt="img" width="400px" />
                    <p style={{ fontSize: "43px", marginLeft: "430px" }} className="home-title" >Pocket Notes</p>
                    <p style={{ marginLeft: "330px" }} className="home-des">
                        <br />Send and receive messages without keeping your phone online.<br></br> Use Pocket
                        Notes on up to 4 linked devices and 1 mobile phone
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", bottom: "0", right: "470px" }}>
                        <svg style={{ width: "30px", height: "30px" }}>
                            <path
                                d="M2.125 21C1.54063 21 1.04019 20.804 0.623689 20.412C0.207189 20.02 -0.000706529 19.5493 1.80391e-06 19V9C1.80391e-06 8.45 0.208252 7.979 0.624752 7.587C1.04125 7.195 1.54134 6.99933 2.125 7H3.1875V5C3.1875 3.61667 3.70565 2.43733 4.74194 1.462C5.77823 0.486667 7.03092 -0.000665984 8.5 6.8306e-07C9.96979 6.8306e-07 11.2228 0.487667 12.2591 1.463C13.2954 2.43833 13.8132 3.61733 13.8125 5V7H14.875C15.4594 7 15.9598 7.196 16.3763 7.588C16.7928 7.98 17.0007 8.45067 17 9V19C17 19.55 16.7918 20.021 16.3753 20.413C15.9588 20.805 15.4587 21.0007 14.875 21H2.125ZM8.5 16C9.08438 16 9.58482 15.804 10.0013 15.412C10.4178 15.02 10.6257 14.5493 10.625 14C10.625 13.45 10.4168 12.979 10.0003 12.587C9.58375 12.195 9.08367 11.9993 8.5 12C7.91563 12 7.41519 12.196 6.99869 12.588C6.58219 12.98 6.37429 13.4507 6.375 14C6.375 14.55 6.58325 15.021 6.99975 15.413C7.41625 15.805 7.91634 16.0007 8.5 16ZM5.3125 7H11.6875V5C11.6875 4.16667 11.3776 3.45833 10.7578 2.875C10.138 2.29167 9.38542 2 8.5 2C7.61459 2 6.86198 2.29167 6.24219 2.875C5.6224 3.45833 5.3125 4.16667 5.3125 5V7Z"
                                fill="#292929" />
                        </svg>
                        <p>
                            end-to-end encrypted
                        </p>
                    </div>
                </div>











            }
        </div >
    )
}
export default Main;



