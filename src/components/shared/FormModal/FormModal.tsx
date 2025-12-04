import Modal from "@/components/ui/Modal/Modal";

import { IFormModalPropsType } from "./types";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FormModal = ({
  title,
  description,
  icon,
  btnText,
  children,
}: IFormModalPropsType) => {
  const Icon = icon;

  return (
    <Modal>
      <form className="">
        <DialogTrigger asChild>
          <Button className="w-fit bg-linear-to-bl from-[#01AFFF] to-[#006AFF] text-xs md:text-sm  text-white">
            {btnText}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex  items-center gap-3">
              <div className="w-fit p-2 rounded-md bg-[#C5DDFF]">
                <Icon className="text-[#006AFF] size-5 md:size-6" />
              </div>

              <div className="flex flex-col gap-1.5">
                <DialogTitle className="flex gap-2">
                  <p>{title}</p>
                </DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="w-full bg-gray-200 h-0.5"></div>

          {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>

            <Button type="submit" className="bg-[#006AFF]">
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Modal>
  );
};

export default FormModal;
