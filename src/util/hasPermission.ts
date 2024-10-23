import { getDataFromTokenModel } from "./token";

export const hasPermission = ( allowedFor: Role[]) => {
    const role = getDataFromTokenModel("role") as Role;
    if (!role) {
        return false;
    }

    return allowedFor.includes(role);
}