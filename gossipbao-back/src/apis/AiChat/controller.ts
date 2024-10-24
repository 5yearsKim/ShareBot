import {
  Controller, Post, Get,
  Body, Param, Query,
  UseGuards
} from "@nestjs/common";
import { User } from "@/apis/$decorators";
import { UserGuard } from "@/apis/$guards";
import { AiChatService } from "./service";
import {
  CreateAiChatDto,
  ListAiChatOptionT,
} from "./dtos";
import * as err from "@/errors";
import type * as R from "@/types/AiChat.api";
import type { UserT } from "@/types";

@Controller("ai-chats")
export class AiChatController {
  constructor(private readonly service: AiChatService) {}

  @UseGuards(UserGuard)
  @Post("/find-or-create")
  async findOrCreate(
    @User() user: UserT,
  ): Promise<R.FindOrCreateRsp> {
    const fetched = await this.service.findOrCreate(user.id);
    return fetched;
  }

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @User() user: UserT,
    @Body() body: CreateAiChatDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;

    if (form.user_id !== user.id) {
      throw new err.ForbiddenE("user_id does not match");
    }
    const created = await this.service.create(form);
    return created;
  }

  @UseGuards(UserGuard)
  @Get("/")
  async list(
    @User() user: UserT,
    @Query() query: ListAiChatOptionT,
  ): Promise<R.ListRsp> {
    const listOpt: R.ListRqs = query;
    if (query.userId !== user.id) {
      throw new err.ForbiddenE("user_id does not match");
    }
    return await this.service.list(listOpt);
  }

}