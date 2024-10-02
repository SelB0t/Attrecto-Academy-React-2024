import { UserModel } from "../models/user.model";
import request, { Methods } from "../util/request";

class UserService {
  async getUsers() {
    return request<UserModel[]>({ method: Methods.GET, resource: "users" });
  }
}

export const userService = new UserService();
