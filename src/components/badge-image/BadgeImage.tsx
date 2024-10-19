import classNames from "classnames";

import classes from "./BadgeImage.module.scss";

interface BadgeImageProps {
  url: string;
  small?: boolean;
  className?: string;
}

const BadgeImage = ({ url, small, className }: BadgeImageProps) => {
  return (
    <div
      className={classNames(
        classes.BadgeImage,
        { [classes.Small]: small },
        className
      )}
      style={{ backgroundImage: `url(${url})` }}
    />
  );
};

export default BadgeImage;
