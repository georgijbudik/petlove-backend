import { Controller, Get, Param, Query } from '@nestjs/common';
import { NoticesService } from './notices.service';

import { ParseIntPipe, ParseBoolPipe, DefaultValuePipe } from '@nestjs/common';

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
    @Query('byPopularity') byPopularity: string,
    @Query('byPrice') byPrice: string,
  ) {
    return this.noticesService.findAll({
      page,
      perPage,
      search,
      category,
      gender,
      type,
      byPopularity,
      byPrice,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.noticesService.findOne(id);
  }
}
