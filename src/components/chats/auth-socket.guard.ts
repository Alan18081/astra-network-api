import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class AuthSocketGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const socket = context.getArgByIndex(0);
    console.log(socket.quer);
    return false;
  }
}