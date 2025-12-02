import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { IconArrowUp } from "@tabler/icons-react";

const InputWithButton = () => {
  return (
    <div className="flex gap-2.5">
      <Input placeholder="Silahkan berikan saya perintah" />
      <Button type="submit" size={"icon"} aria-label="Submit">
        <IconArrowUp className="text-2xl" />
      </Button>
    </div>
  );
};

export default InputWithButton;
