import {
  BadRequestException,
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { HttpExceptionFilter } from './common/http-exception.filter';

class Application {
  private logger = new Logger(Application.name);
  private DEV_MODE: boolean;
  private PORT: string;
  private corsOriginList: string[];

  constructor(private server: NestExpressApplication) {
    this.server = server;

    this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true;
    // this.PORT = process.env.PORT || '80';
    this.corsOriginList = ['*'];
    this.PORT = process.env.PORT || '3000';
  }

  private async setUpGlobalMiddleware() {
    this.server.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      // origin: this.corsOriginList,
      credentials: true,
    });
    this.server.use(cookieParser());
    this.server.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들입니다.
        transform: true,
        transformOptions: {
          enableImplicitConversion: true, // <- This line here
        },
        forbidNonWhitelisted: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
      }),
    );
    this.server.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.server.get(Reflector)),
    );
  }

  async bootstrap() {
    await this.setUpGlobalMiddleware();
    await this.server.listen(this.PORT);
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(`Server on http://localhost:${this.PORT}`);
    } else {
      this.logger.log(`Server on port ${this.PORT}...`);
    }
  }

  errorLog(error: string) {
    this.logger.error(`Server Error ${error}`);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: new AppLoggingService(),
  });
  server.useStaticAssets(join(__dirname, '..', 'public'));
  server.setBaseViewsDir(join(__dirname, '..', 'views'));
  server.setViewEngine('hbs');
  // server.useGlobalFilters(new HttpExceptionFilter());

  const prismaService = server.get(PrismaService);
  await prismaService.enableShutdownHooks(server);
  const app = new Application(server);

  await app.bootstrap();
  app.startLog();
}

init().catch((error) => {
  new Logger('init').error(error);
});
