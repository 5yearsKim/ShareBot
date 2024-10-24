import {
  Controller, Post, Get, Delete,
  Body, Param,
  UseGuards, ParseIntPipe
} from "@nestjs/common";
import { UserGuard, checkGroupAdmin } from "@/apis/$guards";
import { User } from "@/apis/$decorators";
import {
  CreateGroupSecretDto,
} from "./dtos";
import { GroupSecretService } from "./service";
import type * as R from "@/types/GroupSecret.api";
import type { UserT } from "@/types";


@Controller("group-secrets")
export class GroupSecretController {
  constructor(private readonly service: GroupSecretService) {}

  @UseGuards(UserGuard)
  @Get("/by-group/:groupId")
  async getByGroup(
    @User() user: UserT,
    @Param("groupId", ParseIntPipe) groupId: number,
  ): Promise<R.GetByGroupRsp> {
    await checkGroupAdmin(user.id, groupId);
    const group = await this.service.getByGroup(groupId);
    return { data: group };
  }

  @UseGuards(UserGuard)
  @Post()
  async create(
    @User() user: UserT,
    @Body() body: CreateGroupSecretDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;
    await checkGroupAdmin(user.id, form.group_id);
    const created = await this.service.create(form);
    return created;
  }

  @UseGuards(UserGuard)
  @Delete("/by-group/:groupId")
  async removeByGroup(
    @User() user: UserT,
    @Param("groupId", ParseIntPipe) groupId: number,
  ): Promise<R.RemoveByGroupRsp> {
    await checkGroupAdmin(user.id, groupId);
    const removed = await this.service.removeByGroup(groupId);
    return removed;
  }
}