import { Module } from "@nestjs/common";
import { GroupTagController } from "./controller";
import { GroupTagService } from "./service";

@Module({
  controllers: [GroupTagController],
  providers: [GroupTagService],
})
export class GroupTagModule {}
