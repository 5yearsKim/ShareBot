import { Module, type MiddlewareConsumer } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";
import { APP_PIPE } from "@nestjs/core";
import { DecodeAccount, DecodeUser } from "@/apis/$middlewares";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AccountModule } from "@/apis/Account/module";
import { AdminModule } from "@/apis/Admin/module";
import { AiChatModule } from "@/apis/AiChat/module";
import { AiKnowledgeModule } from "@/apis/AiKnowledge/module";
import { AiMessageModule } from "@/apis/AiMessage/module";
import { AuthModule } from "@/apis/Auth/module";
import { EmailVerificationModule } from "@/apis/EmailVerification/module";
import { GroupModule } from "@/apis/Group/module";
import { GroupTagModule } from "@/apis/GroupTag/module";
import { GroupAdminModule } from "@/apis/GroupAdmin/module";
import { GroupSecretModule } from "@/apis/GroupSecret/module";
import { UserModule } from "@/apis/User/module";
import { XGroupGroupTagModule } from "@/apis/XGroupGroupTag/module";


@Module({
  imports: [
    AccountModule,
    AdminModule,
    AiChatModule,
    AiKnowledgeModule,
    AiMessageModule,
    AuthModule,
    EmailVerificationModule,
    GroupModule,
    GroupAdminModule,
    GroupSecretModule,
    GroupTagModule,
    UserModule,
    XGroupGroupTagModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecodeAccount, DecodeUser)
      .forRoutes("*");
  }
}
