import { widgetName, widgetDisplayName } from "./../contants";
import { WidgetViewModel } from "./widgetViewModel";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { WidgetModel } from "../widgetModel";
import { EventManager } from "@paperbits/common/events";
import { IWidgetBinding } from "@paperbits/common/editing";
import { Bag } from "@paperbits/common";

export class WidgetViewModelBinder implements ViewModelBinder<WidgetModel, WidgetViewModel>  {
    constructor(private readonly eventManager: EventManager) { }

    public async modelToViewModel(model: WidgetModel, viewModel?: WidgetViewModel, bindingContext?: Bag<any>): Promise<WidgetViewModel> {
        if (!viewModel) {
            viewModel = new WidgetViewModel();
        }

        viewModel.runtimeConfig(JSON.stringify({
            // property: value 
        }));

        const binding: IWidgetBinding<WidgetModel> = {
            name: widgetName,
            displayName: widgetDisplayName,
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            editor: "widget-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: WidgetModel): boolean {
        return model instanceof WidgetModel;
    }
}