export declare const mockRepository: {
    find(): Promise<void>;
    findAndCount(): Promise<void>;
    findOne(): Promise<void>;
    update(): Promise<void>;
    save(): Promise<void>;
    delete(): Promise<void>;
    createQueryBuilder(): string;
};
