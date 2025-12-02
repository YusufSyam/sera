import { Dialog } from "@/components/ui/dialog";
import { IModalPropsType } from "./Modal.types";

const Modal = ({ className, children }: IModalPropsType) => {
  return <Dialog>{children}</Dialog>;
};

export default Modal;
