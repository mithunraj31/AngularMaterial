export interface User {
    userId?: number;
    firstName: String;
    lastName: String;
    email: String;
    role: Role;
}
export interface Role {
    roleName: string;
    description: string;
}