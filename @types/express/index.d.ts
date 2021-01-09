
import { Post } from '@Posts/entities/post.entity';
import { User as UserEntity } from '@Users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      post?: Post;
    }
    interface User extends UserEntity { }
  }
}
