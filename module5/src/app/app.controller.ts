import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { faker } from '@faker-js/faker';

import { IsNotEmpty } from 'class-validator';
import { ApiExcludeEndpoint, ApiProperty } from '@nestjs/swagger';

class CreateFilterDTO {
  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsNotEmpty()
  @ApiProperty()
  checkIn: Date;

  @IsNotEmpty()
  @ApiProperty()
  checkOut: Date;

  @IsNotEmpty()
  @ApiProperty()
  guest: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/hotel/filter/')
  getAll(@Body() body: CreateFilterDTO): any {
    return this.appService.getAll({
      location: body.location,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guest: body.guest,
    });
  }

  @Get('/hotel/location/')
  getLocation() {
    return this.appService.getLocation();
  }

  @Get('/hotel/detail/:id')
  getById(@Param('id') id: string) {
    return this.appService.getById(id);
  }

  @Get('/hotel/latest/')
  getLatest() {
    return this.appService.getLatest();
  }

  @Get('/hotel/featured')
  getFeatured() {
    return this.appService.getFeatured();
  }

  @Get('/banners/')
  getMainBanner() {
    return {
      main: {
        image: faker.image.nature(640, 480, false),
      },
      second: {
        title: faker.commerce.productName(),
        description: faker.commerce.productName(),
        image: faker.image.nature(640, 480, false),
      },
      last: {
        title: faker.commerce.productName(),
        description: faker.commerce.productName(),
        image: faker.image.nature(640, 480, false),
      },
    };
  }

  @ApiExcludeEndpoint()
  @Get('/generate_data/')
  getGenerateData() {
    return this.appService.getHello();
  }
}
