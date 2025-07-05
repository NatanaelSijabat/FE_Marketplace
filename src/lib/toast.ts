import { toast } from "sonner";

export const notifSucces = (title: string, description?: string) => {
  toast(title, {
    description,
    duration: 3000,
  });
};

export const notifError = (title: string, description?: string) => {
  toast(title, {
    description,
    duration: 3000,
  });
};