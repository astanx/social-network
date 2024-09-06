import messagesReducer, {
  sendMessageAC,
  setDialog,
  setFetching,
  setMessagesList,
} from "./messagesReducer.ts";

let getInitialState = () => ({
  MessagesData: [],
  DialogData: {
    items: [],
  },
  isFetching: false,
});

describe("Messages Reducer Tests", () => {
  it("should send message", () => {
    let initialState = getInitialState();
    let message = {
      id: "d412dfad-6c75-41d6-a46e-dda176641d63",
      body: "hi",
      translatedBody: null,
      addedAt: "2024-08-28T08:40:22.017",
      senderId: 31574,
      senderName: "fox2893",
      recipientId: 7,
      recipientName: "tinirait",
      viewed: false,
      deletedBySender: false,
      deletedByRecipient: false,
      isSpam: false,
      distributionId: null,
    };
    let newState = messagesReducer(initialState, sendMessageAC(message));

    expect(newState.DialogData.items.length).toBe(1);
    expect(newState.DialogData.items[0]).toEqual(message);
  });
  it("should set fetching", () => {
    const initialState = getInitialState();
    const newState = messagesReducer(initialState, setFetching(true));

    expect(newState.isFetching).toBe(true);
  });

  it("should set message list", () => {
    const initialState = getInitialState();
    const messages = [
      {
        id: 31514,
        userName: "suio",
        hasNewMessages: false,
        lastDialogActivityDate: "2024-08-28T09:00:47.637",
        lastUserActivityDate: "2024-08-06T22:53:15.73",
        newMessagesCount: 0,
        photos: {
          small: null,
          large: null,
        },
      },
      {
        id: 31522,
        userName: "Ankana",
        hasNewMessages: false,
        lastDialogActivityDate: "2024-08-28T09:00:22.793",
        lastUserActivityDate: "2024-08-08T23:03:36.517",
        newMessagesCount: 0,
        photos: {
          small: null,
          large: null,
        },
      },
      {
        id: 31532,
        userName: "PiggyBoss777",
        hasNewMessages: false,
        lastDialogActivityDate: "2024-08-28T09:00:09.043",
        lastUserActivityDate: "2024-08-12T05:46:32.66",
        newMessagesCount: 0,
        photos: {
          small: null,
          large: null,
        },
      },
    ];
    const newState = messagesReducer(initialState, setMessagesList(messages));

    expect(newState.MessagesData.length).toBe(3);
    expect(newState.MessagesData).toEqual(messages);
    expect(newState.MessagesData[2].id).toBe(31532);
  });
  it("should set dialog", () => {
    const initialState = getInitialState();
    const dialog = {
      items: [
        {
          id: "d412dfad-6c75-41d6-a46e-dda176641d63",
          body: "hi",
          translatedBody: null,
          addedAt: "2024-08-28T08:40:22.017",
          senderId: 31574,
          senderName: "fox2893",
          recipientId: 7,
          recipientName: "tinirait",
          viewed: false,
          deletedBySender: false,
          deletedByRecipient: false,
          isSpam: false,
          distributionId: null,
        },
      ],
      totalCount: 0,
      error: null,
    };
    const newState = messagesReducer(initialState, setDialog(dialog));

    expect(Object.keys(newState.DialogData).length).toBe(3);
    expect(newState.DialogData.items.length).toBe(1);
    expect(newState.DialogData.items).toEqual(dialog.items);
    
  });
});
