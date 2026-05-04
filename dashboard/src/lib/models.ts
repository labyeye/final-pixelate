export type User = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  createdAt?: string | Date;
  allowedPages?: string[];
  pagePermissions?: Record<
    string,
    { add?: boolean; view?: boolean; edit?: boolean; delete?: boolean }
  >;
};

export default {};
