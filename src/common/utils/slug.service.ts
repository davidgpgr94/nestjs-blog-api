import { Injectable } from '@nestjs/common';

import { convert, revert as revertSlug } from 'url-slug';

@Injectable()
export class SlugService {

  public static readonly SEPARATOR = '-';

  slug(text: string): string {
    return convert(text, { separator: SlugService.SEPARATOR });
  }

  revert(slug: string): string {
    return revertSlug(slug, { separator: SlugService.SEPARATOR });
  }

}
