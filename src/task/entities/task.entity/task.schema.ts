import { ObjectId } from 'mongoose';
import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class TaskEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;
}
