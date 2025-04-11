import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";
export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  services: null,
  singleService : null,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords Do Not Match!");
    }
    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
      toast.success(`Welcome, ${name}`);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An unexpected error occured");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
      toast.success(`Welcome ${res.data.user.name}`);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An unexpected error occured");
    }
  },

  logout: async () => {
    try {
      await axios.get("/auth/logout");
      set({ user: null });
      toast.success("Logged Out Successfully!");
    } catch (error) {
      toast.error(error.response.data.message || "An unexpected error occured");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");

      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
    }
  },

  fetchServices: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/services");
      set({ services: res.data, loading: false });
    } catch (error) {
      set({ services: null, loading: false });
      toast.error(error.response.data.message || "An unexpected error occured");
    }
  },

  fetchSingleService: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/services/${id}`);
      set({ singleService: res.data, loading: false });
    } catch (error) {
      set({ singleService: null, loading: false });
      toast.error(error.response.data.message || "An unexpected error occured");
    }
  },

 
}));
