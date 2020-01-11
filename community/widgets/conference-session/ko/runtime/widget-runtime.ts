import template from "./widget-runtime.html";
import { Component, RuntimeComponent, OnMounted, OnDestroyed, Param } from "@paperbits/common/ko/decorators";
import * as ko from "knockout";
import { widgetRuntimeSelector } from "../../constants";
import { HttpClient, HttpRequest } from "@paperbits/common/http";


@RuntimeComponent({
    selector: widgetRuntimeSelector
})
@Component({
    selector: widgetRuntimeSelector,
    template: template
})
export class WidgetRuntime {
    public readonly sessionDescription: ko.Observable<string>;

    constructor(private readonly httpClient: HttpClient) {
        this.sessionId = ko.observable();
        this.sessionDescription = ko.observable();
    }

    @Param()
    public readonly sessionId: ko.Observable<string>;

    @OnMounted()
    public async initialize(): Promise<void> {
        const sessionId = this.sessionId();

        const request: HttpRequest = {
            url: `https://conferenceapi.azurewebsites.net/session/${sessionId}`,
            method: "GET"
        };

        const response = await this.httpClient.send<string>(request);
        const sessionDescription = response.toText();

        this.sessionDescription(sessionDescription);
    }
}