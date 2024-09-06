import React, { useEffect, useState } from "react";
import MyInput from "../../UI/Input/MyInput";
import logo from "./../../UI/Images/logo.png";
import classes from "./MyUser.module.css";
import github from "./../../UI/Images/github.png";
import MyButton from "../../UI/Button/MyButton";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import messages from './../../UI/Images/messages.png'

const MyUser = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  return isEditing && props.id ? (
    <ChangeProfile
      {...props}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
  ) : (
    <ProfileData {...props} isEditing={isEditing} setIsEditing={setIsEditing} />
  );
};

const ProfileData = ({ setIsEditing, isEditing, ...props }) => {
  const { userId } = useParams();

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
              : props.userProfile.photos.small
              ? props.userProfile.photos.small
              : logo
          }
          className={classes.logo}
        />
        {!props.id ? (
          <NavLink to={`/messages/${userId}`}>
            {" "}
            <img src={messages}
              className={classes.start_dialog}
              name="start dialog"
              onClick={() => {
                props.createDialog(userId);
              }}
            />{" "}
          </NavLink>
        ) : (
          <button onClick={() => setIsEditing(true)}>edit</button>
        )}
        <div className={classes.contactHrefs}>
          {props.userProfile.contacts.github ? (
            <a href={normalizeUrl(props.userProfile.contacts.github)}>
              <img src={github} />
            </a>
          ) : null}
        </div>
      </div>

      <div className={classes.Description}>
        <div>
          <span>Name: </span>
          <span>{props.userProfile.fullName}</span>
        </div>

        {props.userProfile.aboutMe ? (
          <div>
            <span>About: </span>
            <span>{props.userProfile.aboutMe}</span>
          </div>
        ) : (
          ""
        )}
        <div>
          <span>Job: </span>
          <span>{props.userProfile.lookingForAJob ? "looking" : "have"}</span>
        </div>
        {props.userProfile.lookingForAJobDescription ? (
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

const ChangeProfile = ({ setIsEditing, isEditing, ...props }) => {
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      FullName: props.userProfile.fullName,
      AboutMe: props.userProfile.aboutMe,
      LookingForAJobDescription: props.userProfile.lookingForAJobDescription,
      Status: props.status,
      lookingForAJob: props.userProfile.lookingForAJob,
      github: props.userProfile.contacts.github,
    },
  });

  const submit = (data) => {
    data["contacts"] = { github: data.github };
    console.log(data);

    if (data.image[0]) {
      props.setPhoto(data.image[0]);
    }
    props.updateStatus(data.Status);
    props.changeProfile(data, userId ? userId : props.id);
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
              : props.userProfile.photos.small
              ? props.userProfile.photos.small
              : logo
          }
          className={classes.logo}
          alt="Profile"
        />
        <div class={classes.file_input_wrapper}>
          <input
            type="file"
            placeholder="image url"
            class={classes.file_input}
            {...register("image")}
          />
          <span class={classes.file_label}>Выберите изображение</span>
        </div>
      </div>

      <div className={classes.Description}>
        <div>
          <span>Name: </span>
          <MyInput
            holder="Name (required)"
            {...register("FullName", { required: true })}
          />
        </div>

        <div>
          <span>About: </span>
          <MyInput
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
            {...register("LookingForAJobDescription", { required: true })}
            holder="Job Description (required)"
          />
        </div>
        <div>
          <span>Status: </span>
          <MyInput {...register("Status")} holder="Status" />
        </div>
        <div>
          <span>Github Page: </span>
          <MyInput holder="github page" {...register("github")} />
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
