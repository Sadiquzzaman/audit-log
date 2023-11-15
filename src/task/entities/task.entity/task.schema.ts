import { ObjectId } from 'mongoose';
import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;
}
