import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { faker } from '@faker-js/faker';

import { IsNotEmpty } from 'class-validator';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

class CreateFilterDTO {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Uzbekistan',
  })
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

class OrderDTO {
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsNotEmpty()
  @ApiProperty()
  info_1: string;

  @IsNotEmpty()
  @ApiProperty()
  info_2: string;

  @IsNotEmpty()
  @ApiProperty()
  country: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  comment: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('hotel')
  @ApiOperation({ summary: 'Метод фильтрации для главной страницы' })
  @Post('/hotel/filter/')
  getAll(@Body() body: CreateFilterDTO): any {
    return this.appService.getAll({
      location: body.location,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guest: body.guest,
    });
  }

  @ApiTags('hotel')
  @ApiOperation({ summary: 'Получение списка стран' })
  @Get('/hotel/location/')
  getLocation() {
    return this.appService.getLocation();
  }

  @ApiTags('hotel')
  @ApiOperation({ summary: 'Получение полного контента по ID отеля' })
  @Get('/hotel/detail/:id')
  getById(@Param('id') id: string) {
    return this.appService.getById(id);
  }

  @ApiTags('hotel')
  @ApiOperation({
    summary: 'Получение контента для блока latest на главной странице',
  })
  @Get('/hotel/latest/')
  getLatest() {
    return this.appService.getLatest();
  }

  @ApiTags('hotel')
  @ApiOperation({
    summary: 'Получение контента для блока featured на главной странице',
  })
  @Get('/hotel/featured')
  getFeatured() {
    return this.appService.getFeatured();
  }

  @ApiOperation({ summary: 'Получение баннеров с главной страницы' })
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

  @ApiOperation({ summary: 'Оставить заявку' })
  @Post('/order/')
  sendOrder(@Body() body: OrderDTO, @Res() res: Response) {
    const random = Math.random() > 0.5;
    if (random) {
      return res.status(200).json(body);
    }
    return res.status(500).json({
      msg: 'Ошибка происходит с вероятностью 50 процентов',
    });
  }

  @ApiExcludeEndpoint()
  @Get('/generate_data/')
  getGenerateData() {
    return this.appService.getHello();
  }
}
