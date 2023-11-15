import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entities/user.entity/user.schema';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuditLog } from './audit-log/entities/audit-log.entity/audit-log.schema';
import { Task } from './task/entities/task.entity/task.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditLogger } from './common/interceptors/audit-log.interceptor';
import { AuditLogRepository } from './audit-log/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://auditLog:password@localhost:27017/audit-log',
      entities: [UserEntity, Task, AuditLog],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UserModule,
    TaskModule,
    AuditLogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuditLogRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogger,
    },
  ],
})
export class AppModule {}
