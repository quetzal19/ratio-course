import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Base, BaseDocument } from '../../schemas/base.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const latestProjection = {
  image: 1,
  name: 1,
  address: 1,
  author: 1,
};

const cardProjection = {
  image: 1,
  images: 1,
  name: 1,
  address: 1,
  author: 1,
  price: 1,
  info: 1,
};

@Injectable()
export class AppService {
  constructor(@InjectModel(Base.name) private baseModel: Model<BaseDocument>) {}
  getHello(): any {
    const review = [];
    for (let i = 0; i < 20; i++) {
      review.push({
        author: {
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
          avatar: faker.image.avatar(),
        },
        date: faker.date.recent(),
        content: faker.lorem.paragraph(),
      });
    }
    const test = [];
    for (let i = 0; i < 20; i++) {
      test.push({
        icon: `https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/${faker.helpers.arrayElement(
          [
            'dotnet',
            '1001tracklists',
            '1password',
            '3m',
            'actigraph',
            'activision',
            'adafruit',
            'adguard',
            'adidas',
            'aerospike',
            'aircall',
            'alpinelinux',
            'apache',
          ],
        )}.svg`,
        name: faker.commerce.productMaterial(),
      });
    }
    console.log('save');
    const result = {
      image: faker.image.nature(640, 480, false),
      author: {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        avatar: faker.image.avatar(),
      },
      name: faker.commerce.productName(),
      address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`,
      price: [
        faker.commerce.price(100, 1000, 0, '$'),
        faker.commerce.price(1000, 2000, 0, '$'),
      ],
      images: [
        faker.image.nature(640, 480, false),
        faker.image.nature(640, 480, false),
        faker.image.nature(640, 480, false),
        faker.image.nature(640, 480, false),
        faker.image.nature(640, 480, false),
        faker.image.nature(640, 480, false),
        faker.image.nature(640, 480, false),
        faker.image.nature(640, 480, false),
      ],
      info: {
        bedroom: faker.random.numeric(),
        bathroom: faker.random.numeric(),
      },
      type: faker.helpers.arrayElement([
        'Apartment on Rent',
        'Home Room on Rent',
      ]),
      period: faker.helpers.arrayElement([
        '1-2 years',
        '1+ years',
        '1-5 month',
        '6-7 month',
      ]),
      coords: [faker.address.latitude(40, 30), faker.address.longitude(60, 50)],
      description: faker.lorem.paragraphs(5),
      amenities: test,
      reviews: review,
      updateAt: '',
      createdAt: '',
    };
    const createBase = new this.baseModel(result);
    return createBase.save();
  }

  async getAll(filter) {
    return this.baseModel
      .find({ address: { $regex: `${filter.location}` } }, cardProjection)
      .limit(10);
  }

  async getById(id) {
    return this.baseModel.findOne({ _id: id });
  }

  async getLatest() {
    return this.baseModel.find({}, latestProjection).sort({ _id: -1 }).limit(4);
  }

  async getFeatured() {
    return this.baseModel.find({}, cardProjection).limit(6);
  }

  async getLocation() {
    const data: Base[] = await this.baseModel
      .find(
        {},
        {
          address: 1,
        },
      )
      .exec();
    const result = [];
    data.forEach((item) => {
      const split = item.address.split(', ')[2];
      const arr = result.map((item) => item.name);
      if (!~arr.indexOf(split)) {
        result.push({
          name: split,
        });
      }
    });
    return result;
  }
}
