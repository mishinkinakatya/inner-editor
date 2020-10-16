import { InnerNodeItem } from "./domain/Inner";

interface RequestParameters {
    baseUrl: string;
    method: string;
    body?: string | undefined;
    headers?: Headers;
}

export interface ApiModel {
    changeInnerNode: (changes: {}) => void;
    getInner: () => InnerNodeItem;
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

class Api {
    public async getInner() {
        let response = await this.load({
            baseUrl: `${COMMON_URL}/get-inner`,
            method: Method.POST,
        });
        // let response = await this.load({
        //     baseUrl: `${COMMON_URL}/presentations/inner?src=changeSet&dataVersion=0`,
        //     method: Method.POST,
        //     body: JSON.stringify({
        //         added: [],
        //         changed: {},
        //         removed: ["Root/ItemsWithNesting.children"],
        //     }),
        //     headers: new Headers({ "Content-Type": `application/json` }),
        // });
        return response.json();
    }

    public async changeInnerNode(changedInnerNode: InnerNodeItem) {
        let response = await this.load({
            baseUrl: `${COMMON_URL}/presentations/inner?src=changeSet&dataVersion=0`,
            method: Method.POST,
            body: JSON.stringify(changedInnerNode),
            headers: new Headers({ "Content-Type": `application/json` }),
        });

        return response;
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
