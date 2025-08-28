import { useEffect, useState } from "react";
// import {fakeData as notes} from '../assets/fakeData.js'
import NoteCard from "../components/NoteCard.jsx";
import { databases } from "../appwrite/config.js";

function NotesPage() {
  const [notes, setNotes] = useState([]);

  const init = async () => {
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_NOTES_ID
    );
    console.log(response);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      {notes.map((note) => {
        return (
          <div>
            <NoteCard key={note.$id} note={note} />
          </div>
        );
      })}
      {}
    </div>
  );
}

export default NotesPage;
