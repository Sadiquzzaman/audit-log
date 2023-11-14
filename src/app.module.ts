import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entities/user.entity/user.schema';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TaskEntity } from './task/entities/task.entity/task.schema';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuditLogEntity } from './audit-log/entities/audit-log.entity/audit-log.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://auditLog:password@localhost:27017/audit-log',
      entities: [UserEntity, TaskEntity, AuditLogEntity],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UserModule,
    TaskModule,
    AuditLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
