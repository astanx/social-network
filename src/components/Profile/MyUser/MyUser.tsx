import React, { useState } from "react";

import logo from "./../../UI/Images/logo.png";
import classes from "./MyUser.module.css";
import github from "./../../UI/Images/github.png";

import Button from "@mui/material/Button";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import messages from "./../../UI/Images/messages.png";
import { UserProfileType } from "../../../redux/types/types.ts";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../../redux/storeRedux.ts";
import { ProfileActionsTypes } from "../../../redux/profileReducer.ts";
import { useDispatch } from "react-redux";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

const MyUser: React.FC<any> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  return isEditing && props.isMyUser ? (
    <ChangeProfile
      {...props}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
  ) : (
    <ProfileData {...props} isEditing={isEditing} setIsEditing={setIsEditing} />
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
  isMyUser: boolean;
  login: string | null;
};

const ProfileData: React.FC<ProfileDataProps & EditingProps> = ({
  setIsEditing,
  isEditing,
  ...props
}) => {
  const { userId } = useParams();
  const dispatch: ThunkDispatch<AppStateType, void, ProfileActionsTypes> =
    useDispatch();
  const normalizeUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <Box className={classes.Info} sx={{ padding: 2 }}>
      <Box className={classes.contact} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={
            props.id && props.photo
              ? props.photo
              : props.userProfile?.photos.small
              ? props.userProfile.photos.small
              : logo
          }
          sx={{ width: 150, height: 150 }}
        />

        {!props.isMyUser ? (
          <NavLink to={`/messages/${userId}`} style={{ marginLeft: '16px' }}>
            <IconButton 
              onClick={() => dispatch(props.createDialog(Number(userId)))}
              sx={{ padding: 0 }} 
              aria-label="start dialog"
            >
              <img style={{width: '80px'}} src={messages} alt="Start Dialog" />
            </IconButton>
          </NavLink>
        ) : (
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}

        <Box className={classes.contactHrefs} sx={{ marginLeft: '16px' }}>
          {props.userProfile?.contacts.github ? (
            <a href={normalizeUrl(props.userProfile.contacts.github)} target="_blank" rel="noopener noreferrer">
              <img src={github} alt="GitHub" />
            </a>
          ) : null}
        </Box>
      </Box>

      <Box className={classes.Description} sx={{ marginTop: 2 }}>
        <Typography variant="body1">
          <strong>Name:</strong> {props.login || props.userProfile?.fullName}
        </Typography>

        {props.userProfile?.aboutMe && (
          <Typography variant="body1">
            <strong>About:</strong> {props.userProfile.aboutMe}
          </Typography>
        )}

        <Typography variant="body1">
          <strong>Job:</strong> {props.userProfile?.lookingForAJob ? "Looking" : "Have"}
        </Typography>

        {props.userProfile?.lookingForAJobDescription && (
          <Typography variant="body1">
            <strong>Job Description:</strong> {props.userProfile.lookingForAJobDescription}
          </Typography>
        )}

        <Typography variant="body1">{props.status}</Typography>
      </Box>
    </Box>
  );
};

type ChangeProfileProps = {
  userProfile: UserProfileType | null;
  setPhoto: (file: string) => void;
  updateStatus: (status: string) => void;
  changeProfile: (data: any, userId: number) => void;
  photo: string | null;
  id: number | null;
  login: string | null;
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
  const dispatch: ThunkDispatch<AppStateType, void, ProfileActionsTypes> =
    useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      FullName: props.login || props.userProfile?.fullName,
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
    dispatch(props.updateStatus(data.Status));
    dispatch(
      props.changeProfile(
        data,
        Number(userId) ? Number(userId) : Number(props.id)
      )
    );
    reset();
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={classes.Info}>
      <div className={classes.img_input_wrapper}>
        <Avatar
          src={
            props.id && props.photo
              ? props.photo
              : props.userProfile?.photos.small
              ? props.userProfile.photos.small
              : logo
          }
          sx={{ width: 150, height: 150 }}
        />

        <Box sx={{ margin: "20px" }}>
          <input
            accept="image/*"
            id="file-input"
            type="file"
            style={{ display: "none" }}
            {...register("image")}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              component="span"
              sx={{ marginRight: "10px" }}
            >
              Upload File
            </Button>
          </label>
        </Box>
      </div>

      <div className={classes.Description}>
        <TextField
          error={!!errors.FullName}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          {...register("FullName", { required: true })}
        />

        <TextField
          error={!!errors.AboutMe}
          id="outlined-basic"
          label="About"
          variant="outlined"
          {...register("AboutMe", { required: true })}
        />
        <TextField
          error={!!errors.LookingForAJobDescription}
          id="outlined-basic"
          label="Job Description"
          variant="outlined"
          {...register("LookingForAJobDescription", { required: true })}
        />
        <TextField
          id="outlined-basic"
          label="Status"
          variant="outlined"
          {...register("Status", { required: true })}
        />
        <TextField
          id="outlined-basic"
          label="GitHub Page"
          variant="outlined"
          {...register("github", { required: true })}
        />
        <FormGroup>
          <FormControlLabel
            label="Looking for a job: "
            control={<Checkbox />}
            {...register("lookingForAJob")}
          />
        </FormGroup>

        <Button
          style={{ width: "200px", alignSelf: "center" }}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
export default MyUser;
