export const ROLE ={
  Admin: 'Admin',
  Instructor: 'Instructor',
  User: 'User',
} as const;
export type ROLE = typeof ROLE[keyof typeof ROLE];