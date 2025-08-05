export type RoleProps = "admin" | "client" | null;

export type AdminUserProps = {
  idusuario: number;
  username: string;
  role: RoleProps;
};

export interface IUseAdmin {
  findAllUsers(): Promise<AdminUserProps[]>;
  changeRoleUser(id: number, role: RoleProps): Promise<void>;
}
