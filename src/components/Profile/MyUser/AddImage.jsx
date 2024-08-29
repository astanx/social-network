import React from "react";
import MyInput from "../../UI/Input/MyInput";
import { useForm } from "react-hook-form";
import MyButton from "../../UI/Button/MyButton";
import { setPhoto } from "../../../redux/profileReducer";

const AddImage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const submit = (data) => {
    setPhoto(data.image[0]);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <MyInput type={"file"} holder="image url" {...register("image")} />
      <MyButton name="add" />
    </form>
  );
};

export default AddImage;
