// importing side bar
import Sidebar from "./components/Sidebar/Sidebar";
// importing main page
import Main from "./components/Main/Main";
// using useeffect and usestate
import { useEffect, useState } from "react";
// import styles form module css
import Styles from "./App.module.css";

function App() {
  // Main application component that manages state and renders the sidebar and main components

  // Array of predefined colors for note backgrounds
  const colors = [
    { id: 3, name: "#43E6FC", color: "#43E6FC" },
    { id: 1, name: "#B38BFA", color: "#B38BFA" },
    { id: 6, name: "#6691FF", color: "#6691FF" },
    { id: 4, name: "#F19576", color: "#F19576" },
    { id: 2, name: "#FF79F2", color: "#FF79F2" },
    { id: 5, name: "#0047FF", color: "#0047FF" },
  ];

  // State management
  const [mynotes, setMyNotes] = useState(localStorage.mynotes ? JSON.parse(localStorage.mynotes) : []) // List of user notes
  const [focusNote, setFocusNote] = useState(localStorage.focusNoteId ? JSON.parse(localStorage.focusNoteId) : false) // Active Note
  const [createButtonClick, setcreateButtonClick] = useState(false); // Create Button
  // setting color and title and using usestate
  const [color, setColor] = useState() // Color for new note
  // using title and adding it as title
  const [title, setTitle] = useState() // Title for new note

  // Function to add a new note
  const addNote = () => {
    const uniqueID = Math.floor(Math.random() * 9000) + 1000  // Generate Unique Id

    // Add the new note to the list and set it as the active note
    setMyNotes((pre) => {
      return [...pre, { id: uniqueID, title: title, color: color }] // Popup container values
    })
    // focus note
    setFocusNote(uniqueID)
    // unique id 
    setcreateButtonClick(false)
  }

  // Get Active Note
  const getFocusNote = () => {
    localStorage.setItem("focusNoteId", JSON.stringify(focusNote));
    // storing locally, its local storage
    return mynotes.find((note) => note.id === focusNote)
  }

  // Save notes to local storage when notes state changes
  useEffect(() => {
    // 
    localStorage.setItem("mynotes", JSON.stringify(mynotes))
  }, [mynotes])

  // Render the main application UI
  return (
    <div className={Styles.App}>
      {/* sidebar and styles applied */}

      <Sidebar setcreateButtonClick={setcreateButtonClick} mynotes={mynotes} focusNote={focusNote} setFocusNote={setFocusNote} />
      <Main focusNote={getFocusNote()} />

      {/* Create Button Clicked */}
      {createButtonClick === true ? (
        // onbutton click
        <div id={Styles.myNav} className={Styles.overlay}>
          <div className={Styles.overlaycontent}>
            {/* add naming i.e h4 tag */}
            <h4>Create New Notes</h4>

            {/* Group Name */}
            <div className={Styles.groupName}>
              <h4>Group Name</h4>
              <input type="text" placeholder="Enter group name..." onChange={(e) => setTitle(e.target.value)} />
            </div>

            {/* Color choose */}
            <div className={Styles.colorContainer}>

              {/* choose color pop-up */}

              <h4>Choose colour</h4>
              <div className={Styles.colorsBox}>
                {/* return color box */}
                {colors.map((color, id) => {
                  return (
                    <label
                    // adding styling to choos cloour box
                      style={{ backgroundColor: color.color }}
                      key={id}
                      // adding seperate id to that box
                      name={color.name}
                      // on click and then add color
                      onClick={() => { setColor(color.name) }}
                    ></label>
                  );
                })}
              </div>
            </div>

            {/* Add Note button */}
            <div className={Styles.createNoteBtn}>
              {/* adding notebotn submit */}
              <button onClick={addNote}>Create</button>
              {/* end to div tag */}
            </div>

          </div>
        </div>
      ) : (
        ""
      )}

    </div>
  );
}

export default App;
