import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuditLogEntity } from '../entities/audit-log.entity/audit-log.schema';

@Injectable()
export class AuditLogRepository extends Repository<AuditLogEntity> {
  constructor(private dataSource: DataSource) {
    super(AuditLogEntity, dataSource.createEntityManager());
  }
}
