import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 3000;
const PREFIX = process.env.PREFIX || '/api';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true
    });

    app.setGlobalPrefix(PREFIX);

    await app.listen(PORT, () => {
        Logger.log(`Server is listening on ${PORT}`);
    });
}
bootstrap().catch(err => {
    Logger.error(err)
});
