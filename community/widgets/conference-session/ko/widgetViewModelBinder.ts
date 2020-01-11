import { Bag } from "@paperbits/common";
import { EventManager } from "@paperbits/common/events";
import { IWidgetBinding } from "@paperbits/common/editing";
import { widgetName, widgetDisplayName, widgetEditorSelector } from "../constants";
import { WidgetViewModel } from "./widgetViewModel";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { WidgetModel } from "../widgetModel";


export class WidgetViewModelBinder implements ViewModelBinder<WidgetModel, WidgetViewModel>  {
    constructor(private readonly eventManager: EventManager) { }

    public async updateViewModel(model: WidgetModel, viewModel: WidgetViewModel): Promise<void> {
        viewModel.runtimeConfig(JSON.stringify({ sessionId: model.sessionId }));
    }

    public async modelToViewModel(model: WidgetModel, viewModel?: WidgetViewModel, bindingContext?: Bag<any>): Promise<WidgetViewModel> {
        if (!viewModel) {
            viewModel = new WidgetViewModel();

            const binding: IWidgetBinding<WidgetModel> = {
                name: widgetName,
                displayName: widgetDisplayName,
                readonly: bindingContext ? bindingContext.readonly : false,
                model: model,
                editor: widgetEditorSelector,
                applyChanges: async () => {
                    await this.updateViewModel(model, viewModel);
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            };
            viewModel["widgetBinding"] = binding;
        }

        this.updateViewModel(model, viewModel);

        return viewModel;
    }

    public canHandleModel(model: WidgetModel): boolean {
        return model instanceof WidgetModel;
    }
}