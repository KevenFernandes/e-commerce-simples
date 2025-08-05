import { ChangeEvent, useState } from "react";

type OnlyAdminUsersProps = {
  id: number;
  username: string;
  role: string;
};

export function OnlyAdminUsers({ id, username, role }: OnlyAdminUsersProps) {
  const [stateRole, setStateRole] = useState(role);

  function handleOptionRole(e: ChangeEvent<HTMLSelectElement>) {
    setStateRole(e.target.value);
  }

  return (
    <>
      <div>
        <p>{username}</p>
      </div>
      <div className="flex gap-2">
        <input
          type="hidden"
          id="idusuario"
          name="idusuario"
          defaultValue={id}
          readOnly={true}
        />
        <label htmlFor="role">Role:</label>
        <select
          name="role"
          id="role"
          value={stateRole}
          onChange={(e) => handleOptionRole(e)}
          className="bg-white rounded-sm cursor-pointer pl-1"
        >
          <option value="admin">admin</option>
          <option value="client">client</option>
        </select>
      </div>
    </>
  );
}
