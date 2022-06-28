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
    _id: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    ingredients: string;
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


