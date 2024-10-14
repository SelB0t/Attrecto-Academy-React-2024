import React, { useCallback, useEffect, useState } from "react";

import { Page } from "../../components/page/Page";
import { UserModel } from "../../models/user.model";
import { userService } from "../../services/user.service";
import { Button } from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faTableList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./UsersPage.module.scss";

interface ViewMode {
  active: "card" | "table";
  cardButtonColor: "primary" | "secondary";
  tableButtonColor: "primary" | "secondary";
}

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setUsers(await userService.getUsers());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const goToUserPage = () => {
    navigate("/user");
  };

  const handleDeleteUser = async (id: string | number) => {
    await userService.deleteUser(id);

    fetchUsers();
  };

  const [viewMode, setViewMode] = useState<ViewMode>({
    active: "card",
    cardButtonColor: "primary",
    tableButtonColor: "secondary",
  });

  const changeViewMode = (mode: string) => {
    setViewMode((currentMode) => {
      return mode == "card"
        ? {
            active: "card",
            cardButtonColor: "primary",
            tableButtonColor: "secondary",
          }
        : {
            active: "table",
            cardButtonColor: "secondary",
            tableButtonColor: "primary",
          };
    });
  };

  return (
    <Page title="Users">
      <div className="row justify-content-center">
        <div className="col-auto text-center">
          <Button
            color={viewMode.cardButtonColor}
            onClick={() => changeViewMode("card")}
          >
            <FontAwesomeIcon icon={faGripHorizontal}></FontAwesomeIcon> Card
          </Button>
        </div>
        <div className="col-auto text-center">
          <Button
            color={viewMode.tableButtonColor}
            onClick={() => changeViewMode("table")}
          >
            <FontAwesomeIcon icon={faTableList}></FontAwesomeIcon> Table
          </Button>
        </div>
      </div>

      {viewMode.active == "card" && (
        <>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Button
                color="primary"
                className="w-100 mb-3"
                onClick={goToUserPage}
              >
                Create User
              </Button>
            </div>
          </div>
          <div className="row">
            {users.map(({ id, name, image }) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1">
                <Link
                  to={`/user/${id}`}
                  className={classNames("card", classes.UserCard)}
                >
                  <img
                    src={image}
                    alt={`user #${id}`}
                    className={classNames("card-img-top", classes.UserImage)}
                  />
                  <div className="card-body">
                    <h5>{name}</h5>
                  </div>
                  <Button
                    className={classes.DeleteIcon}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteUser(id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
      {viewMode.active == "table" && (
        <>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Button
                color="primary"
                className="w-100 mb-3"
                onClick={goToUserPage}
              >
                Create User
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Picture</th>
                    <th scope="col">Name</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(({ id, name, image }) => (
                    <tr key={id}>
                      <td>
                        <Link
                          className={classNames(classes.tableData)}
                          to={`/user/${id}`}
                        >
                          {id}
                        </Link>{" "}
                      </td>
                      <td>
                        <Link to={`/user/${id}`}>
                          <img
                            src={image}
                            alt={`user #${id}`}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          className={classNames(classes.tableData)}
                          to={`/user/${id}`}
                        >
                          {name}
                        </Link>
                      </td>
                      <td>
                        <Button
                          className={classes.DeleteIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

export default UsersPage;
