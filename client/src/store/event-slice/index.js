import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/events`;

const initialState = {
  events: [],
  userEvents: [],
  isLoading: false,
  error: null,
};

// 1. Upload Event
export const uploadEvent = createAsyncThunk("events/upload", async (formData) => {
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
});

// 2. Get All Events
export const getAllEvents = createAsyncThunk("events/getAll", async () => {
  const response = await axios.get(API_URL);
  console.log(response.data,"response");
  
  return response.data;
});

// 3. Get Events by User ID
export const getEventsByUserId = createAsyncThunk("events/getByUserId", async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
});

// 4. Delete Event
export const deleteEvent = createAsyncThunk("events/delete", async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return { id, message: response.data.message };
});

// 5. Update Event
export const updateEvent = createAsyncThunk("events/update", async ({ id, formData }) => {
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
});

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Upload Event
      .addCase(uploadEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events.unshift(action.payload); // add to top
      })
      .addCase(uploadEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Get All Events
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Get Events by User ID
      .addCase(getEventsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userEvents = action.payload;
      })
      .addCase(getEventsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = state.events.filter((event) => event._id !== action.payload.id);
        state.userEvents = state.userEvents.filter((event) => event._id !== action.payload.id);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;
        state.events = state.events.map((event) =>
          event._id === updated._id ? updated : event
        );
        state.userEvents = state.userEvents.map((event) =>
          event._id === updated._id ? updated : event
        );
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
