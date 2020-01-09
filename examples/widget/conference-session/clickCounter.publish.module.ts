import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ClickCounterViewModel } from "./ko/clickCounterViewModel";
import { ClickCounterModelBinder } from "./clickCounterModelBinder";
import { ClickCounterViewModelBinder } from "./ko/clickCounterViewModelBinder";


export class ClickCounterPublishModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("clickCounter", ClickCounterViewModel);
        injector.bindToCollection("modelBinders", ClickCounterModelBinder);
        injector.bindToCollection("viewModelBinders", ClickCounterViewModelBinder);
    }
}