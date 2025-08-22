import { useEffect, useRef, useState } from "react";
import Trash from "../icons/Trash";

function NoteCard({ note }) {
  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef();

  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  const textAreaRef = useRef();

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = `${current.scrollHeight}px`;
  }

  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  const mouseMove = (e) => {
    let mouseMoveDir = {
        x: mouseStartPos.x - e.clientX,
        y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDir.x,
      y: cardRef.current.offsetTop - mouseMoveDir.y,
    })
  }

  const mouseUp = (e) => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard;
