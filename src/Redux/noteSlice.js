import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  notes: [],
  response1: "",
  response2: "",
};

export const addNoteThunk = createAsyncThunk(
  "notes/createNote",
  async (data) => {
    const userInfo = localStorage.getItem("userInfo");
    const user = userInfo ? JSON.parse(userInfo) : null;
    // console.log(user.accessToken);
    
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    const payload = {
      ...data,
      userId: user.id,
    };

    return await Api.post(`notes/create_note`, payload, config)
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);

export const getAllNotesThunk = createAsyncThunk(
  "notes/get_Notes",
  async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    console.log("userData from local storrage",user)
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
        userid: `${user.id}`
      },
    };

    return await Api.get(`notes/get_Notes`, config)
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);

export const editNoteThunk = createAsyncThunk(
  "notes/edit_note",
  async (data) => {
    console.log("checking for data ",data)
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post(`notes/edit_note`, data, config)
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);

export const deleteNoteThunk = createAsyncThunk(
  "notes/delete_note",
  async (noteID) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    // console.log(noteID);
    // console.log(`notes/delete_note/${noteID}`);
    return await Api.delete(`notes/delete_note/${noteID}`, config)
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addNoteThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNoteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.response1 = action.payload.data.msg;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(addNoteThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(getAllNotesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNotesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.notes = action.payload.data.allNotes;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(getAllNotesThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(editNoteThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editNoteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          // state.notes = action.payload.data.allNotes;

          const note = state.notes.findIndex(
            (n) => n._id == action.payload.data.note._id
          );
          state.notes[note] = action.payload.data.note;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(editNoteThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(deleteNoteThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.notes = state.notes.filter((s) => {
            return s._id != action.payload.data.noteId;
          });
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(deleteNoteThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default noteSlice.reducer;