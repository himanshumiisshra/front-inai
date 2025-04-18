import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteThunk, editNoteThunk } from "../Redux/noteSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import edit from "../Assets/edit.svg";
import del from "../Assets/bin.svg";
import * as ReactBootstrap from "react-bootstrap";

const NoteCard = ({ noteID, noteId, id, title, content }) => {
  const dispatch = useDispatch();
  const noteState = useSelector((state) => state.note);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editID, setEditID] = useState("");
  const [deleteID, setDeleteID] = useState("");

  useEffect(() => {
    setLoading(noteState.isLoading);
  }, [noteState]);

  useEffect(() => {
    if (open) {
      setEditTitle(title);
      setEditContent(content);
    }
  }, [open, title, content]);

  const handleClickOpen = () => {
    setEditID(id);
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setDeleteID(id);
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const userData = {
      title: editTitle,
      content: editContent,
      noteID: editID,
    };

    dispatch(editNoteThunk(userData)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success(res.payload.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setOpen(false);
      }
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteNoteThunk(deleteID)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success(res.payload.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setOpen2(false);
      }
    });
  };

  const handleCancelDelete = (e) => {
    e.preventDefault();
    setOpen2(false);
  };

  return (
    <div className="all-notes">
      <div className="note-card">
        <div className="btns">
          {/* EDIT NOTE */}
          <button className="edit-btn" onClick={handleClickOpen}>
            <img src={edit} alt="edit" />
          </button>

          <Dialog open={open} onClose={handleClose}>
            <div className="dialog-class">
              <DialogTitle>EDIT NOTE</DialogTitle>
              <form className="form-class" onSubmit={handleEdit}>
                <label className="label-class">Title</label>
                <input
                  type="text"
                  id="input-class"
                  placeholder="Edit title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
                <label className="label-class">Description</label>
                <textarea
                  id="desc-class"
                  rows={5}
                  placeholder="Edit description"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  required
                />
                <button type="submit" className="add" disabled={loading}>
                  {loading ? "Saving..." : "EDIT"}
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

          {/* DELETE NOTE */}
          <button className="delete-btn" onClick={handleClickOpen2}>
            <img src={del} alt="delete" />
          </button>

          <Dialog open={open2} onClose={handleClose2}>
            <div className="dialog-class">
              <form className="form-class">
                <label className="label-class">
                  Are you sure you want to delete this note?
                </label>

                <div className="two-btns">
                  <button type="submit" className="add" onClick={handleDelete}>
                    YES
                  </button>
                  <button type="button" className="add del" onClick={handleCancelDelete}>
                    NO
                  </button>
                </div>
              </form>
            </div>
          </Dialog>
        </div>

        <h2 className="note-title">{title}</h2>
        <p className="note-content">{content}</p>
      </div>
    </div>
  );
};

export default NoteCard;
