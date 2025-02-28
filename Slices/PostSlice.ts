import { api } from "@/Services/api";  // Your Axios instance
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postModel}  from "@/Model/PostModel";  // Assuming you have a PostModel for typing

const initialState: {
    posts: postModel[];
    loading: boolean;
    error: string;
} = {
    posts: [],
    loading: false,
    error: "",
};

// Type for PostRootState (to type-check the global state)
export type PostRootState = {
    post: {
        posts: postModel[];
        loading: boolean;
        error: string;
    };
};

// Thunks to handle async actions
export const fetchPosts = createAsyncThunk("post/getPost", async () => {
    try {
        const response = await api.get("/post/getPost");
        return response.data;
    } catch (e) {
        throw e;
    }
});

export const createPost = createAsyncThunk(
    "posts/createPost",
    async (post: postModel) => {
        try {
            const response = await api.post("/post/savePost", post);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId: number) => {
        try {
            await api.delete(`/post/deletePost`,{
                    params: {id: postId }
            });
            return postId; // return the postId to delete from state
        } catch (e) {
            throw e;
        }
    }
);
export const getAllPosts =createAsyncThunk(
    "posts/getAllPosts",
    async () => {
        try {
            const response = await api.get("/post/getPost");
            return response.data;
            await fetchPosts()
        } catch (e) {
            throw e;
        }
    }
)

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch posts
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                console.log("Hellow Motherererer:::  "+action.payload);
                state.loading = false;
                state.error = "";
            })
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = "Failed to fetch posts.";
                console.error(action.error.message);
            })

            // Create post
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
                state.loading = false;
                state.error = "";
            })
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = "Failed to create post.";
                console.error(action.error.message);
            })

            // Delete post
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post.id !== action.payload);
                state.loading = false;
                state.error = "";
            })
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = "";

            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = "Failed to delete post.";
                console.error(action.error.message);
            });
    },
});

// Exporting postSlice reducer
export default postSlice.reducer;
