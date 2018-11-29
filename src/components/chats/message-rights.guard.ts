import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class MessageRightsGuard implements CanActivate {

  constructor(private readonly messagesService: MessagesService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs();
    const data = client.getData();
    console.log(data);

    return true;
  }
}