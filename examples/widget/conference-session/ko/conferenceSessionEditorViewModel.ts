import * as ko from "knockout";
import template from "./conferenceSessionEditorView.html";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";
import { ConferenceSessionModel } from "../conferenceSessionModel";
import { widgetEditorSelector } from "..";


@Component({
    selector: widgetEditorSelector,
    template: template
})
export class ConferenceSessionEditor implements WidgetEditor<ConferenceSessionModel> {
    public readonly sessionId: ko.Observable<string>;

    constructor() {
        this.sessionId = ko.observable();
    }

    @Param()
    public model: ConferenceSessionModel;

    @Event()
    public onChange: (model: ConferenceSessionModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.sessionId(this.model.sessionId);
        this.sessionId.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.sessionId = this.sessionId();
        this.onChange(this.model);
    }
}