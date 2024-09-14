export type SetFetchingActionType = {
  type: "SET_FETCHING";
  isFetching: boolean;
};
export type UserType = {
  name: string;
  id: number;
  photos: {
    small: null | string;
    large: null | string;
  };
  status: null | string;
  followed: boolean;
};
export type MessagesListDataType = {
  map(arg0: (message: any) => import("react").JSX.Element): unknown;
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: {
    small: null | string;
    large: null | string;
  };
};
export type SendMessageDataType = {
  id: string;
  body: string;
  translatedBody: null;
  addedAt: string;
  senderId: number;
  senderName: string;
  recipientId: number;
  recipientName: string;
  viewed: boolean;
  deletedBySender: boolean;
  deletedByRecipient: boolean;
  isSpam: boolean;
  distributionId: null;
};
export type UserProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  FullName: string;
  aboutMe: string | null;
  contacts: {
    github: string | null ;
    vk: string | null;
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    website: string | null;
    youtube: string | null;
    mainLink: string | null;
  };
  photos: {
    small: string | null;
    large: string | null;
  };
};

export type DialogData = {
  items: [
    {
      id: number;
      body: string;
      translatedBody: null;
      addedAt: string;
      senderId: number;
      senderName: string;
      recipientId: number;
      viewed: boolean;
    }
  ];
  totalCount: number;
  error: null;
};

export type NewPostType = {
  message: string;
  name: string;
  id: number;
  time: string | null
};

export type ProfileStateProps = {
  PostData: Array<NewPostType>;
  userId: null | number;

  userProfile: null | UserProfileType;
  status: null | string;
  photo: null | string;
  isLogined: boolean;
 isMyUser: boolean
};

type ProfileDispatchProps = {
  addPost: (userName: string, postText: string) => void;
  setPhoto: (photo: string) => void;
  getProfile: (userId: number) => void;
  createDialog: (userId: number) => void;
  changeProfile: (profile: UserProfileType, id: number) => void;
  updateStatus: (status: string) => void;
  deletePost: (postId: number) => void;
};

export type ProfilePropsType = any;
export type ApiResponseType = {
  resultCode: number;
  messages: Array<string>;
  data: any;
};
