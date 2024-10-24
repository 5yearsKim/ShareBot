import {
  Controller, Get,
  UseGuards,
} from "@nestjs/common";
import { AccountId } from "@/apis/$decorators";
import { AccountGuard } from "@/apis/$guards";
import { AdminService } from "./service";
import type * as R from "@/types/Admin.api";


@Controller("admins")
export class AdminController {
  constructor(private readonly service: AdminService) {}


  @UseGuards(AccountGuard)
  @Get("/me")
  async getMe(
    @AccountId() accountId: idT,
  ): Promise<R.GetMeRsp> {
    const fetched = await this.service.getMe(accountId);
    return { data: fetched };
  }

}