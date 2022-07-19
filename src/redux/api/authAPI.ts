import { RootState } from "./../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export const authAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://travel-app-api.glitch.me/api/v1/auth/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserResponse, RegisterRequest>({
      query(credentials) {
        return {
          url: "sign-up",
          method: "POST",
          body: credentials,
        };
      },
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authAPI;
