import { ObjectId } from 'mongoose';
import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  action: string;

  @Column()
  userId: string;

  @Column()
  details: string;

  @CreateDateColumn()
  createdAt: Date;
}
