import { ICandyApi, InnerParameters } from "./ICandyApi";
import { ChangeSet } from "./ChangeSet";

interface RequestParameters {
    url: string;
    method: string;
    body?: string | undefined;
    headers?: Headers;
}

enum Method {
    GET = "GET",
    POST = "POST",
}
enum StatusCode {
    OK = 200,
    REDIRECT = 300,
    UNAUTHORIZED = 401,
}

export class Api implements ICandyApi {
    public async getInner({ ns, drafts }: InnerParameters) {
        const response = await this.load({
            url: `http://localhost.testkontur.ru:11090/v1/ns/${ns}/drafts/${drafts}/get-inner`,
            method: Method.POST,
        });

        return response.json();
    }

    public async changeInnerNode(changeSet: ChangeSet, { ns, drafts }: InnerParameters) {
        return await this.load({
            url: `http://localhost.testkontur.ru:11090/v1/ns/${ns}/drafts/${drafts}/presentations/inner?src=changeSet&dataVersion=0`,
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
