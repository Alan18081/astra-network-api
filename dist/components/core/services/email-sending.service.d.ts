export declare class EmailSendingService {
    private readonly client;
    constructor();
    sendSystemEmail(email: string, subject: string, template: string): Promise<void>;
    send(config: any): Promise<any>;
}
