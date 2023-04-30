import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.time.localeCompare(a.time),
});
const initialState = postsAdapter.getInitialState();

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData) => {
        const fetchedPosts = responseData.map((post) => {
          post.id = post._id;

          return post;
        });

        return postsAdapter.setAll(initialState, fetchedPosts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Post", id: id })),
          ];
        } else return [{ type: "Post", id: "LIST" }];
      },
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...body,
          time: new Date().toISOString(),
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "PATCH",
        body: {
          ...body,
        },
      }),
      async onQueryStarted(
        { id, reaction, comment },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postsApiSlice.util.updateQueryData(
            "getPosts",
            "getPosts",
            (draft) => {
              if (reaction) draft.entities[id].reactions = reaction;
              if (comment) {
                draft.entities[id].comments.unshift(comment);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: "/posts",
        method: "DELETE",
        body: { id },
      }),
      // invalidatesTags: () => [{ type: "Post", id: "LIST" }],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApiSlice.util.updateQueryData(
            "getPosts",
            "getPosts",
            (draft) => {
              draft.ids = draft.ids.filter((postId) => postId !== id);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddPostMutation,
  useGetPostsQuery,
} = postsApiSlice;
