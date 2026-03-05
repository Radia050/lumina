export type Role = "student" | "teacher" | "teacher_pending" | "admin" | null;

export function getRole(user:any):Role{
    return user?.app_metadata?.role ?? null;
}
