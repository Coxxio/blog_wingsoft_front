import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPost = createAsyncThunk(
  "Post/fetchPost",
  async (data, { rejectWithValue }) => {
    if (data) {
      if (data.category) {
        return await axios
          .get(`post?category=${data.category}&limit=${data.limit}&page=${data.page}`)
          .then((response) => {
            return response.data;
          })
          .catch((err) => {
            return rejectWithValue(err);
          });
      } else if (data.page) {
        return await axios
          .get(`post?limit=${data.limit}&page=${data.page}`)
          .then((response) => {
            return response.data;
          })
          .catch((err) => {
            return rejectWithValue(err);
          });
      }
    } else {
      return await axios
        .get(`post`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          return rejectWithValue(err);
        });
    }
  }
);

export const getOnePost = createAsyncThunk(
  "Post/getPost",
  async (id, { rejectWithValue }) => {
    return await axios
      .get(`post/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const postPost = createAsyncThunk(
  "Post/postPost",
  async (form, { rejectWithValue }) => {
    return await axios
      .post("post/", form)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const putPost = createAsyncThunk(
  "Post/putPost",
  async (form, { rejectWithValue }) => {
    return await axios
      .put(`post/${form.id}`, form)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const deletePost = createAsyncThunk(
  "Post/deletePost",
  async (form, { rejectWithValue }) => {
    return await axios
      .delete(`post/${form.id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
