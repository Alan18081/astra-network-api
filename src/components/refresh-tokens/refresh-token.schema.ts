import { Schema } from 'mongoose';

const RefreshTokenSchema = new Schema({
  token: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

RefreshTokenSchema.index({ token: 1 });

export { RefreshTokenSchema };