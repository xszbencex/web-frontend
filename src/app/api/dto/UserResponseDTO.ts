import {Roles} from "../../config/Roles";

export type UserResponseDTO = {
  id: number;
  username: string;
  email: string;
  roles: Roles[];
}
