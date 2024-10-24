import { AccountT } from "./Account";
import {AdminT} from './Admin'

// (GET) /me
export type GetMeRqs = null
export type GetMeRsp = GetData<AdminT|null>