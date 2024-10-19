import React from "react";
import * as Yup from "yup";
import { CredentialsModel } from "../../models/auth.model";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../../components/text-field/TextField";
import { Button } from "../../components/button/Button";

interface LoginPageProps {
  login: (token: string) => void;
}

const onSubmit = () => {
  // login logic here
};

const LoginPage = () => {
  const initialValues: CredentialsModel = { email: "", password: "" };

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsModel>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card shadow mt-3">
            <div className="card-body">
              <h5 className="card-title text-center">Sign in</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  name="email"
                  label="Email"
                  className="mb-3"
                  register={register}
                  error={errors.email?.message}
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  className="mb-3"
                  register={register}
                  error={errors.password?.message}
                />
                <Button color="primary" type="submit">
                  Sign in
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
