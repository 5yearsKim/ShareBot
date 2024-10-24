import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import * as EngineApi from "@/engine/apis";
import { aiMessagesToMessages } from "@/engine/utils";
import type { GroupT as EngineGroupT } from "@/engine/type";
import type { AiMessageFormT } from "@/types";


@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  botTrigger(
    group: EngineGroupT,
    userId: idT,
    aiMessages: AiMessageFormT[],
    generatorType: string | undefined = undefined,
  ): Observable<MessageEvent> {
    const messages = aiMessagesToMessages(aiMessages);
    return new Observable((subscriber) => {
      // axios.get(`${engineUrl}/test-stream`, {
      EngineApi.botTriggerStream({
        userId,
        group,
        messages,
        generatorType,
      }).then(response => {
        response.data.on("data", (data: Buffer) => {
          try {
            // console.log('data', data);
            let dataStr = data.toString();

            // if dataStr stratsWith data: , remove it
            if (dataStr.startsWith("data: ")) {
              dataStr = dataStr.slice(6);
            }

            const msgEv = new MessageEvent("message", { data: dataStr });
            subscriber.next(msgEv);
          } catch (error) {
            console.error("Error parsing SSE data:", error);
          }
        });

        response.data.on("end", () => {
          subscriber.complete();
        });
      }).catch(error => {
        console.warn("sse request error:", error);
        subscriber.error(error);
      });
    });
  }


  botRespond(
    group: EngineGroupT,
    userId: idT,
    aiMessages: AiMessageFormT[],
    generatorType: string | undefined = undefined,
  ): Observable<MessageEvent> {
    const messages = aiMessagesToMessages(aiMessages);
    return new Observable((subscriber) => {
      // axios.get(`${engineUrl}/test-stream`, {
      EngineApi.botRespondStream({
        userId,
        group,
        messages,
        generatorType,
      }).then(response => {
        response.data.on("data", (data: Buffer) => {
          try {
            // console.log('data', data);
            let dataStr = data.toString();

            // if dataStr stratsWith data: , remove it
            if (dataStr.startsWith("data: ")) {
              dataStr = dataStr.slice(6);
            }

            const msgEv = new MessageEvent("message", { data: dataStr });
            subscriber.next(msgEv);
          } catch (error) {
            console.error("Error parsing SSE data:", error);
          }
        });

        response.data.on("end", () => {
          subscriber.complete();
        });
      }).catch(error => {
        console.warn("sse request error:", error);
        subscriber.error(error);
      });
    });
  }

}
