import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const FEEDBACK_API = "http://localhost:8080/api/v1/feedback";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  tagTypes: ["Feedbacks"],
  baseQuery: fetchBaseQuery({
    baseUrl: FEEDBACK_API,
    credentials: "include",   
  }),
  endpoints: (builder) => ({
 
    createFeedback: builder.mutation({
      query: ({ comment, rating, userId, courseId }) => ({
        url: `/${courseId}`,
        method: "POST",
        body: { comment, rating, userId },
      }),
 
      invalidatesTags: ["Feedbacks"],
    }),
 
    getFeedbacks: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Feedbacks"],
    }),
 
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetFeedbacksQuery,
} = feedbackApi;

