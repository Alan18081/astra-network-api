import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientsStoreService } from '../../components/core/services/clients-store.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {

  constructor(private readonly clientsStoreService: ClientsStoreService) {}

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> | Promise<Observable<any>> {
    const socketContext = context.switchToWs();
    const client = socketContext.getClient();
    const socket = this.clientsStoreService.getSocketById(client.client.id);
    if (socket) {
      client.user = socket.user;
    }
    return call$;
  }
}