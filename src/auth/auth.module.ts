import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'

import { AuthMiddleware } from './auth.middleware'
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface'
import { SupertokensService } from './supertokens/supertokens.service'

@Module({})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [SupertokensService],
      imports: [UsersModule],
      module: AuthModule,
    }
  }
}