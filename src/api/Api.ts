import { ICandyApi } from "./ICandyApi";
import { ChangeSet } from "./ChangeSet";

interface RequestParameters {
    url: string;
    method: string;
    body?: string | undefined;
    headers?: Headers;
}

const COMMON_URL =
    "http://localhost.testkontur.ru:11090/v1/ns/00000000-0000-0000-0000-000000000000/drafts/4950a505-99a7-4f34-b3c0-7653206accc8";

enum Method {
    GET = "GET",
    POST = "POST",
}
enum StatusCode {
    OK = 200,
    REDIRECT = 300,
}

export class Api implements ICandyApi {
    public async getInner() {
        const response = await this.load({
            url: `${COMMON_URL}/get-inner`,
            method: Method.POST,
        });
        return response.json();
    }

    public async changeInnerNode(changeSet: ChangeSet) {
        return await this.load({
            url: `${COMMON_URL}/presentations/inner?src=changeSet&dataVersion=0`,
            method: Method.POST,
            body: JSON.stringify(changeSet),
            headers: new Headers({ "Content-Type": `application/json` }),
        });
    }

    private checkStatus = (response: Response): Response => {
        if (response.status >= StatusCode.OK && response.status < StatusCode.REDIRECT) {
            return response;
        }
        throw new Error(`${response.status}: ${response.statusText}`);
    };

    private async load({
        url,
        method = Method.GET,
        body = undefined,
        headers = new Headers(),
    }: RequestParameters): Promise<Response> {
        const response = await fetch(`${url}`, { method, body, headers, credentials: "include" });
        this.checkStatus(response);
        return response;
    }
}
