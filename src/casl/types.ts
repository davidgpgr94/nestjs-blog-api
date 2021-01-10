
import { Post } from '@Posts/entities/post.entity';
import { AttachedFile } from '@Posts/entities/attached-file.entity';

export type FlatPost = Post & {
  'author.id': Post['author']['id']
}

export type FlatAttachedFile = AttachedFile & {
  'post.author.id': AttachedFile['post']['author']['id']
}
