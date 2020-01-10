import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { ConferenceSessionModel } from "./conferenceSessionModel";
import { widgetName, widgetDisplayName } from "./constants";


export class ConferenceSessionHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: widgetName,
            displayName: widgetDisplayName,
            iconClass: "paperbits-puzzle-10",
            createModel: async () => {
                return new ConferenceSessionModel();
            }
        };

        return widgetOrder;
    }
}