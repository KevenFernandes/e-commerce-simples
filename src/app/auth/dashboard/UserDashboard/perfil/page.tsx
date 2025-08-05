import { EnderecoForm } from "@/components/EnderecoForm";
import { PerfilForm } from "@/components/PerfilForm";
import { getUser } from "@/libs/dal/dal";
import { userRepository } from "@/repository/user-repository";
import { redirect } from "next/navigation";

export default async function PefilPage() {
  const user = await getUser();
  const idUser = user?.idusuario;

  if (!idUser) redirect("/auth/login");

  const perfil = await userRepository.findByIdPerfil(idUser);
  const endereco = await userRepository.findByIdEndereco(idUser);

  return (
    <section className="w-full h-screen">
      <h1 className="text-center py-4 text-xl text-zinc-700">
        Informações do usuário
      </h1>

      <PerfilForm data={perfil} />
      <EnderecoForm data={endereco} />
    </section>
  );
}
