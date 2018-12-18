import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ClientsStoreService } from './components/core/services/clients-store.service';
import { UsersService } from './components/users/users.service';
import { AuthService } from './components/auth/auth.service';
export declare class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly clientsStoreService;
    private readonly usersService;
    private readonly authService;
    constructor(clientsStoreService: ClientsStoreService, usersService: UsersService, authService: AuthService);
    handleConnection(client: any): Promise<void>;
    handleDisconnect(client: any): Promise<void>;
}
