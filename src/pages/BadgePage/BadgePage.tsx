import * as Yup from "yup";
import { BadgeFormValues, BadgeModel } from "../../models/badges.model";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { badgesService } from "../../services/badges.service";
import { Page } from "../../components/page/Page";
import { Button } from "../../components/button/Button";
import ProfileImage from "../../components/profile-image-preview/ProfileImage";
import TextField from "../../components/text-field/TextField";

const schema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  image: Yup.string().required(),
});

const BadgePage = () => {
  const { id } = useParams<{ id: string }>();
  const [badge, setBadge] = useState<BadgeModel>();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BadgeFormValues>({
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchBadge = async (id: string | number) => {
      const respone = await badgesService.getBadge(id);
      setBadge(respone);
    };

    if (id) {
      fetchBadge(id);
    }
  }, [id]);

  useEffect(() => {
    reset({
      name: badge?.name,
      description: badge?.description,
      image: badge?.image,
    });
  }, [reset, badge?.name, badge?.description, badge?.image]);

  const onSubmit = async (values: BadgeFormValues) => {
    if (badge?.id) {
      await badgesService.updateUser(badge.id, values);
    } else {
      await badgesService.createBadge(values);
    }
    goToBadgesPage();
  };

  const goToBadgesPage = () => {
    navigate("/badges");
  };

  return (
    <Page title={badge ? badge.name : "New Badge"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="name"
          label="Name"
          register={register}
          error={errors.name?.message}
        />
        <TextField
          name="image"
          label="Avatar url"
          register={register}
          error={errors.image?.message}
        />
        <TextField
          name="description"
          label="Description"
          register={register}
          error={errors.description?.message}
        />
        <div className="mt-3">
          <Button
            color="secondary"
            type="button"
            className="me-2"
            onClick={goToBadgesPage}
          >
            Back
          </Button>
          <Button type="submit" color="primary">
            {id ? "Update" : "Create"}
          </Button>
        </div>
      </form>

      {watch("image") && (
        <ProfileImage register={register} watch={watch}></ProfileImage>
      )}
    </Page>
  );
};

export default BadgePage;
