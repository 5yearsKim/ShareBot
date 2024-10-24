import {
  Controller, Post, Get,
  Body, Param, Query,
  UseGuards,
} from "@nestjs/common";
import { User } from "@/apis/$decorators";
import { UserGuard } from "@/apis/$guards";
import { AiMessageService } from "./service";
import {
  CreateAiMessageDto,
  ListAiMessageDto,
} from "./dtos";
import type * as R from "@/types/AiMessage.api";
import type { UserT, } from "@/types";

@Controller("ai-messages")
export class AiMessageController {
  constructor(private readonly service: AiMessageService) {}

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @User() user: UserT,
    @Body() body: CreateAiMessageDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs ;
    const created = await this.service.create(form);
    return created;
  }

  @UseGuards(UserGuard)
  @Get("/")
  async list(
    @User() user: UserT,
    @Query() query: ListAiMessageDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    const fetched = await this.service.list(listOpt);
    return fetched;
  }
}