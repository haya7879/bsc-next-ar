import { create } from "zustand";

interface Course {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  code?: string;
  duration?: number;
  category?: {
    id: number;
    title: string;
    slug: string;
  };
}

interface Timing {
  id: number;
  start_date: string;
  end_date: string;
  fees: string;
  duration: number;
  city_id: number;
  city?: {
    id: number;
    title: string;
    slug: string;
  };
}

interface DownloadPopupState {
  isOpen: boolean;
  course: Course | null;
  timing: Timing | null;
  openPopup: (course: Course, timing: Timing) => void;
  closePopup: () => void;
}

export const useDownloadPopupStore = create<DownloadPopupState>((set) => ({
  isOpen: false,
  course: null,
  timing: null,
  openPopup: (course, timing) => set({ isOpen: true, course, timing }),
  closePopup: () => set({ isOpen: false, course: null, timing: null }),
}));

