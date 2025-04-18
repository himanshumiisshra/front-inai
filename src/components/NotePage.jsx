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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { notes, isLoading } = useSelector((state) => state.note);

  useEffect(() => {
    dispatch(getAllNotesThunk());
  }, [dispatch]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please enter both title and content", {
        position: "top-right",
        autoClose: 5000,
        draggable: true,
      });
      return;
    }

    const userData = { title, content };

    dispatch(addNoteThunk(userData)).then((res) => {
      if (res.payload?.data?.success) {
        toast.success(res.payload.data.msg, {
          position: "top-right",
          autoClose: 5000,
          draggable: true,
        });
        setTitle("");
        setContent("");
        setOpen(false);
      }
    });
  };

  return (
    <>
      {/* CREATE NOTE BUTTON */}
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          backgroundColor: "gold",
          color: "black",
          marginBottom: "3vw",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        CREATE NEW NOTE
      </Button>

      {/* CREATE NOTE DIALOG */}
      <Dialog open={open} onClose={handleClose}>
        <div className="dialog-class">
          <DialogTitle fontSize="20px">NEW NOTE</DialogTitle>
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
              placeholder="Enter description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit" className="add">
              ADD
            </button>
            {loading && (
              <div className="loading-overlay">
                <ReactBootstrap.Spinner
                  animation="border"
                  className="spinner"
                  variant="success"
                />
              </div>
            )}
          </form>
        </div>
      </Dialog>

      {/* NOTE LIST DISPLAY */}
      <NoteList notes={notes} />
      <ToastContainer />
    </>
  );
};

export default NotePage;
