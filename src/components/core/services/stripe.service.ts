import { Injectable } from '@nestjs/common';
import * as Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../../../config';

@Injectable()
export class StripeService {
  private stripeClient: any;

  constructor() {
    this.stripeClient = new Stripe(STRIPE_SECRET_KEY);
  }

}