export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_large: string;
    image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
    nanoid: string;
};

export type TOrder = {
    name: string;
    order: {
        number: number
    };
    success: boolean
}

export type TUser = {
    email: string,
    name: string
}

export interface IRegistrationReq {
    email: string,
    password: string,
    name: string
}

export interface IRegistrationResp {
    success: boolean,
    user: {
        email: string,
        name: string
    },
    accessToken: string,
    refreshToken: string
}

export interface ILoginReq {
    email: string,
    password: string
}

export interface ILoginResp {
    success: boolean,
    user: {
        email: string,
        name: string
    },
    accessToken: string,
    refreshToken: string
}

export interface IUserRequestReq {
    name: string,
    login: string,
    password: string,
}

export interface IUserRequestResp {
    success: boolean,
    user: {
        email: string,
        name: string
    },
}

export interface IGetIngredientsResp {
    success: boolean,
    data: TIngredient[],
}



export interface IOrderFromServer {
    createdAt: string,
    ingredients: Array<string>,
    name: string,
    number: string,
    owner: string,
    status: string,
    updatedAt: string,
    _id: string
}

export interface IOrdersFeed {
    orders: Array<IOrderFromServer>,
    total: number,
    totalToday: number
}

export interface IGetOrderResp {
    orders: Array<IOrderFromServer>,
    success: boolean
}

export interface IWsActions {
    wsInit: string,
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string
}
