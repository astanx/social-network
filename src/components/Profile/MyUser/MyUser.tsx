import React, { useState } from "react";
import MyInput from "../../UI/Input/MyInput.tsx";
import logo from "./../../UI/Images/logo.png";
import classes from "./MyUser.module.css";
import github from "./../../UI/Images/github.png";
import MyButton from "../../UI/Button/MyButton.tsx";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import messages from "./../../UI/Images/messages.png";
import { UserProfileType } from "../../../redux/types/types.ts";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../../redux/storeRedux.ts";
import { ProfileActionsTypes } from "../../../redux/profileReducer.ts";
import { useDispatch } from "react-redux";

const MyUser: React.FC<any> = (props) => {
 
  const [isEditing, setIsEditing] = useState(false);
  return isEditing && props.isMyUser ? (
    <ChangeProfile
      {...props}
      isEditing={isEditing}
      setIsEditing={setIsEditing}

    />
  ) : (
    <ProfileData {...props}  isEditing={isEditing} setIsEditing={setIsEditing} />
  );
};

type EditingProps = {
  setIsEditing: (isEditing: boolean) => void;
  isEditing: boolean;
};

type ProfileDataProps = {
  userProfile: UserProfileType | null;
  createDialog: (id: number) => void;
  photo: null | string;
  id: number | null;
  status: string | null;
  isMyUser: boolean
};

const ProfileData: React.FC<ProfileDataProps & EditingProps> = ({
  setIsEditing,
  isEditing,
  ...props
}) => {
  const { userId } = useParams();
  const dispatch: ThunkDispatch<AppStateType, void, ProfileActionsTypes> = useDispatch()
  const normalizeUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className={classes.Info}>
      <div className={classes.contact}>
        <img
          src={
            props.id && props.photo
              ? props.photo
              : props.userProfile?.photos.small
              ? props.userProfile.photos.small
              : logo
          }
          className={classes.logo}
        />
        {!props.isMyUser ? (
          <NavLink to={`/messages/${userId}`}>
            {" "}
            <img
              src={messages}
              className={classes.start_dialog}
              onClick={() => {
                dispatch(props.createDialog(Number(userId)));
              }}
            />{" "}
          </NavLink>
        ) : (
          <button onClick={() => setIsEditing(true)}>edit</button>
        )}
        <div className={classes.contactHrefs}>
          {props.userProfile?.contacts.github ? (
            <a href={normalizeUrl(props.userProfile.contacts.github)}>
              <img src={github} />
            </a>
          ) : null}
        </div>
      </div>

      <div className={classes.Description}>
        <div>
          <span>Name: </span>
          <span>{props.userProfile?.fullName}</span>
        </div>

        {props.userProfile?.aboutMe ? (
          <div>
            <span>About: </span>
            <span>{props.userProfile.aboutMe}</span>
          </div>
        ) : (
          ""
        )}
        <div>
          <span>Job: </span>
          <span>{props.userProfile?.lookingForAJob ? "looking" : "have"}</span>
        </div>
        {props.userProfile?.lookingForAJobDescription ? (
          <div>
            <span>Job Description: </span>
            <span>{props.userProfile.lookingForAJobDescription}</span>
          </div>
        ) : (
          ""
        )}

        <span>{props.status}</span>
      </div>
    </div>
  );
};

type ChangeProfileProps = {
  userProfile: UserProfileType | null;
  setPhoto: (file: string) => void;
  updateStatus: (status: string) => void;
  changeProfile: (data: any, userId: number) => void;
  photo: string | null;
  id: number | null;

  status: string | null;
};
type FormValues = {
  FullName: string;
  AboutMe: string | null;
  LookingForAJobDescription: string;
  Status: string | null;
  lookingForAJob: boolean;
  github: string | null;
  image: string | FileList;
};

const ChangeProfile: React.FC<ChangeProfileProps & EditingProps> = ({
  setIsEditing,
  isEditing,
  ...props
}) => {
  const { userId } = useParams();
  const dispatch: ThunkDispatch<AppStateType, void, ProfileActionsTypes> = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      FullName: props.userProfile?.fullName,
      AboutMe: props.userProfile?.aboutMe,
      LookingForAJobDescription: props.userProfile?.lookingForAJobDescription,
      Status: props.status,
      lookingForAJob: props.userProfile?.lookingForAJob,
      github: props.userProfile?.contacts.github,
    },
  });

  const submit = (data) => {
    data["contacts"] = { github: data.github };

    if (data.image[0]) {
      dispatch(props.setPhoto(data.image[0]));
    }
    dispatch( props.updateStatus(data.Status));
    dispatch(props.changeProfile(
      data,
      Number(userId) ? Number(userId) : Number(props.id)
    ))
    reset();
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={classes.Info}>
      <div className={classes.img_input_wrapper}>
        <img
          src={
            props.id && props.photo
              ? props.photo
              : props.userProfile?.photos.small
              ? props.userProfile?.photos.small
              : logo
          }
          className={classes.logo}
          alt="Profile"
        />
        <div className={classes.file_input_wrapper}>
          <input
            type="file"
            placeholder="image url"
            className={classes.file_input}
            {...register("image")}
          />
          <span className={classes.file_label}>Выберите изображение</span>
        </div>
      </div>

      <div className={classes.Description}>
        <div>
          <span>Name: </span>
          <MyInput
            iserror={undefined}
            holder="Name (required)"
            {...register("FullName", { required: true })}
          />
        </div>

        <div>
          <span>About: </span>
          <MyInput
            iserror={undefined}
            holder="About (required)"
            {...register("AboutMe", { required: true })}
          />
        </div>
        <div>
          <span>Looking for a Job: </span>
          <input type="checkbox" {...register("lookingForAJob")} />
        </div>
        <div>
          <span>Job Description: </span>
          <MyInput
            iserror={undefined}
            {...register("LookingForAJobDescription", { required: true })}
            holder="Job Description (required)"
          />
        </div>
        <div>
          <span>Status: </span>
          <MyInput
            iserror={undefined}
            {...register("Status")}
            holder="Status"
          />
        </div>
        <div>
          <span>Github Page: </span>
          <MyInput
            iserror={undefined}
            holder="github page"
            {...register("github")}
          />
        </div>
        <MyButton
          style={{ width: "200px", alignSelf: "center" }}
          type="submit"
          name="Save"
        />
      </div>
    </form>
  );
};
export default MyUser;
