import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskRepository } from './repositories/task.repository';
import { TaskDto } from './dto/task.dto';
import { JwtPayloadInterface } from 'src/auth/interfaces/jwt-payload.interface';
import { Task } from './entities/task.entity/task.schema';
@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(dto: TaskDto, jwtPayload: JwtPayloadInterface): Promise<Task> {
    try {
      const taskEntity = {
        ...dto,
        created_at: new Date(),
        created_by: jwtPayload.id,
      };

      const task = await this.taskRepository.save(taskEntity);

      return task;
    } catch (error) {
      throw new BadRequestException(error.response.message);
    }
  }

  async getAllTask(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find();

      return tasks;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
