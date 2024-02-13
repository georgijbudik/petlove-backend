import { Controller, Get, Query } from '@nestjs/common';
import { NoticesService } from './notices.service';

import { ParseIntPipe, DefaultValuePipe } from '@nestjs/common';

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(6), ParseIntPipe) perPage: number,
    @Query('search') search: string,
    @Query('category') category: string,
    @Query('gender') gender: string,
    @Query('type') type: string,
    @Query('popular') popular: string,
    @Query('unpopular') unpopular: string,
    @Query('expensive') expensive: string,
    @Query('cheap') cheap: string,
  ) {
    const isPopular = popular !== undefined;
    const isUnpopular = unpopular !== undefined;
    const isExpensive = expensive !== undefined;
    const isCheap = cheap !== undefined;

    return this.noticesService.findAll({
      page,
      perPage,
      search,
      category,
      gender,
      type,
      isPopular,
      isUnpopular,
      isExpensive,
      isCheap,
    });
  }

  @Get('/categories')
  getCategories() {
    return this.noticesService.getCategories();
  }

  @Get('/sex')
  getSex() {
    return this.noticesService.getSex();
  }

  @Get('/species')
  getSpecies() {
    return this.noticesService.getSpecies();
  }
}
