import { Injectable } from "@nestjs/common";
import * as err from "@/errors";
import { adminM } from "@/models/Admin";
import type { AdminT } from "@/types";

@Injectable()
export class AdminService {
  constructor() {}

  async getMe(accountId: idT): Promise<AdminT> {
    const fetched = await adminM.findOne({ account_id: accountId });
    if (!fetched) {
      throw new err.NotExistE();
    }
    return fetched;
  }
}