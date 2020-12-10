import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {

  @Get()
  findAll() {
    return {
      msg: "TODO"
    }
  }

}
