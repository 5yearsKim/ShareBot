import {
  Controller, Get,
  Query,
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { UserGuard } from "@/apis/$guards";
import { User } from "@/apis/$decorators";
import { GetMeGroupAdminDto } from "./dtos";
import { GroupAdminService } from "./service";
import type * as R from "@/types/GroupAdmin.api";
import type { UserT } from "@/types";


@Controller("group-admins")
export class GroupAdminController {
  constructor(private readonly service: GroupAdminService) {}


  @UseGuards(UserGuard)
  @Get("/me")
  async getMe(
    @User() user: UserT,
    @Query() query: GetMeGroupAdminDto,
  ): Promise<R.GetMeRsp> {
    const { groupId } = query satisfies R.GetMeRqs;
    const fetched = await this.service.getMe(user.id, groupId);

    return { data: fetched };
  }


}