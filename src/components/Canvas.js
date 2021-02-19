import { useState } from "react";
import CanvasNote from "./CanvasNote";

export default function Canvas() {

    const [numberOfNotes, setNumberOfNotes] = useState(0);

    const defaultNoteWidth = 200; //px
    const defaultNoteHeight = 100; //px

    const notesPropsArray = [];
    const testNote1 = {
        key: numberOfNotes,
        x:800,
        y: 100,
        width: defaultNoteWidth,
        height: defaultNoteHeight,
    };
    setNumberOfNotes(1);
    const testNote2 = {
        key: numberOfNotes,
        x: 0,
        y: 100,
        width: defaultNoteWidth,
        height: defaultNoteHeight,
    };
    setNumberOfNotes(2);

    notesPropsArray.push(testNote1);
    notesPropsArray.push(testNote2);

    const createNote = (e) => {
        console.log("clicked");
        
        const newNoteProps = {
            key: numberOfNotes+1,
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
            width: defaultNoteWidth,
            height: defaultNoteHeight,
        };
        setNumberOfNotes(numberOfNotes+1);
        notesPropsArray.push(newNoteProps);
        console.log(notesPropsArray);
    }

    return (
        <div className="canvas-holder">
            <div className="canvas" onMouseDown={createNote}>
                Canvas of {numberOfNotes} notes:
                {notesPropsArray.map((noteProps) => <CanvasNote key={noteProps.key} noteProps={noteProps}/>)}
                {/*<CanvasNote noteProps={testNote}/>*/}
            </div>
        </div>
    );
}