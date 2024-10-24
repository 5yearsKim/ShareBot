import { Module } from "@nestjs/common";
import { AiKnowledgeController } from "./controller";
import { AiKnowledgeService } from "./service";

@Module({
  controllers: [AiKnowledgeController],
  providers: [AiKnowledgeService],
})
export class AiKnowledgeModule {}
