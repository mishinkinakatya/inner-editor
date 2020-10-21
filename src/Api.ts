import { ChangeSet } from "./domain/CreateChangeSet";

interface RequestParameters {
    baseUrl: string;
    method: string;
    body?: string | undefined;
    headers?: Headers;
}

export interface ICandyApi {
    changeInnerNode(changeSet: ChangeSet): Promise<Response>;
    getInner(): Promise<Response>;
}

const COMMON_URL =
    "http://localhost.testkontur.ru:11090/v1/ns/00000000-0000-0000-0000-000000000000/drafts/4950a505-99a7-4f34-b3c0-7653206accc8";

const Method = {
    GET: "GET",
    POST: "POST",
};
const StatusCode = {
    OK: 200,
    REDIRECT: 300,
};

function checkStatus(response: Response) {
    if (response.status >= StatusCode.OK && response.status < StatusCode.REDIRECT) {
        return response;
    }
    throw new Error(`${response.status}: ${response.statusText}`);
}

class Api implements ICandyApi {
    public async getInner() {
        const response = await Api.load({
            baseUrl: `${COMMON_URL}/get-inner`,
            method: Method.POST,
        });
        return response.json();
    }

    public async changeInnerNode(changeSet: ChangeSet) {
        return await Api.load({
            baseUrl: `${COMMON_URL}/presentations/inner?src=changeSet&dataVersion=0`,
            method: Method.POST,
            body: JSON.stringify(changeSet),
            headers: new Headers({ "Content-Type": `application/json` }),
        });
    }

    private static async load({
        baseUrl,
        method = Method.GET,
        body = undefined,
        headers = new Headers(),
    }: RequestParameters) {
        const response = await fetch(`${baseUrl}`, { method, body, headers, credentials: "include" });
        checkStatus(response);
        return response;
    }
}

export const getApi = (): Api => new Api();
