import "./polyfills";
import "./bindingHandlers/scrollintoview";
import "./bindingHandlers/copyToClipboard";
import "./bindingHandlers/syntaxHighlight";
import "./bindingHandlers/markdown";
import "./bindingHandlers/barChart";
import "./bindingHandlers/mapChart";
import "./bindingHandlers/minMaxAvgChart";
import "./bindingHandlers/acceptChange";
import "@paperbits/core/ko/bindingHandlers/bindingHandlers.component";
import "@paperbits/core/ko/bindingHandlers/bindingHandlers.focus";
import "@paperbits/core/ko/bindingHandlers/bindingHandlers.activate";
import { RouteHelper } from "./routing/routeHelper";
import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { DefaultEventManager } from "@paperbits/common/events";
import { XmlHttpRequestClient } from "@paperbits/common/http";
import { SettingsProvider } from "@paperbits/common/configuration";
import { DefaultRouter } from "@paperbits/common/routing";
import { ConsoleLogger } from "@paperbits/common/logging";
import { KnockoutRegistrationLoaders } from "@paperbits/core/ko/knockout.loaders";
import { ApiList, ApiListDropdown, ApiListTiles } from "./components/apis/list-of-apis/ko/runtime";
import { ApiService } from "./services/apiService";
import { TagService } from "./services/tagService";
import { TenantService } from "./services/tenantService";
import { AnalyticsService } from "./services/analyticsService";
import { ApiDetails } from "./components/apis/details-of-api/ko/runtime/api-details";
import { ApiHistory } from "./components/apis/history-of-api/ko/runtime/api-history";
import { OperationDetails } from "./components/operations/operation-details/ko/runtime/operation-details";
import { OperationConsole } from "./components/operations/operation-details/ko/runtime/operation-console";
import { ProductService } from "./services/productService";
import { FileInput } from "./components/file-input/file-input";
import { MapiClient } from "./services/mapiClient";
import { UsersService } from "./services/usersService";
import { UserSignin } from "./components/users/user-signin/ko/runtime/user-signin";
import { SignInAad } from "./components/users/user-signin-social/ko/runtime/signin-aad";
import { SignInAadB2C } from "./components/users/user-signin-social/ko/runtime/signin-aad-b2c";
import { UserSignup } from "./components/users/user-signup/ko/runtime/user-signup";
import { UserSignupSocial } from "./components/users/user-signup-social/ko/runtime/user-signup-social";
import { UserDetails } from "./components/users/user-details/ko/runtime/user-details";
import { UserSubscriptions } from "./components/users/user-subscriptions/ko/runtime/user-subscriptions";
import { ProductList } from "./components/products/product-list/ko/runtime/product-list";
import { ProductDetails } from "./components/products/product-details/ko/runtime/product-details";
import { ProductSubscribe } from "./components/products/product-subscribe/ko/runtime/product-subscribe";
import { DefaultAuthenticator } from "./components/defaultAuthenticator";
import { Spinner } from "./components/spinner/spinner";
import { ProductApis } from "./components/products/product-apis/ko/runtime/product-apis";
import { OperationList } from "./components/operations/operation-list/ko/runtime/operation-list";
import { ProductSubscriptions } from "./components/products/product-subscriptions/ko/runtime/product-subscriptions";
import { AadService } from "./services/aadService";
import { BackendService } from "./services/backendService";
import { HipCaptcha } from "./components/users/runtime/hip-captcha/hip-captcha";
import { ResetPassword } from "./components/users/reset-password/ko/runtime/reset-password";
import { ConfirmPassword } from "./components/users/confirm-password/ko/runtime/confirm-password";
import { ChangePassword } from "./components/users/change-password/ko/runtime/change-password";
import { Reports } from "./components/reports/ko/runtime/reports";
import { UnhandledErrorHandler } from "./bindingHandlers/unhandledErrorHandler";
import { ProductListDropdown } from "./components/products/product-list/ko/runtime/product-list-dropdown";
import { ValidationSummary } from "./components/users/validation-summary/ko/runtime/validation-summary";
import { TypeDefinitionViewModel } from "./components/operations/operation-details/ko/runtime/type-definition";
import { VisibilityGuard } from "@paperbits/common/user";
import { StaticUserService } from "./services";
import { SignOutRouteGuard } from "./routing/signOutRouteGuard";
import { ProvisionService } from "./services/provisioningService";
import { ClickCounterRuntimeModule } from "../examples/widget/click-counter/clickCounter.runtime.module";

export class ApimRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new KnockoutRegistrationLoaders());
        injector.bindModule(new ClickCounterRuntimeModule());
        injector.bindSingleton("eventManager", DefaultEventManager);
        injector.bindSingleton("logger", ConsoleLogger);
        injector.bindCollection("autostart");
        injector.bindToCollection("autostart", UnhandledErrorHandler);
        injector.bindCollection("routeGuards");
        injector.bindToCollection("routeGuards", SignOutRouteGuard);
        injector.bindToCollection("autostart", VisibilityGuard);
        injector.bindSingleton("router", DefaultRouter);
        injector.bind("apiList", ApiList);
        injector.bind("apiListDropdown", ApiListDropdown);
        injector.bind("apiListTiles", ApiListTiles);
        injector.bind("apiDetails", ApiDetails);
        injector.bind("apiHistory", ApiHistory);
        injector.bind("operationDetails", OperationDetails);
        injector.bind("operationConsole", OperationConsole);
        injector.bind("typeDefinition", TypeDefinitionViewModel);
        injector.bind("fileInput", FileInput);
        injector.bind("apiService", ApiService);
        injector.bind("tagService", TagService);
        injector.bind("productService", ProductService);
        injector.bind("analyticsService", AnalyticsService);
        injector.bind("userSignin", UserSignin);
        injector.bind("signInAad", SignInAad);
        injector.bind("signInAadB2C", SignInAadB2C);
        injector.bind("userSignup", UserSignup);
        injector.bind("userSignupSocial", UserSignupSocial);
        injector.bind("userDetails", UserDetails);
        injector.bind("userSubscriptions", UserSubscriptions);
        injector.bind("productList", ProductList);
        injector.bind("productListDropdown", ProductListDropdown);
        injector.bind("validationSummary", ValidationSummary);
        injector.bind("productDetails", ProductDetails);
        injector.bind("productSubscribe", ProductSubscribe);
        injector.bind("productSubscriptions", ProductSubscriptions);
        injector.bind("productApis", ProductApis);
        injector.bind("operationList", OperationList);
        injector.bind("operationDetails", OperationDetails);
        injector.bind("usersService", UsersService);
        injector.bind("reports", Reports);
        injector.bind("hipCaptcha", HipCaptcha);
        injector.bind("resetPassword", ResetPassword);
        injector.bind("confirmPassword", ConfirmPassword);
        injector.bind("changePassword", ChangePassword);
        injector.bind("spinner", Spinner);
        injector.bindSingleton("tenantService", TenantService);
        injector.bindSingleton("backendService", BackendService);
        injector.bindSingleton("aadService", AadService);
        injector.bindSingleton("mapiClient", MapiClient);
        injector.bindSingleton("httpClient", XmlHttpRequestClient);
        injector.bindSingleton("settingsProvider", SettingsProvider);
        injector.bindSingleton("authenticator", DefaultAuthenticator);
        injector.bindSingleton("routeHelper", RouteHelper);
        injector.bindSingleton("userService", StaticUserService);
        injector.bindSingleton("provisioningService", ProvisionService);
    }
}