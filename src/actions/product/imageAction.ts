"use server";

import { verifySession } from "@/libs/dal/dal";
import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

type ImageActionType = {
  url: string;
  error: string;
};

export async function imageAction(
  formData: FormData
): Promise<ImageActionType> {
  const makeResult = ({ url = "", error = "" }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Dados inválidos" });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo inválido" });
  }

  const maxSizeImage = 921600;
  if (file.size > maxSizeImage) {
    return makeResult({ error: "Arquivo muito grande" });
  }

  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    return makeResult({ error: "Faça o login para continuar" });
  }

  if (!file.type.startsWith("image/")) {
    return makeResult({ error: "Tipo de arquivo não suportado" });
  }

  const extension = extname(file.name);
  const uniqueName = `${Date.now()}${extension}`;

  const uploadDir = "uploads";
  const uploadFullPath = resolve(process.cwd(), "public", uploadDir);

  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueName);

  await writeFile(fileFullPath, buffer);

  const imageServerUrl = "http://localhost:3000/uploads";
  const url = `${imageServerUrl}/${uniqueName}`;

  return makeResult({ url: url });
}
