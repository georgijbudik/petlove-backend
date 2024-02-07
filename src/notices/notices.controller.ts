import { Body, Controller, Get } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { DataDto } from './data.dto';
import { Post } from '@prisma/client';

@Controller('notices')
export class NoticesController {
  constructor(private noticeService: NoticesService) {}
}

// @Get()
// getNotices() {
//   return this.noticeService.getNotices();
// }

// @Post()
// createNotice(@Body() data: DataDto): Promise<Notice> {
//   return this.noticeService.createNotice(data);
// }
