import Swal from "sweetalert2";

const notifError = (msg: string) => {
  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    color: "#ffffff",
    background: "#EA4654",
    icon: "error",
    cancelButtonColor: "#ffffff",
  });
  toast.fire({
    title: msg,
  });
};

const notifWarning = (msg: string, timer: number = 5000) => {
  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: timer,
    showCloseButton: true,
    color: "#ffffff",
    background: "#f09000",
    cancelButtonColor: "#ffffff",
  });
  toast.fire({
    title: msg,
  });
};

const notifSucces = (msg: string) => {
  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    color: "#ffffff",
    background: "#28a745",
    icon: "success",
    cancelButtonColor: "#ffffff",
  });
  toast.fire({
    title: msg,
  });
};

const notifDialog = (msg: string) => {
  const toast = Swal.mixin({
    width: "100%",
    toast: true,
    position: "top",
    showCloseButton: true,
    color: "#ffffff",
    background: "#f09000",
    icon: "info",
    cancelButtonColor: "#ffffff",
  });
  toast.fire({
    title: msg,
  });
};

export { notifError, notifSucces, notifWarning, notifDialog };
