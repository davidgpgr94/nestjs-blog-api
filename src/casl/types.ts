
import { Post } from '@Posts/entities/post.entity';

export type FlatPost = Post & {
  'author.id': Post['author']['id']
}
