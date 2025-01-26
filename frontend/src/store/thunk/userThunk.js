import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterThunk = createAsyncThunk(
  "register/RegisterThunk",
  async ({ formdata }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/users/register`,
        formdata
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "register/loginThunk",
  async ({ formdata }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/users/login`,
        formdata
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
