import React from "react";
import MyInput from "../../UI/Input/MyInput.tsx";
import { useForm } from "react-hook-form";
import MyButton from "../../UI/Button/MyButton";


const AddImage = (props) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const submit = (data) => {
    props.setPhoto(data.image[0]);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <MyInput type={"file"} holder="image url" {...register("image")} />
      <MyButton name="Change image" />
    </form>
  );
};

export default AddImage;
