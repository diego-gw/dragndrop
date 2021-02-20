export default function CanvasNote(props) {

    const {noteProps, onClickFunction, onUnclickFunction} = props;

    const noteStyle = {
        position: "absolute",
        left: noteProps.x+"px",
        top: noteProps.y+"px",
        width: noteProps.width+"px",
        height: noteProps.height+"px",
    };
    const titleHolderStyle = {
        width: (noteProps.width-20)+"px",
        height: "15px",
        display: (noteProps.width > 30 && noteProps.height > 15 ? "block" : "none"),
    };
    const titlePlaceHolder = `Note ${noteProps.key}`
    const noteContentStyle = {
        width: (noteProps.width-20)+"px",
        height: (noteProps.height-30)+"px",
        display: (noteProps.width > 50 && noteProps.height > 42 ? "block" : "none"),
    };

    const onMouseDown = (e) => {
        //console.log(noteProps.key);
        let event = "";
        if(e.pageX > noteProps.x + noteProps.width - 10 && e.pageY > noteProps.y + noteProps.height - 10) {
            event = "resize";
        } else if (e.pageX > noteProps.x + noteProps.width - 10 && e.pageY < noteProps.y + 10) {
            event = "delete";
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
                <input type="text" className="note-title" placeholder={titlePlaceHolder} style={titleHolderStyle} ></input>
                <textarea className="note-content" placeholder="Content" style={noteContentStyle} />
                
                <div className="delete-button"></div>
                <div className="resize-button"></div>
            </div>
        </div>
    );
}