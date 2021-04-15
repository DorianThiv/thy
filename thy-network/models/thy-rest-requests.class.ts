export enum RestRequests {

}

export class RestGetRequest {

    public request: string;

    constructor(request: string, options?: Map<string, any>, useTime = false) {
        this.request = `${request}`;
    }

}

export class RestPostRequest<T> {

    public request: string;
    public body: T;

    constructor(name: string, body: T, options?: Map<string, string>) {
        this.request = name;
        this.body = body;
    }

}

export class RestPutRequest<T> {

    public request: string;
    public body: any | T;

    constructor(name: string, body: any, options?: Map<string, string>) {
        this.request = `${name}`;
        if (options) {
            options.forEach((value: string, key: string) => {
                this.request += `&${key}=${value}`;
            });
        }
        this.body = body;
    }

}

export class RestDeleteRequest {

    public request: string;

    constructor(request: string) {
        this.request = `${request}`;
    }

}
