import {
  Controller, Post, Get, Delete,
  Body, Param, Query, ParseIntPipe,
} from "@nestjs/common";
import { GroupFileService } from "./service";
import {
  ListGroupFileDto,
  CreateGroupFileDto,
} from "./dtos";
import * as err from "@/errors";
import type * as R from "@/types/GroupFile.api";


@Controller("group-files")
export class GroupFileController {
  constructor(private readonly service: GroupFileService) {}

  @Get("/")
  async list(
    @Query() query: ListGroupFileDto
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    const fetched = await this.service.list(listOpt);
    return fetched;
  }

  @Post("/")
  async create(
    @Body() body: CreateGroupFileDto,
  ): Promise<R.CreateRsp> {
    body satisfies R.CreateRqs;
    const created = await this.service.create(body.form);
    return created;
  }

  @Delete("/:id")
  async remove(
    @Param("id", ParseIntPipe) id: idT,
  ): Promise<R.DeleteRsp> {
    const deleted = await this.service.remove(id);
    return deleted;
  }


}