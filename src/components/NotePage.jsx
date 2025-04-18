import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import NoteList from "./NoteList";
import { useDispatch, useSelector } from "react-redux";
import { addNoteThunk, getAllNotesThunk } from "../Redux/noteSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ReactBootstrap from "react-bootstrap";

const NotePage = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = React.useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const hm = useSelector((state) => state.note);
   console.log("checking for hm data selector notePage",hm);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user.accessToken);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    setNotes(hm.notes);
  }, [hm]);
  console.log(notes, "notes");
  const userData = {
    title,
    content,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(title && content)) {
      toast.error(`Please enter something to add a note`, {
        position: "top-right",
        // theme: "DARK",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    dispatch(addNoteThunk(userData)).then((res) => {
      console.log(res);
      if (res.payload.data.success) {
        toast.success(`${res.payload.data.msg}`, {
          position: "top-right",
          // theme: "DARK",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setContent("");
        setTitle("");
      }

      setOpen(false);

      const currentNote = {
        title: title,
        content: content,
        _id: 1,
      };

      setNotes([currentNote, ...notes]);
      return res;
    });
  };

  useEffect(() => {
    setLoading(hm.isLoading);
  }, [hm]);

  useEffect(() => {
    dispatch(getAllNotesThunk());
  }, []);

  return (
    <>
      {/* create note */}
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          alignItems: "center",
          backgroundColor: "gold",
          justifyContent: "center",
          display: "flex",
          textAlign: "center",
          marginBottom: "3vw",
          color: "black",
          // position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        CREATE NEW NOTE
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <div className="dialog-class">
          <DialogTitle fontSize={"20px"}> NEW NOTE</DialogTitle>
          <form className="form-class" onSubmit={handleSubmit}>
            <label className="label-class">Title</label>
            <input
              type="text"
              id="input-class"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="label-class">Description</label>
            <textarea
              id="desc-class"
              rows={5}
              placeholder="Enter description "
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit" className="add">
              ADD
            </button>
            {loading ? (
              <div className="loading-overlay">
                <ReactBootstrap.Spinner
                  animation="border"
                  className="spinner"
                  variant="success"
                />
              </div>
            ) : null}
          </form>
        </div>
      </Dialog>
      <NoteList notes={notes} />
      <ToastContainer />
    </>
  );
};

export default NotePage;