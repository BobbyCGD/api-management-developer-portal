import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ClickCounterEditor } from "./ko/clickCounterEditor";
import { ClickCounterHandlers } from "./clickCounterHandlers";
import { ClickCounterViewModel, ClickCounterViewModelBinder } from "./ko";
import { ClickCounterModelBinder } from ".";

export class ClickCounterDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("clickCounter", ClickCounterViewModel);
        injector.bind("clickCounterEditor", ClickCounterEditor);
        injector.bindToCollection("modelBinders", ClickCounterModelBinder);
        injector.bindToCollection("viewModelBinders", ClickCounterViewModelBinder);
        injector.bindToCollection("widgetHandlers", ClickCounterHandlers);
    }
}