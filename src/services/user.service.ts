import { UserFormValues, UserModel } from "../models/user.model";
import request, { Methods } from "../util/request";

class UserService {
  async getUsers() {
    return request<UserModel[]>({ method: Methods.GET, resource: "users" });
  }

  async geUser(id: string | number){
    return request<UserModel>({ method: Methods.GET, resource: `users/${id}` });
  }

  async updateUser(id: string | number, data: UserFormValues) {
    return request<UserModel>({ method: Methods.PATCH, resource: `users/${id}`, data });
  }

  async createUser(data: UserFormValues) {
    return request<UserModel>({ method: Methods.POST, resource: "users", data });
  }

  async deleteUser(id: string | number) {
    return request<UserModel>({ method: Methods.DELETE, resource: `users/${id}` });
  }
}

export const userService = new UserService();
