import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WsException } from '@nestjs/websockets';
import { Messages } from './helpers/enums/messages.enum';
import { JwtPayload } from './components/auth/interfaces/jwt-payload.interface';
import { ClientsStoreService } from './components/core/services/clients-store.service';
import { UsersService } from './components/users/users.service';
import { AuthService } from './components/auth/auth.service';
import { AUTH_ERROR, SERVER_ERROR } from './helpers/ws/ws-errors';
import {CONNECTED} from "./app.actions";

@WebSocketGateway({ namespace: '/' })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly clientsStoreService: ClientsStoreService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}


  async handleConnection(client: any) {
    try {
      const { token } = client.handshake.query;

      if (!token) {
        console.log('Empty token');
        client.emit(AUTH_ERROR, new WsException(Messages.AUTH_TOKEN_NOT_FOUND));
        return;
      }

      const data = this.authService.decodeToken(token) as JwtPayload;

      if(!data) {
        console.log('Empty token');
        client.emit(AUTH_ERROR, new WsException(Messages.INVALID_TOKEN));
        return;
      }

      const user = await this.authService.validateUser(data);

      if (!user) {
        console.log('Empty user');
        client.emit(AUTH_ERROR, new WsException(Messages.USER_NOT_FOUND));
        return;
      }

      await this.usersService.updateOne(user.id, { online: true });

      console.log('Adding socket to store');
      this.clientsStoreService.addSocket({
        id: client.id,
        socket: client,
        user,
      });

      console.log(`User ID: ${user.id} successfully connected`);

      client.emit(CONNECTED);
    } catch (e) {
      console.log(e);
      client.emit(SERVER_ERROR, new WsException(Messages.SERVER_ERROR));
    }
  }

  async handleDisconnect(client: any) {
    try {
      this.clientsStoreService.removeSocket(client.id);
    } catch (e) {
      client.emit(SERVER_ERROR, new WsException(Messages.SERVER_ERROR));
    }
  }

}