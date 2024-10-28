import request, { Methods } from './../util/request';
import { BadgeFormValues, BadgeModel } from '../models/badges.model';

class BadgesService {
    async getBadges() {
        return request<BadgeModel[]>({ method: Methods.GET, resource: 'badges' });
    }

    async deleteBadge(id: string | number) {
        return request<BadgeModel>({method: Methods.DELETE, resource: `badges/${id}`})
    }

    async getBadge(id : string | number) {
        return request<BadgeModel>({method: Methods.GET, resource: `badges/${id}`});
    }

    async updateUser(id : string | number, data: BadgeFormValues) {
        return request<BadgeModel>({method: Methods.PATCH, resource: `badges/${id}`, data});
    }

    async createBadge(data: BadgeFormValues) {
        return request<BadgeModel>({method: Methods.POST, resource: `badges`, data});
    }

    

    


}

export const badgesService = new BadgesService();