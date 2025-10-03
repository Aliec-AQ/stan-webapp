import Toast,{ useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();

export {Toast};

export const successToast = (message: string) => {
    toast.success(message); 
};

export const warningToast = (message: string) => {
    toast.warning(message);
};

export const errorToast = (message: string) => {
    toast.error(message);
};

export const infoToast = (message: string) => {
    toast.info(message);
}