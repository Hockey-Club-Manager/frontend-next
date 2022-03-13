import {State} from "./state";

const initialState = {
    app: {
        mounted: false,
        tab: 1,
        sort: 2,
        filter: 1,
    },
    near: {
        initialized: false,
    },
    views: {
        marketStoragePaid: '0',
        tokens: [],
        sales: [],
        allTokens: [],
    }
};

export const { appStore, AppProvider } = State(initialState, 'app');