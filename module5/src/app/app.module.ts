import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Base, BaseSchema } from '../../schemas/base.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/module5'),
    MongooseModule.forFeature([{ name: Base.name, schema: BaseSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
