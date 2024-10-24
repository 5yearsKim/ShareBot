import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { AppModule } from "./apis/app.module";
import { AllExceptionsFilter } from "./apis/$tools/exception_filter";
import { PORT } from "@/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  // error handling
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));


  await app.listen(PORT);
}

bootstrap();
