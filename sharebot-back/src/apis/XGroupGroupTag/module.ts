import { Module } from "@nestjs/common";
import { XGroupGroupTagController } from "./controller";
import { XGroupGroupTagService } from "./service";

@Module({
  controllers: [XGroupGroupTagController],
  providers: [XGroupGroupTagService],
})
export class XGroupGroupTagModule {}
