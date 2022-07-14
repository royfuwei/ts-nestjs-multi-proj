import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CronJobStatusDTO {
  @ApiProperty({
    description: 'cron job 識別名稱',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'cron time',
    example: '*/30 * * * * *',
    required: true,
  })
  @IsString()
  cron: string;
  @ApiProperty({
    description: '排程最後執行時間',
    required: true,
  })
  lastDate: Date;

  @ApiProperty({
    description: '排程下次執行時間',
    required: true,
  })
  nextDate: Date;

  @ApiProperty({
    description: '是否運行',
    required: true,
  })
  running: boolean;
}

export class UpdateCronTimeBody {
  @ApiProperty({
    name: 'cron',
    description: 'cron time',
    example: '*/30 * * * * *',
    required: true,
  })
  @IsString()
  cron: string;
}
