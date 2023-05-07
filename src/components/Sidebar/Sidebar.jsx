
import React from "react";
// import sidebar module from css
import Styles from "../Sidebar/Sidebar.module.css"

// passing states to sidebar function

function Sidebar({ setcreateButtonClick, mynotes, focusNote, setFocusNote }) {
    // Sidebar component for displaying a list of user notes and a button to create new notes

    // Render the sidebar UI
    return (
        <div className={Styles.sidebarContainer}>
            {/* adding styles to sidebar container */}

            <h3>Pocket Notes</h3>
            
            {/* Create Button */}
            <div style={{}} className={Styles.btn}>
                <label onClick={() => setcreateButtonClick(true)}>+ Create Notes</label>
            </div>

            {/* adding styles to classname */}

            <div className={Styles.notesProfileContainer} >

                {/* User Notes  Profile Here */}
                {mynotes.map((note, index) => {
                    return (
                        <div key={index} className={Styles.notesProfile}
                        // focus note and return it to mynotes 
                            style={note.id === focusNote ? { backgroundColor: "#F7ECDC" } : { backgroundColor: "" }}
                            onClick={() => setFocusNote(note.id)}>

                            {/* Display the first letter of each word in the note title as a colored icon */}
                            <h5 style={{ backgroundColor: note.color }}>{note.title.charAt(0) + note.title.charAt(note.title.indexOf(" ") + 1)}</h5>
                            {/* Display the note title */}
                            <p>{note.title}</p>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}
export default Sidebar;
