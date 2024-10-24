import {
  Controller, Post, Get, Delete,
  Body, Query, Param,
  UseGuards
} from "@nestjs/common";
import { UserGuard } from "@/apis/$guards";
import { User } from "@/apis/$decorators";
import {
  CreateAiKnowledgeDto,
  ListAiKnowledgeDto,
} from "./dtos";
import { AiKnowledgeService } from "./service";
import * as err from "@/errors";
import type * as R from "@/types/AiKnowledge.api";
import type { UserT } from "@/types";


@Controller("ai-knowledges")
export class AiKnowledgeController {
  constructor(private readonly service: AiKnowledgeService) {}

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @User() user: UserT,
    @Body() body: CreateAiKnowledgeDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;
    if (form.user_id !== user.id) {
      throw new err.ForbiddenE("user_id not match");
    }
    const created = await this.service.create(form);

    return created;
  }

  @UseGuards(UserGuard)
  @Get("/")
  async list(
    @User() user: UserT,
    @Query() query: ListAiKnowledgeDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    if (listOpt.userId !== user.id) {
      throw new err.ForbiddenE("user_id not match");
    }
    return await this.service.list(listOpt);
  }

  @UseGuards(UserGuard)
  @Delete("/:id")
  async delete(
    @User() user: UserT,
    @Param("id") id: number,
  ): Promise<R.DeleteRsp> {
    const item = await this.service.get(id);
    if (item.user_id !== user.id) {
      throw new err.ForbiddenE("user_id not match");
    }
    const deleted = await this.service.remove(id);
    return deleted;
  }

}