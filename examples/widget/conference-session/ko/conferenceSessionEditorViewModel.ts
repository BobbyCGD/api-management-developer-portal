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
    public readonly initialCount: ko.Observable<string>;

    constructor() {
        this.initialCount = ko.observable("0");
    }

    @Param()
    public model: ConferenceSessionModel;

    @Event()
    public onChange: (model: ConferenceSessionModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        /*
           This method is called after component created. At this moment all the parameters,
           includinig "model", are available.
        */

        this.initialCount(this.model.initialCount?.toString());
        this.initialCount.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.initialCount = parseInt(this.initialCount());
        this.onChange(this.model);
    }
}