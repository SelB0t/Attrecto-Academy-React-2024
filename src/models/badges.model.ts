export interface BadgeModel {
    id: number;
    name: string;
    image: string;
    description: string;  
    createdAt: Date;
}

export type BadgeFormValues = Omit<BadgeModel, "id" | "createdAt">;