import React, { useState, useEffect } from "react";
import CanvasNote from "./CanvasNote";

class CanvasClass extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            numberOfNotes: 0,
            clickedNote: 0,
        };
        this.notesPropsArray = [];
        this.defaultWidth = 10;
        this.defaultHeight = 10;

        this.clickedNoteIndex = -1;
        this.event = "";
        this.initialX = 0;
        this.initialY = 0;
        this.initialWidth = 0;
        this.initialHeight = 0;

        this.initialCursorX = 0;
        this.initialCursorY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
    }

    createNote = (e) => {
        // loop through all notes to check it wasn't on one of them that we clicked
        for (let i = 0; i < this.notesPropsArray.length; i++) {
            const xCursor = e.pageX;
            const yCursor =e.pageY;
            const noteTested = this.notesPropsArray[i];
            const minX = noteTested.x-5;
            const minY = noteTested.y-5;
            const maxX = minX + noteTested.width+10;
            const maxY = minY + noteTested.height+10;
            // if a note is identified we directly return without doing anything
            if (xCursor >= minX && xCursor <= maxX && yCursor >= minY && yCursor <= maxY) return;
        }
        this.initialCursorX = e.pageX;
        this.initialCursorY = e.pageY;
        this.initialX = e.pageX-2;
        this.initialY = e.pageY-2;
        this.initialWidth = 15;
        this.initialHeight = 15;
        this.event= "resize";
        
        const newNoteProps = {
            key: this.state.numberOfNotes+1,
            x: e.pageX-2,
            y: e.pageY-2,
            width: this.defaultWidth,
            height: this.defaultHeight,
        };
        this.clickedNoteIndex = this.notesPropsArray.length;
        //console.log("new note: Note"+newNoteProps.key+" at x:"+newNoteProps.x+", y:"+newNoteProps.y);
        this.notesPropsArray.push(newNoteProps);
        this.setState({numberOfNotes: this.state.numberOfNotes+1});
    }

    moveNote = (e) => {
        //console.log(e.target)
        if(this.event === "move" && this.clickedNoteIndex >= 0) {
            //console.log("found note "+this.notesPropsArray[this.clickedNoteIndex].key);
            this.deltaX = e.pageX - this.initialCursorX;
            this.deltaY = e.pageY - this.initialCursorY;
            //console.log("Delta calulated dx:"+this.deltaX+", dy:"+this.deltaY);
            this.notesPropsArray[this.clickedNoteIndex].x = this.initialX + this.deltaX;
            this.notesPropsArray[this.clickedNoteIndex].y = this.initialY + this.deltaY;
            
            this.forceUpdate();
        }
        //RESIZING CODE
        if(this.event === "resize" && this.clickedNoteIndex >= 0) {
            //console.log("found note "+this.notesPropsArray[this.clickedNoteIndex].key);
            if(e.pageX > this.initialX && e.pageY > this.initialY) {
                this.deltaX = e.pageX - this.initialCursorX;
                this.deltaY = e.pageY - this.initialCursorY;
                this.notesPropsArray[this.clickedNoteIndex].width = this.initialWidth + this.deltaX;
                this.notesPropsArray[this.clickedNoteIndex].height = this.initialHeight + this.deltaY;
            } else if (e.pageX > this.initialX && e.pageY < this.initialY) {
                this.deltaX = e.pageX - this.initialCursorX;
                this.notesPropsArray[this.clickedNoteIndex].width = this.initialWidth + this.deltaX;
                this.notesPropsArray[this.clickedNoteIndex].y = e.pageY;
                this.notesPropsArray[this.clickedNoteIndex].height = this.initialY - e.pageY;
            } else if(e.pageX < this.initialX && e.pageY > this.initialY) {
                this.notesPropsArray[this.clickedNoteIndex].x = e.pageX;
                this.notesPropsArray[this.clickedNoteIndex].width = this.initialX - e.pageX;
                this.deltaY = e.pageY - this.initialCursorY;
                this.notesPropsArray[this.clickedNoteIndex].height = this.initialHeight + this.deltaY;
            }else if (e.pageX < this.initialX && e.pageY < this.initialY) {
                this.notesPropsArray[this.clickedNoteIndex].x = e.pageX;
                this.notesPropsArray[this.clickedNoteIndex].y = e.pageY;
                this.notesPropsArray[this.clickedNoteIndex].width = this.initialX - e.pageX;
                this.notesPropsArray[this.clickedNoteIndex].height = this.initialY - e.pageY;
            }
            this.forceUpdate();
        }
    }

    clickNote = (key, startingX, startingY, event) => {   
        
        this.setState({clickedNote: key});
        this.event = event;
        console.log(event);

        this.clickedNoteIndex = this.notesPropsArray.findIndex((note) => note.key === key);
        //console.log("note found at index "+this.clickedNoteIndex);
        // Initial position of the note
        this.initialX = this.notesPropsArray[this.clickedNoteIndex].x;
        this.initialY = this.notesPropsArray[this.clickedNoteIndex].y;
        // If event is resize we store the initial width and height of the note
        this.initialWidth = this.notesPropsArray[this.clickedNoteIndex].width;
        this.initialHeight = this.notesPropsArray[this.clickedNoteIndex].height;

        //console.log("Mouse Down on Note"+key+"at x:"+this.initialX+", y:"+this.initialY+" - cursor at x:"+startingX+", y:"+startingY);
        // Initial position of the mouse
        this.initialCursorX = startingX;
        this.initialCursorY = startingY;
    }
    unclickNote = () => {

        if (this.event === "delete") {
            this.notesPropsArray.splice(this.clickedNoteIndex, 1);
        }

        this.setState({clickedNote: 0});
        this.clickedNoteIndex=-1;
        
        this.event = "";
        this.initialX = 0;
        this.initialY = 0;
        this.initialWidth = 10;
        this.initialHeight = 10;
        //console.log("clicked state resetted to "+this.state.clickedNote);
    }

    render () {

        return (
            <div className="canvas-holder">
                <div 
                    className="canvas" 
                    onMouseDown={this.createNote}
                    onMouseUp={this.unclickNote}
                    onMouseMove={this.moveNote}>
                Canvas
                    {this.notesPropsArray.map((noteProps) => 
                        <CanvasNote 
                            key={noteProps.key} 
                            noteProps={noteProps} 
                            onClickFunction={this.clickNote}
                            onUnclickFunction={this.unclickNote}/>)}
                </div>
            </div>
        );
    }
}

export default CanvasClass;