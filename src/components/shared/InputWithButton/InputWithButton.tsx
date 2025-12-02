"use client";

import { IconArrowUp } from "@tabler/icons-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import TextareaAutoSize from "react-textarea-autosize";

const InputWithButton = () => {
  return (
    <div className="px-12  w-full left-0 sticky">
      <InputGroup>
        <TextareaAutoSize
          className="border-0 resize- bg-transparent px-3 py-2.5 text-base outline-none md:text-sm w-full min-h-16"
          placeholder="Silahkan berikan saya perintah"
        />
        <InputGroupAddon align={"block-end"} aria-label="Submit">
          <InputGroupButton
            size={"sm"}
            className="ml-auto bg-linear-to-bl from-[#01AFFF] to-[#006AFF]  text-white"
          >
            <IconArrowUp className="text-4xl " />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default InputWithButton;
