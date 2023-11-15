import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditLog } from 'src/audit-log/entities/audit-log.entity/audit-log.schema';
import { AuditLogRepository } from 'src/audit-log/repositories/user.repository';
import { AUDIT_LOG_DATA } from 'src/common/decorators/audit-log.decorator';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class AuditLogger implements NestInterceptor {
  private readonly logger = new Logger(AuditLogger.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly auditLogRepository: AuditLogRepository,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const auditLog = this.reflector.get<string>(
      AUDIT_LOG_DATA,
      context.getHandler(),
    );

    return next.handle().pipe(
      tap(async (res) => {
        if (!auditLog) {
          return;
        }

        console.log(auditLog);

        const request = context.switchToHttp().getRequest();
        const userId = request.user ? request.user.id : null;

        const data: QueryDeepPartialEntity<AuditLog> = {
          action: auditLog,
          userId: userId,
          details: JSON.stringify({
            body: request.body,
            params: request.params,
            res,
          }),
          createdAt: new Date(),
        };

        await this.auditLogRepository.insert(data);

        this.logger.log(`Audit Log created for action: ${auditLog}`);
      }),
    );
  }
}
