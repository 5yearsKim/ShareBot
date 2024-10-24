import {
  Controller, Post, Get, Patch, Delete,
  Body, Param, Query,
  UseGuards, ParseIntPipe,
} from "@nestjs/common";

import { User, AccountId } from "@/apis/$decorators";
import { AccountGuard, checkAdmin } from "../$guards";
import { GroupTagService } from "./service";
import {
  ListGroupTagDto,
  CreateGroupTagDto,
  UpdateGroupTagDto,
  RerankGroupTagDto,
} from "./dtos";
import type * as R from "@/types/GroupTag.api";
import type {
  UserT,
  GroupTagT, GroupTagFormT, GetGroupTagOptionT, ListGroupTagOptionT,
} from "@/types";


@Controller("group-tags")
export class GroupTagController {
  constructor(private readonly service: GroupTagService) {}

  @Get("/")
  async list(
    @Query() query: ListGroupTagDto,
  ): Promise<ListData<GroupTagT>> {
    const listOpt = query;
    return await this.service.list(listOpt);
  }


  @UseGuards(AccountGuard)
  @Post("/")
  async create(
    @AccountId() accountId: idT,
    @Body() body: CreateGroupTagDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;
    await checkAdmin(accountId);

    const created = await this.service.create(form);
    return created;
  }

  @UseGuards(AccountGuard)
  @Delete("/:id")
  async removed(
    @AccountId() accountId: idT,
    @Param("id", ParseIntPipe) id: idT,
  ): Promise<R.DeleteRsp> {
    await checkAdmin(accountId);

    const removed = await this.service.remove(id);
    return removed;
  }

  @UseGuards(AccountGuard)
  @Patch("/:id")
  async update(
    @AccountId() accountId: idT,
    @Body() body: UpdateGroupTagDto,
    @Param("id", ParseIntPipe) id: idT,
  ): Promise<R.UpdateRsp> {
    const { form } = body satisfies R.UpdateRqs;

    await checkAdmin(accountId);
    const updated = await this.service.update(id, form);
    return updated;
  }
}