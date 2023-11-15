import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtPayloadInterface } from 'src/auth/interfaces/jwt-payload.interface';
import { AuditLog } from 'src/common/decorators/audit-log.decorator';
import { UserPayload } from 'src/common/decorators/user-payload.decorator';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@ApiTags('Task')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'task',
  version: '1',
})
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @AuditLog('CreateTask')
  async create(
    @Body() dto: TaskDto,
    @UserPayload() jwtPayload: JwtPayloadInterface,
  ) {
    try {
      const payload = await this.taskService.create(dto, jwtPayload);

      return { message: 'Task created successfully!', payload };
    } catch (error) {
      throw new BadRequestException(error.response.message);
    }
  }

  @Get()
  @AuditLog('GetAllTask')
  async getAllTask() {
    try {
      const payload = await this.taskService.getAllTask();
      return { message: 'All Tasks List!', payload };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
