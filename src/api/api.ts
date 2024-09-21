import axios from "axios";
import {
  ApiResponseType,
  DialogData,
  MessagesListDataType,
  UserProfileType,
} from "../redux/types/types";
const API_KEY = "a83b103e-23b0-41c5-b818-1707e71fa142";
const intense = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": API_KEY,
  },
});

export enum ResultCode {
  Success = 0,
  Error = 1,
  RequiredCaptcha = 10,
}

export type GetUsersType = {
  items: Array<{
    id: number;
    name: string;
    status: null | string;
    photos: {
      small: null | string;
      large: null | string;
    };
    followed: boolean;
  }>;
  totalCount: number;
  error: string;
};

export const userAPI = {
  unfollow: async (id: number) => {
    const res = await intense.delete<ApiResponseType>(`follow/${id}`);
    return res.data;
  },
  follow: async (id: number) => {
    const res = await intense.post<ApiResponseType>(`follow/${id}`);
    return res.data;
  },
  getUsers: async (
    pageSize: number,
    currentPage: number | null = 1,
    term: string,
    friend: boolean | null
  ) => {
    const res = await intense.get<GetUsersType>(
      `users?count=${pageSize}&page=${currentPage}&term=${term}&friend=${friend}`
    );
    return res.data;
  },
};

export const profileAPI = {
  getProfile: (userId: number) => {
    return intense.get<UserProfileType>(`profile/${userId}`);
  },
  updateStatus: (status: string) => {
    return intense.put<ApiResponseType>(`profile/status`, { status });
  },
  getStatus: async (userId: number) => {
    const res = await intense.get(`profile/status/${userId}`);

    return res.data;
  },
  setPhoto: (image: string) => {
    const formData = new FormData();
    formData.append("image", image);
    return intense.put<ApiResponseType>(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  changeProfile: async (profile: UserProfileType) => {
    const res = await intense.put<UserProfileType>(`profile`, { ...profile });
    return res.data;
  },
};

export type LoginType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: number;
  messages: Array<string>;
};

export const loginAPI = {
  auth: () => {
    return intense.get<LoginType>(`auth/me`);
  },
  login: (
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null
  ) => {
    return intense.post<ApiResponseType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout: () => {
    return intense.post<ApiResponseType>(`auth/logout`);
  },
  getCaptcha: () => {
    return intense.get(`security/get-captcha-url`);
  },
};

export const dialogAPI = {
  getMessageList: async () => {
    const res = await intense.get<MessagesListDataType>(`dialogs`);
    return res.data;
  },
  getDialog: async (userId: number) => {
    const res = await intense.get<DialogData>(`dialogs/${userId}/messages`);
    return res.data;
  },
  sendMessage: (userId: number, body: string): Promise<ApiResponseType> => {
    return intense.post(`dialogs/${userId}/messages`, { body });
  },
  createDialog: (userId: number): Promise<ApiResponseType> => {
    return intense.put(`dialogs/${userId}`);
  },
  deleteMessage: (messageId: number): Promise<ApiResponseType> => {
    return intense.delete(`dialogs/messages/${messageId}`);
  },
};
