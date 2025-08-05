"use client";

import { imageAction } from "@/actions/product/imageAction";
import clsx from "clsx";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

export function ImageUploader({ disabled }: { disabled: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [transition, startTransition] = useTransition();
  const [image, setImage] = useState("");

  function handleChooseFile() {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!inputRef.current) {
      setImage("");
      return;
    }

    const fileInput = inputRef.current;
    const file = fileInput.files?.[0];

    if (!file) {
      setImage("");
      return;
    }

    const maxSizeImage = 921600;
    if (file.size > maxSizeImage) {
      toast.dismiss();
      const maxSize = (maxSizeImage / 1024).toFixed(2);
      toast.error(`O tamanho da imagem passou dos ${maxSize}`);
      fileInput.value = "";
      setImage("");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const imageUrl = await imageAction(formData);

      if (imageUrl.error) {
        toast.dismiss();
        toast.error(imageUrl.error);
        fileInput.value = "";
        return;
      }
      setImage(imageUrl.url);
      toast.success("Imagem salva com sucesso");
    });
  }

  return (
    <div>
      {!!image && (
        <div className="mb-4">
          <div className="w-40 h-40 overflow-hidden flex items-center justify-center my-4 rounded-md">
            {/* eslint-disable-next-line */}
            <img src={image} alt="Imagem enviada pelo admin" />
          </div>
          <div>
            <p>URL: {image}</p>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleChooseFile}
        className={clsx(
          "bg-zinc-600 px-2 py-1",
          "rounded-sm text-zinc-50 cursor-pointer",
          "hover:bg-zinc-700"
        )}
        disabled={disabled || transition}
      >
        Buscar Imagem
      </button>
      <input
        ref={inputRef}
        onChange={handleChange}
        disabled={disabled || transition}
        type="file"
        name="file"
        id="file"
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
