import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { INews } from './news.type';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<INews[]> {
    return await [
      {
        _id: '658b694505a6bcd9b9379466',
        imgUrl:
          'https://www.nytimes.com/images/2023/04/16/magazine/16mag-LOR/16mag-LOR-blog480.jpg',
        title: 'What I Learned Dogsitting for New York City’s Opulent Elite',
        text: 'In a city of yawning class inequality, some side hustles let you glimpse how the other half lives.',
        date: '2023-04-11T09:00:18+0000',
        url: 'https://www.nytimes.com/2023/04/11/magazine/dogsitting-rich-new-york.html',
        link: 'nyt://article/8d29f1fc-d146-509d-8ceb-5a5b17d7886b',
      },
      {
        _id: '658b694505a6bcd9b9379467',
        imgUrl:
          'https://www.nytimes.com/images/2023/04/04/multimedia/00VIRTUAL-VETS-01b-fmzk/00VIRTUAL-VETS-01b-fmzk-blog480.jpg',
        title: 'The Virtual Vet Will See You Meow',
        text: 'Veterinary telemedicine could help more pet owners access much-needed care and put anxious animals at ease, but challenges remain.',
        date: '2023-04-07T09:00:46+0000',
        url: 'https://www.nytimes.com/2023/04/07/health/vet-pet-health-telemedicine.html',
        link: 'nyt://article/992f2f7f-793c-5553-b722-348625f53a4b',
      },
    ];
  }
}
