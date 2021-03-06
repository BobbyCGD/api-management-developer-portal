﻿import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { UserSigninSocialModel } from "./userSigninSocialModel";


export class UserSigninSocialHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "userSigninSocial",
            category: "User",
            displayName: "Sign in: OAuth",
            iconClass: "paperbits-cheque-3",
            requires: ["scripts"],
            createModel: async () => new UserSigninSocialModel()
        };

        return widgetOrder;
    }
}