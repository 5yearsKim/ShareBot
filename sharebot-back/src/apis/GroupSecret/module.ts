import { Module } from "@nestjs/common";
import { GroupSecretController } from "./controller";
import { GroupSecretService } from "./service";

@Module({
  controllers: [GroupSecretController],
  providers: [GroupSecretService],
})
export class GroupSecretModule {}
