import profileReducer, {
  actions
} from "./profileReducer.ts";

const getInitialState = () => ({
  PostData: [],
  userId: null,
  isFetching: false,
  userProfile: null,
  status: null,
});



describe("Profile Reducer Tests", () => {
  it("should delete post", () => {
    const initialState = getInitialState();
    const stateWithPost = profileReducer(initialState, actions.addPost("Dimas", "Hello"));
  
    expect(stateWithPost.PostData.length).toBe(1);
  
    const newState = profileReducer(stateWithPost, actions.deletePost(1));
  
    expect(newState.PostData.length).toBe(0);
  });
  it("should handle ADD-POST action", () => {
    const initialState = getInitialState();
    const newState = profileReducer(initialState, actions.addPost("Dimas", "Hello"));

    expect(newState.PostData.length).toBe(1);
    expect(newState.PostData[0]).toEqual({
      message: "Hello",
      name: "Dimas",
      id: 1,
      time: null,
    });

    const newState2 = profileReducer(
      newState,
      actions.addPost("Dimas", "Another Post")
    );
    expect(newState2.PostData.length).toBe(2);
    expect(newState2.PostData[1]).toEqual({
      message: "Another Post",
      name: "Dimas",
      id: 2,
      time: null,
    });
  });

  it("should set fetching", () => {
    const initialState = getInitialState();
    const newState = profileReducer(initialState, actions.setFetching(true));

    expect(newState.isFetching).toBe(true);
  });

  it("should set status", () => {
    const initialState = getInitialState();
    const newState = profileReducer(initialState, actions.setStatus("hello"));

    expect(newState.status).toEqual("hello");
  });

  it("should set user profile", () => {
    const initialState = getInitialState();
    const user = {
      aboutMe: null,
      contacts: {
        facebook: null,
        github: null,
        instagram: null,
        mainLink: null,
        twitter: null,
        vk: null,
        website: null,
        youtube: null,
      },
      fullName: "fox2893",
      lookingForAJob: false,
      lookingForAJobDescription: null,
      photos: { small: null, large: null },
      userId: 31574,
    };
    const newState = profileReducer(initialState, actions.setUserProfile(user));

    expect(newState.userProfile).toEqual(user);
    expect(newState.userProfile.fullName).toEqual("fox2893");
  });

  it("should handle empty user profile", () => {
    const initialState = getInitialState();
    const newState = profileReducer(initialState, actions.setUserProfile(null));

    expect(newState.userProfile).toBe(null);
  });
});
