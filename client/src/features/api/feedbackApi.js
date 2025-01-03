import { apiSlice } from "./apiSlice";

export const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postFeedback: builder.mutation({
      query: ({ courseId, feedback }) => ({
        url: `/feedback/${courseId}`,
        method: "POST",
        body: feedback,
      }),
    }),
    getFeedbacks: builder.query({
      query: (courseId) => `/feedback/${courseId}`,
    }),
  }),
});

export const { usePostFeedbackMutation, useGetFeedbacksQuery } = feedbackApi;
