import { ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientsStoreService } from '../../components/core/services/clients-store.service';
export declare class UserInterceptor implements NestInterceptor {
    private readonly clientsStoreService;
    constructor(clientsStoreService: ClientsStoreService);
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> | Promise<Observable<any>>;
}
