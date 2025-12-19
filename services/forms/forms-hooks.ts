import { useMutation } from "@tanstack/react-query";
import {
  formsServices,
  ContactFormData,
  EnquireFormData,
  RegisterFormData,
  JoinTeamFormData,
  DownloadFormData,
  FormResponse,
} from "./forms-services";
import { toast } from "sonner";

/**
 * Hook for submitting contact form
 */
export const useContactForm = () => {
  return useMutation<FormResponse, Error, ContactFormData>({
    mutationFn: (data: ContactFormData) => formsServices.contact(data),
    onSuccess: (data) => {
      toast.success("تم الإرسال بنجاح", {
        description: data.message || "تم إرسال رسالتك بنجاح.",
      });
    },
    onError: (error: Error) => {
      toast.error("خطأ", {
        description: error.message || "حدث خطأ. يرجى المحاولة مرة أخرى.",
      });
      console.error(error);
    },
  });
};

/**
 * Hook for submitting enquire form
 */
export const useEnquireForm = () => {
  return useMutation<FormResponse, Error, EnquireFormData>({
    mutationFn: (data: EnquireFormData) => formsServices.enquire(data),
    onSuccess: (data) => {
      toast.success("تم الإرسال بنجاح", {
        description:
          data.message || "تم إرسال استفسارك بنجاح.",
      });
    },
    onError: (error: Error) => {
      toast.error("خطأ", {
        description: error.message || "حدث خطأ. يرجى المحاولة مرة أخرى.",
      });
      console.error(error);
    },
  });
};

/**
 * Hook for submitting register form
 */
export const useRegisterForm = () => {
  return useMutation<FormResponse, Error, RegisterFormData>({
    mutationFn: (data: RegisterFormData) => formsServices.register(data),
    onSuccess: (data) => {
      toast.success("تم الإرسال بنجاح", {
        description:
          data.message || "تم إرسال تسجيلك بنجاح.",
      });
    },
    onError: (error: Error) => {
      toast.error("خطأ", {
        description: error.message || "حدث خطأ. يرجى المحاولة مرة أخرى.",
      });
      console.error(error);
    },
  });
};

/**
 * Hook for submitting join-team form
 */
export const useJoinTeamForm = () => {
  return useMutation<FormResponse, Error, JoinTeamFormData>({
    mutationFn: (data: JoinTeamFormData) => formsServices.joinTeam(data),
    onSuccess: (data) => {
      toast.success("تم الإرسال بنجاح", {
        description:
          data.message ||
          "تم إرسال طلبك بنجاح. سنتواصل معك قريباً!",
      });
    },
    onError: (error: Error) => {
      toast.error("خطأ", {
        description: error.message || "حدث خطأ. يرجى المحاولة مرة أخرى.",
      });
      console.error(error);
    },
  });
};

/**
 * Hook for submitting download form
 */
export const useDownloadForm = () => {
  return useMutation<FormResponse, Error, DownloadFormData>({
    mutationFn: (data: DownloadFormData) => formsServices.download(data),
    onSuccess: (data) => {
      toast.success("تم الإرسال بنجاح", {
        description:
          data.message || "تم إرسال طلبك بنجاح.",
      });
    },
    onError: (error: Error) => {
      toast.error("خطأ", {
        description: error.message || "حدث خطأ. يرجى المحاولة مرة أخرى.",
      });
      console.error(error);
    },
  });
};

