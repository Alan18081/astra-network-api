export declare class PublisherService {
    private readonly emitter;
    constructor();
    publish(event: string, payload: any): Promise<void>;
    asyncIterator(event: string): AsyncIterator<{}>;
}
