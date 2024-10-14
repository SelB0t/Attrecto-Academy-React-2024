import React from "react";
import { useForm, UseFormRegister, UseFormWatch } from "react-hook-form";
import "./ProfileImage.scss"
import classNames from "classnames";

interface ProfileImageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
}

function ProfileImage({ watch }: ProfileImageProps) {
  return (
    <>
      <h1 className="p-2 align-content-center">Profile Picture Preview: </h1>
      <img className={classNames("image-preview")} src={watch("image")}></img>
    </>
  );
}

export default ProfileImage;
