import {
  Controller, Get, Sse,
  MessageEvent, Query,
  UseGuards,
} from "@nestjs/common";
import { User } from "@/apis/$decorators";
import { UserGuard } from "@/apis/$guards";
import { AppService } from "./app.service";
import { BotRespondSchema } from "./app.dto";
import { Observable, interval, map, from, concatMap, take } from "rxjs";
import * as err from "@/errors";
import type { UserT } from "@/types";

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }

  @UseGuards(UserGuard)
  @Sse("/bot/trigger")
  botTrigger(
    @User() user: UserT,
    @Query() query: any, // { group: { id: string, name: string, generator_type: string|undefined }, messages: MessageT[] }
  ): Observable<MessageEvent> {
    if (!query.data) {
      throw new err.InvalidDataE("need to include data in query");
    }
    try {
      const parsed = BotRespondSchema.parse(JSON.parse(query.data));
      return this.service.botTrigger(parsed.group, user.id, parsed.messages, parsed.generatorType ?? undefined);
    } catch (e) {
      throw new err.InvalidDataE((e as any).message);
    }
  }

  @UseGuards(UserGuard)
  @Sse("/bot/respond")
  botRespond(
    @User() user: UserT,
    @Query() query: any, // { group: { id: string, name: string, generator_type: string|undefined }, messages: MessageT[] }
  ): Observable<MessageEvent> {

    if (!query.data) {
      throw new err.InvalidDataE("need to include data in query");
    }

    try {
      const parsed = BotRespondSchema.parse(JSON.parse(query.data));
      return this.service.botRespond(parsed.group, user.id, parsed.messages, parsed.generatorType ?? undefined);
    } catch (e) {
      throw new err.InvalidDataE((e as any).message);
    }


    // // return text = 'hello world' by character for every 0.1s

    // // return interval(100).pipe(rxMap((i) => ({ data: { hello: "world" + i } })));
    // const helloWorld = "hello world"; // The string to be sent character by character
    // const charArray = helloWorld.split(""); // Splitting the string into an array of characters
    // const text = "";

    // return from(charArray).pipe(
    //   concatMap((char, index) => {
    //     const wrapped = {
    //       chunk: char,
    //       text: text + char,
    //       status: index === charArray.length - 1 ? "done" : "progress"
    //     };

    //     return interval(100).pipe(
    //       take(1), // Take the first emitted value to ensure it's delayed by 100ms
    //       map(() => ({ data: wrapped })) // Map the character to the expected MessageEvent format
    //     );
    //   }
    //   )
    // );
  }
}
