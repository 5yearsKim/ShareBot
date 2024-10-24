import {
  Controller, Post,
  Body,
} from "@nestjs/common";
import {
  CreateXGroupGroupTagDto,
  ResetByGroupDto,
} from "./dtos";
import { XGroupGroupTagService } from "./service";
import type * as R from "@/types/XGroupGroupTag.api";


@Controller("x-group-group-tag")
export class XGroupGroupTagController {
  constructor(private readonly service: XGroupGroupTagService) {}

  @Post("/")
  async create(
    @Body() body: CreateXGroupGroupTagDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;
    const created = await this.service.create(form);
    return created;
  }

  @Post("/reset-by-group")
  async resetByGroup(
    @Body() body: ResetByGroupDto,
  ): Promise<R.ResetByGroupRsp> {
    const { groupId } = body satisfies R.ResetByGroupRqs;
    await this.service.resetByGroup(groupId);
    return true;
  }
}