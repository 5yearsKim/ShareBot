import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query,
  ParseIntPipe,
  UseGuards, UseInterceptors, UploadedFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { GroupService } from "./service";
import { AccountId } from "@/apis/$decorators";
import { UserGuard, AccountGuard, checkGroupAdmin } from "@/apis/$guards";
import { User } from "@/apis/$decorators";
import {
  CreateGroupDto,
  GetGroupDto,
  GetByKeyGroupDto,
  ListGroupDto,
  UpdateGroupDto,
  DeleteThumbnailDto,
} from "./dtos";
import * as err from "@/errors";
import type * as R from "@/types/Group.api";
import type { UserT } from "@/types";

@Controller("groups")
export class GroupController {
  constructor(private readonly service: GroupService ) {}

  @UseGuards(AccountGuard)
  @Post("/")
  async create(
    @AccountId() accountId: idT,
    @Body() body: CreateGroupDto,
  ): Promise<R.CreateRsp> {
    body satisfies R.CreateRqs;
    const created = this.service.create(body.form, accountId);
    return created;
  }

  @Get("/key/:key")
  async getByKey(
    @AccountId() accountId: idT|null,
    @Param("key") key: string,
    @Query() query: GetByKeyGroupDto,
  ): Promise<R.GetByKeyRsp> {

    const getOpt = query satisfies R.GetByKeyRqs;
    if (accountId) {
      getOpt.accountId = accountId;
    }
    const fetched = await this.service.getByKey(key, getOpt);

    return { data: fetched };
  }


  @Get("/")
  async list(
    @AccountId() accountId: idT|null,
    @Query() query: ListGroupDto,
  ): Promise<R.ListRsp> {

    const listOpt = query satisfies R.ListRqs;
    if (accountId) {
      listOpt.accountId = accountId;
    }
    const fetched = await this.service.list(listOpt);

    return fetched;
  }

  @Get("/:id")
  async get(
    @AccountId() accountId: idT|null,
    @Param("id", ParseIntPipe) id: idT,
    @Query() query: GetGroupDto,
  ): Promise<R.GetRsp> {

    const getOpt = query satisfies R.GetRqs;
    if (accountId) {
      getOpt.accountId = accountId;
    }
    const fetched = await this.service.get(id, getOpt);

    return { data: fetched };
  }

  @UseGuards(UserGuard)
  @Patch("/:id")
  async patch(
    @User() user: UserT,
    @Param("id", ParseIntPipe) id: idT,
    @Body() body: UpdateGroupDto,
  ): Promise<R.UpdateRsp> {

    const { form } = body satisfies R.UpdateRqs;

    await checkGroupAdmin(user.id, id);

    const updated = await this.service.update(id, form);

    return updated;
  }

  @UseGuards(AccountGuard)
  @Post("/thumbnail")
  @UseInterceptors(FileInterceptor("image"))
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File): Promise<R.UploadThumbnailRsp> {

    if (!file) {
      throw new err.InvalidFieldE("image should be given as form-data");
    }
    if (!file.mimetype.startsWith("image/")) {
      throw new err.InvalidFieldE("image should be an image file");
    }
    if (file.size > 1024 * 1024 * 5) {
      throw new err.InvalidFieldE("image should be smaller than 5MB");
    }
    const key = await this.service.uploadThunmbnail(file);
    return { key };
  }

  @UseGuards(AccountGuard)
  @Delete("/thumbnail")
  async deleteThumbnail(
    @Body() body: DeleteThumbnailDto,
  ): Promise<R.DeleteThumbnailRsp> {
    const { key } = body satisfies R.DeleteThumbnailRqs;
    await this.service.deleteThumbnail(key);
    return null;
  }


  @UseGuards(UserGuard)
  @Post("/file")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserT,
  ): Promise<R.UploadThumbnailRsp> {

    if (!file) {
      throw new err.InvalidFieldE("file should be given as form-data");
    }
    // if (!file.mimetype.startsWith("image/")) {
    //   throw new err.InvalidFieldE("image should be an image file");
    // }
    if (file.size > 1024 * 1024 * 50) {
      throw new err.InvalidFieldE("file should be smaller than 50MB");
    }
    const key = await this.service.uploadFile(user, file);
    return { key };
  }
}


