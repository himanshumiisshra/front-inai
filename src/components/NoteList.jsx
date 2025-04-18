import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ notes }) => {
  // console.log(notes);
  return (
    <>
      <div className="note-list">
        <div className="note-class">
          {notes &&
            notes.map((note) => {
              {
                console.log(note);
              }

              return (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  content={note.content}
                  noteId={note._id}
                  id={note._id}
                  noteID={note._id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default NoteList;