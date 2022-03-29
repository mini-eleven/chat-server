import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { AuthModule, UserModule } from './modules';
import dbConfig from './configs/database.config'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [dbConfig]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('database.host'),
                port: config.get('database.port'),
                username: config.get('database.username'),
                password: config.get('database.password'),
                database: config.get('database.database'),
                entities: [path.join(__dirname, 'entities', '*.{ts,js}')],
                synchronize: config.get('database.synchronize'),
                logging: config.get('database.logging'),
            }),
        }),
        AuthModule,
        UserModule],
    controllers: [],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: ResponseInterceptor
    }, {
        provide: APP_FILTER,
        useClass: AllExceptionFilter
    }],
})
export class AppModule { }
