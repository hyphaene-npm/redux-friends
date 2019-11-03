/// <reference types="redux-persist" />
declare const createStore: (rootReducer: any, { customPersistConfig, mmiddlewares }?: {
    customPersistConfig?: {};
    mmiddlewares?: never[];
}) => {
    store: import("redux").Store<never, import("redux").Action<any>> & {
        dispatch: unknown;
    };
    persistor: import("redux-persist").Persistor;
};
export default createStore;
//# sourceMappingURL=createPersistedStore.d.ts.map