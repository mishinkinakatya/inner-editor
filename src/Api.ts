import { InnerNodeItem } from "./domain/Inner";

interface RequestParameters {
    baseUrl: string;
    method: string;
    body?: string | undefined;
    headers?: Headers;
}
const COMMON_URL = "";

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

class Api {
    public async getInner() {
        let response = await this.load({
            baseUrl: `${COMMON_URL}`,
            method: Method.POST,
        });

        return response.json();
    }

    public async changeInnerNode(changedInnerNode: InnerNodeItem) {
        let response = await this.load({
            baseUrl: `${COMMON_URL}`,
            method: Method.POST,
            body: JSON.stringify(changedInnerNode),
            headers: new Headers({ "Content-Type": `application/json` }),
        });

        return response.json();
    }

    // public async deleteInnerNode() {}

    // public async addInnerNode() {}

    private async load({ baseUrl, method = Method.GET, body = undefined, headers = new Headers() }: RequestParameters) {
        let response = await fetch(`${baseUrl}`, { method, body, headers, credentials: "include" });
        checkStatus(response);
        return response;
    }
}

export const getApi = (): Api => new Api();
