import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PublisherService {

  private readonly emitter: PubSub;

  constructor() {
    this.emitter = new PubSub();
  }

  async publish(event: string, key: string, payload: any): Promise<void> {
    return this.emitter.publish(event, { [key]: payload });
  }

  asyncIterator(event: string) {
    return this.emitter.asyncIterator(event);
  }

}