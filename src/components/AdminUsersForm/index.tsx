"use client";

import { userAdminAction } from "@/actions/adminPerfil/usersAdminAction";
import { AdminUserProps } from "@/repository/userAdmin-interface";
import clsx from "clsx";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OnlyAdminUsers } from "../OnlyAdminUsers";

type AdminUsersFormProps = {
  usersAdmin: AdminUserProps[];
};

export function AdminUsersForm({ usersAdmin }: AdminUsersFormProps) {
  const [users, setUsers] = useState(usersAdmin);

  const initialState = {
    errors: [],
    success: false,
    updated: undefined,
  };

  const [state, action] = useActionState(userAdminAction, initialState);

  useEffect(() => {
    toast.dismiss();
    if (state.errors) {
      state.errors.forEach((err) => toast.error(err));
    } else if (!state.success) {
      toast.error("Não foi possível salvar a mudança.");
    } else {
      toast.success("Mudança salva com sucesso");
      if (state.updated) {
        setUsers((users) =>
          users.map((user) =>
            user.idusuario === state.updated?.idusuario
              ? { ...user, role: state.updated.role }
              : user
          )
        );
      }
    }
  }, [state]);

  return (
    <div className={clsx("bg-zinc-400 p-6 w-80 mx-4 rounded-sm")}>
      <div className={clsx("")}>
        <form action={action} className={clsx("flex flex-col gap-4")}>
          {users.map((user) => {
            return (
              <div
                key={`${user.username}${user.idusuario}`}
                className={clsx(
                  "flex justify-between items-center",
                  "border border-zinc-800 rounded-md",
                  "px-2 py-1"
                )}
              >
                <OnlyAdminUsers
                  id={user.idusuario}
                  username={user.username}
                  role={user.role ? user.role : "client"}
                />
              </div>
            );
          })}
          <div className="w-full flex justify-end">
            <button
              className={clsx(
                "bg-blue-600 px-4 py-2 rounded-md",
                "cursor-pointer hover:bg-blue-700"
              )}
              type="submit"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
