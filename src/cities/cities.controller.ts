import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  findAll(@Query('location') location: string) {
    return this.citiesService.findAll({ location });
  }
}
