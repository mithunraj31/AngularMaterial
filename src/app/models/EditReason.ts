export interface EditReason {
    status: Boolean;
    user?: {
        userId: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    editReason?: string;
    updatedAt?: string;
}