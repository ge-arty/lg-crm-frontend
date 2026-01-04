import { create } from "zustand";

import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "promoter" | "admin";
  profilePic?: string;
  daysOff: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

interface IAuthStore {
  authUser: IUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;

  // Promoters list (без ошибок/лишних флагов)
  promoters: IUser[];

  checkAuth: () => Promise<void>;
  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    daysOff: string[];
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { profilePic: string }) => Promise<void>;

  fetchPromoters: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  promoters: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in auth check:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error in signup:", error);
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message || "Signup failed");
      } else {
        toast.error("An error occurred during signup");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error in login:", error);
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("An error occurred during login");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in update profile:", error);
      toast.error("Error while updating profile picture");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  fetchPromoters: async () => {
    try {
      const res = await axiosInstance.get("/promoters/get-promoters");
      set({ promoters: res.data });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch promoters";
      console.error("Error fetching promoters:", errorMessage);
      toast.error(errorMessage);
    }
  },
}));
