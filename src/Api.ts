import { InnerNodeItem } from "./domain/Inner";

interface RequestParameters {
    baseUrl: string;
    method: string;
    body?: string | undefined;
    headers?: Headers;
}

export interface ApiModel {
    changeInnerNode: (changedInnerNode: InnerNodeItem) => void;
    getInner: () => InnerNodeItem;
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
        const response = await this.load({
            baseUrl: `${COMMON_URL}/get-inner`,
            method: Method.POST,
        });
        // const response = await this.load({
        //     baseUrl: `${COMMON_URL}/presentations/inner?src=changeSet&dataVersion=0`,
        //     method: Method.POST,
        //     body: JSON.stringify({
        //         added: [],
        //         changed: { "Root/ItemsWithNesting/0/NestedItems.value": "979898", "Root/ItemsWithNesting.prop": "lllll",  "Root/ItemsWithNesting/0/NestedItems/Value.value": 111},
        //         removed: [],
        //     }),
        //     headers: new Headers({ "Content-Type": `application/json` }),
        // });
        return response.json();
    }

    public async changeInnerNode(changedInnerNode: InnerNodeItem) {
        const response = await this.load({
            baseUrl: `${COMMON_URL}/presentations/inner?src=changeSet&dataVersion=0`,
            method: Method.POST,
            body: JSON.stringify(changedInnerNode),
            headers: new Headers({ "Content-Type": `application/json` }),
        });

        return response;
    }

    private async load({ baseUrl, method = Method.GET, body = undefined, headers = new Headers() }: RequestParameters) {
        const response = await fetch(`${baseUrl}`, { method, body, headers, credentials: "include" });
        checkStatus(response);
        return response;
    }
}

export const getApi = (): Api => new Api();
