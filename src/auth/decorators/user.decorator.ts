
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserInRequestDto } from '@Auth/dtos/user-in-request.dto';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user: UserInRequestDto = req.user;
    return user as UserInRequestDto;
  }
)
