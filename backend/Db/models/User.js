const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Email verification status
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // TTL Index: Expires after 1 hour
});

// TTL Index will only work if `isVerified` is `false`. Once `isVerified` is set to `true`,
// the document will no longer be deleted as `createdAt` won't trigger TTL expiry.

userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600, partialFilterExpression: { isVerified: false } });

module.exports = mongoose.model('User', userSchema);
