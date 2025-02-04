import { User } from '../user/user.entity';

declare module 'express' {
  interface Request {
    user?: {
      id: number;
      email: string;
      password?: string;
      posts?: Post[];
    }
  }
}
