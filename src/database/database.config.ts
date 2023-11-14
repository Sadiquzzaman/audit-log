import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/audit-log';
  console.log('Connecting to MongoDB with URI:', uri);
  return { uri };
});
