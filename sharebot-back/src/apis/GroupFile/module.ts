import { Module } from "@nestjs/common";
import { GroupFileController } from "./controller";
import { GroupFileService } from "./service";

@Module({
  controllers: [GroupFileController],
  providers: [GroupFileService],
})
export class GroupFileModule {}
