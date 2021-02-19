export default function CanvasNote(props) {

    const {noteProps, onClickFunction, onUnclickFunction} = props;

    const noteStyle = {
        position: "absolute",
        left: noteProps.x+"px",
        top: noteProps.y+"px",
        width: noteProps.width+"px",
        height: noteProps.height+"px",
    };
    const resizeButtonStyle = {
        position: "absolute",
        bottom: "0",
        right: "0",
    }

    const onMouseDown = (e) => {
        //console.log(noteProps.key);
        let event = "";
        if(e.pageX > noteProps.x + noteProps.width - 10 && e.pageY > noteProps.y + noteProps.height - 10) {
            event = "resize";
        } else {
            event = "move";
        }
        onClickFunction(noteProps.key, e.pageX, e.pageY, event);
    }
    const onMouseUp = (e) => {
        console.log("Mouse Up on Note"+noteProps.key);
        onUnclickFunction();
    }

    return (
        <div 
            className="note-holder"
            style={noteStyle}
            onMouseDown={(e) => onMouseDown(e)}
            onMouseUp={onMouseUp}>

            <div className="note">
                Note {noteProps.key}
                {/*<button 
                    style={resizeButtonStyle}
                    onMouseDown={(e) => onMouseDown(e, "resize")}
                onMouseUp={onMouseUp}></button>*/}
                <div className="resize-button"></div>
            </div>
        </div>
    );
}