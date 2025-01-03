import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const REVIEW_API = "http://localhost:8080/api/v1/review";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: REVIEW_API,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ description, rating, courseId }) => ({
        url: `/${courseId}`,
        method: "POST",
        body: { description, rating },
      }),
      invalidatesTags: ["Reviews"],
    }),
    getReviewsByCourse: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    deleteReviewById: builder.mutation({
        query: (reviewId) => ({
          url: `/${reviewId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Reviews"],
      }),
  }),
});
export const {
  useCreateReviewMutation,
  useGetReviewsByCourseQuery,
  useDeleteReviewByIdMutation,
} = reviewApi;
