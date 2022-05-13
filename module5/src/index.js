const mongoose = require('mongoose');
const fastify = require('fastify')({
    logger: true,
});
/**
 * Ремонт техники
 * 1. Город
 * 2. Тип техники (Видеокарта, Ноутбук итд)
 * 3. Бренд техники - у каждого типа техники, есть свои бренды
 * 4. Модель техники
 */
const CityModel = mongoose.model('City', new mongoose.Schema({
    name: String,
    code: String,
    pos: Array,
}));
const TypeModel = mongoose.model('Type', new mongoose.Schema({
    name: String,
    code: String,
}));
const BrandModel = mongoose.model('Brand', new mongoose.Schema({
    name: String,
    code: String,
    typeID: mongoose.Types.ObjectId,
}));
const ModelModel = mongoose.model('Model', new mongoose.Schema({
    name: String,
    code: String,
    brandID: mongoose.Types.ObjectId,
}));
const OfficeModel = mongoose.model('Office', new mongoose.Schema({
    name: String,
    code: String,
    brandID: mongoose.Types.ObjectId,
}));

fastify.get('/api/v1/', async (request, reply) => {

});

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/module5');
        await fastify.listen(3000);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (e) {
        fastify.log.error(e);
        process.exit();
    }
}

start();