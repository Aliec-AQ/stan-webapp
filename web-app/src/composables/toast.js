import Toast,{ useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();

export {Toast};

export const successToast = (message) => {
    toast.success(message); 
};

export const warningToast = (message) => {
    toast.warning(message);
};

export const errorToast = (message) => {
    toast.error(message);
};

export const infoToast = (message) => {
    toast.info(message);
}