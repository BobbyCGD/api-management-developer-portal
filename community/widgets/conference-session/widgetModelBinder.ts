import { widgetName } from "./constants";
import { IModelBinder } from "@paperbits/common/editing";
import { WidgetModel } from "./widgetModel";
import { Contract } from "@paperbits/common";
import { WidgetContract } from "./widgetContract";

/**
 * This is a class that helps to prepare the model using data described
 * in the contract.
 */
export class WidgetModelBinder implements IModelBinder<WidgetModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === widgetName;
    }

    public canHandleModel(model: any): boolean {
        return model instanceof WidgetModel;
    }

    public async contractToModel(contract: WidgetContract): Promise<WidgetModel> {
        const model = new WidgetModel();
        model.sessionId = contract.sessionId || "107"; // 107 is the default session id
        // model.property = contract.property;
        return model;
    }

    public modelToContract(model: WidgetModel): Contract {
        const contract: WidgetContract = {
            type: widgetName,
            sessionId: model.sessionId
            // property: model.property
        };

        return contract;
    }
}
