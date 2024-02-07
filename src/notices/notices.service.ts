import { Injectable } from '@nestjs/common';
import { NoticesRepository } from './notices.repository';
import { DataDto } from './data.dto';
@Injectable()
export class NoticesService {
  constructor(private noticesRepository: NoticesRepository) {}
}

// async getNotices() {
//   return this.noticesRepository.getNotices();
// }

// async createNotice(data: DataDto): Promise<Notice> {
//   return this.noticesRepository.createNotice(data);
// }
