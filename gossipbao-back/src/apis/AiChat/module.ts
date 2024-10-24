import { Module } from "@nestjs/common";
import { AiChatController } from "./controller";
import { AiChatService } from "./service";

@Module({
  controllers: [AiChatController],
  providers: [AiChatService],
})
export class AiChatModule {}
