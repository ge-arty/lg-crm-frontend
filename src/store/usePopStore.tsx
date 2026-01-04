import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export interface IPop {
  _id: string;
  name: string;
  description: string;
  profilePic: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface PopStore {
  pops: IPop[];
  isLoading: boolean;

  fetchPops: () => Promise<void>;
  createPop: (data: Partial<IPop>) => Promise<void>;
  updatePop: (id: string, data: Partial<IPop>) => Promise<void>;
  deletePop: (id: string) => Promise<void>;
  incrementQuantity: (id: string, amount: number) => Promise<void>;
  decrementQuantity: (id: string, amount: number) => Promise<void>;
  exportExcel: () => Promise<void>;
}

export const usePopStore = create<PopStore>((set, get) => ({
  pops: [],
  isLoading: false,

  fetchPops: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/pop");
      set({ pops: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch POPs");
    } finally {
      set({ isLoading: false });
    }
  },

  createPop: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/pop", data);
      set({ pops: [res.data.pop, ...get().pops] });
      toast.success("POP created successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create POP");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updatePop: async (id, data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/pop/${id}`, data);
      set({
        pops: get().pops.map((p) => (p._id === id ? res.data.pop : p)),
      });
      toast.success("POP updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update POP");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deletePop: async (id) => {
    try {
      await axiosInstance.delete(`/pop/${id}`);
      set({ pops: get().pops.filter((p) => p._id !== id) });
      toast.success("POP deleted successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete POP");
      throw error;
    }
  },

  incrementQuantity: async (id, amount) => {
    try {
      const res = await axiosInstance.patch(`/pop/${id}/increment`, { amount });
      set({
        pops: get().pops.map((p) => (p._id === id ? res.data.pop : p)),
      });
      toast.success(`Quantity increased by ${amount}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to increment");
      throw error;
    }
  },

  decrementQuantity: async (id, amount) => {
    try {
      const res = await axiosInstance.patch(`/pop/${id}/decrement`, { amount });
      set({
        pops: get().pops.map((p) => (p._id === id ? res.data.pop : p)),
      });
      toast.success(`Quantity decreased by ${amount}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to decrement");
      throw error;
    }
  },

  exportExcel: async () => {
    try {
      toast.loading("Generating Excel file...", { id: "export-excel" });

      const response = await axiosInstance.get("/pop/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const fileName = `POP_Materials_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Excel exported successfully!", { id: "export-excel" });
    } catch (error: any) {
      console.error("Export error raw:", error);

      if (error.response?.data) {
        const blob = error.response.data as Blob;
        try {
          const text = await blob.text();
          console.error("Backend error body:", text);
        } catch (e) {
          console.error("Cannot read error blob:", e);
        }
      }

      toast.error("Failed to export Excel", { id: "export-excel" });
    }
  },
}));
