import {
  OnGatewayConnection, WebSocketGateway, WebSocketServer, WsException,
  WsResponse,
} from '@nestjs/websockets';
import {Messages} from '../../helpers/enums/messages.enum';
import {AuthService} from '../auth/auth.service';
import {ClientsStoreService} from '../core/services/clients-store.service';
import {JwtPayload} from '../auth/interfaces/jwt-payload.interface';
import {UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';

@WebSocketGateway({ namespace: 'notes' })
@UsePipes(new ValidationPipe())
// @UseFilters(new WsExceptionsHandler())
export class NotesGateway implements OnGatewayConnection {

  @WebSocketServer()
  private readonly server;

  constructor(
    private readonly authService: AuthService,
    private readonly clientsStoreService: ClientsStoreService,
  ) {}

  async handleConnection(client: any) {
    try {
      const { token } = client.handshake.query;

      if (!token) {
        throw new WsException(Messages.AUTH_TOKEN_NOT_FOUND);
      }

      const data = this.authService.decodeToken(token) as JwtPayload;
      const user = await this.authService.validateUser(data);

      if (!user) {
        throw new WsException(Messages.USER_NOT_FOUND);
      }

      this.clientsStoreService.addSocket({
        id: client.id,
        socket: client,
        user,
      });
    } catch (e) {
      client.emit('server:error', e);
      client.disconnect();
    }
  }

  emitMessage(action: WsResponse): void {
    this.server.emit(action.event, action.data);
  }

}