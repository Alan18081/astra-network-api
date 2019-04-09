import {createParamDecorator} from '@nestjs/common';

export const ReqUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.user,
);