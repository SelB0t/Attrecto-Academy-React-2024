import { BadgeModel } from "../../models/badges.model";
import { hasPermission } from "../../util/hasPermission";
import classes from "../../pages/BadgesPage/Badges.module.scss";
import classNames from "classnames";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccessController from "../access-controller/AccessController";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";

interface BadgeCardProps {
  badge: BadgeModel;
  handleDeleteBadge: (badgeId: string | number) => void;
}

const BadgeCard = ({ badge, handleDeleteBadge }: BadgeCardProps) => {
  const { id, name, description, image } = badge;

  const allowedBadgeChangeFor: Role[] = ["ADMIN"];

  const showLink = hasPermission(allowedBadgeChangeFor);
  

  return (showLink ?
    <Link to={`/badge/${id}`} key={id} className={classNames("col-lg-4 col-md-6 col-sm-12", classes.BadgeCard)}>
      <div
        className={classNames(
          "d-flex box-shadow align-items-center",
          classes.Badge
        )}
      >
        <div
          className={classes.BadgeImage}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="d-flex flex-column">
          <h5 className="ms-3">{name}</h5>
          <p className="ms-3 text-black-50">{description}</p>
        </div>
        <AccessController allowedFor={allowedBadgeChangeFor}>
          <Button
            className={classNames(classes.DeleteIcon, "ms-auto")}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteBadge(id.toString());
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </AccessController>
      </div>
    </Link> : 
        <div key={id} className={classNames("col-lg-4 col-md-6 col-sm-12", classes.BadgeCard)}>
        <div
          className={classNames(
            "d-flex box-shadow align-items-center",
            classes.Badge
          )}
        >
          <div
            className={classes.BadgeImage}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="d-flex flex-column">
            <h5 className="ms-3">{name}</h5>
            <p className="ms-3 text-black-50">{description}</p>
          </div>
          <AccessController allowedFor={allowedBadgeChangeFor}>
            <Button
              className={classNames(classes.DeleteIcon, "ms-auto")}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteBadge(id.toString());
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </AccessController>
        </div>
      </div>

  );
};

export default BadgeCard;
