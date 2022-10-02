import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "../api";

const initialState = {
  posts: [],
  userPosts: [],
  tagPosts: [],
  error: "",
  loading: false,
};

export const createPost: any = createAsyncThunk(
  "post/createPost",
  async (data: any, { rejectWithValue }) => {
    const { postData, navigate } = data;
    try {
      const response = await api.createPosts(postData);
      navigate("/posts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPosts: any = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.fetchPosts();
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deletePost: any = createAsyncThunk(
  "post/deletePost",
  async ({ id }: any, { rejectWithValue }) => {
    try {
      const response = await api.deletePosts(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const likePost: any = createAsyncThunk(
  "post/likePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.likePosts(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentPost: any = createAsyncThunk(
  "post/commentPost",
  async (data: any, { rejectWithValue }) => {
    const { postId, text } = data;

    try {
      const response = await api.makeComment(postId, text);
      console.log(postId, text);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost: any = createAsyncThunk(
  "post/updatePost",
  async (data: any, { rejectWithValue }) => {
    const { id, postData, navigate } = data;
    try {
      console.log(id, postData);
      const response = await api.updatePosts(id, postData);
      navigate("/posts");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPost: any = createAsyncThunk(
  "post/getPost",
  async ({ id }: any, { rejectWithValue }) => {
    try {
      const response = await api.fetchPost(id);
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostByUser: any = createAsyncThunk(
  "post/getPostByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.fetchPostsByUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostBySearch: any = createAsyncThunk(
  "post/getPostBySearch",
  async (search, { rejectWithValue }) => {
    try {
      const response = await api.fetchPostsBySearch(search);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostByTag: any = createAsyncThunk(
  "post/getPostByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.fetchPostsByTag(tag);
      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      toast.error("Only .jpg, .jpeg, .png formats are allowed");
    },
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      toast.error("Only .jpg, .jpeg, .png formats are allowed");
    },
    [getPost.pending]: (state) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPostByUser.pending]: (state) => {
      state.loading = true;
    },
    [getPostByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userPosts = action.payload;
    },
    [getPostByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getPostBySearch.pending]: (state) => {
      state.loading = true;
    },
    [getPostBySearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.data;
    },
    [getPostBySearch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getPostByTag.pending]: (state) => {
      state.loading = true;
    },
    [getPostByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.data;
    },
    [getPostByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getPostByTag.pending]: (state) => {
      state.loading = true;
    },
    [getPostByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagPosts = action.payload;
      console.log(state.tagPosts);
    },
    [getPostByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta;
      state.loading = false;
      state.posts = state.posts.filter((post) => post["_id"] !== id);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likePost.pending]: (state) => {
      state.loading = true;
    },
    [likePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.map((post) =>
        post["_id"] === action.payload._id ? action.payload : post
      );
    },
    [likePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [commentPost.pending]: (state) => {
      state.loading = true;
    },
    [commentPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.map((post) =>
        post["_id"] === action.payload._id ? action.payload : post
      );
    },
    [commentPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.map((post) =>
        post["_id"] === action.payload._id ? action.payload : post
      );
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export default postSlice.reducer;
