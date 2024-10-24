import { Module } from "@nestjs/common";
import { AiMessageController } from "./controller";
import { AiMessageService } from "./service";

@Module({
  controllers: [AiMessageController],
  providers: [AiMessageService],
})
export class AiMessageModule {}
