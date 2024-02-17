import { Controller, Get, Query } from '@nestjs/common';
import { NoticesService } from './notices.service';

import { ParseIntPipe, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';

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
    @Query('popular', new DefaultValuePipe(false), ParseBoolPipe)
    popular: boolean,
    @Query('unpopular', new DefaultValuePipe(false), ParseBoolPipe)
    unpopular: boolean,
    @Query('expensive', new DefaultValuePipe(false), ParseBoolPipe)
    expensive: boolean,
    @Query('cheap', new DefaultValuePipe(false), ParseBoolPipe)
    cheap: boolean,
  ) {
    return this.noticesService.findAll({
      page,
      perPage,
      search,
      category,
      gender,
      type,
      popular,
      unpopular,
      expensive,
      cheap,
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
