import React, { useState, useEffect, useCallback } from "react";

import { Page } from "../../components/page/Page";
import { BadgeModel } from "../../models/badges.model";
import { badgesService } from "../../services/badges.service";

import { useNavigate } from "react-router-dom";
import AccessController from "../../components/access-controller/AccessController";
import { Button } from "../../components/button/Button";
import BadgeCard from "../../components/badge-card/BadgeCard";

const BadgesPage = () => {
  const [badges, setBadges] = useState<BadgeModel[]>([]);
  const navigate = useNavigate();

  const fetchBadges = useCallback(async () => {
    const badgeList = await badgesService.getBadges();
    setBadges(badgeList);
  }, []);


  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  const goToBadgePage = () => {
    navigate("/badge");
  };

  const handleDeleteBadge = async (id: string | number) => {
    await badgesService.deleteBadge(id);
    fetchBadges(); 
  };

  return (
    <Page title="Badges">
      <AccessController allowedFor={["ADMIN"]}>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Button
              color="primary"
              className="w-100 mb-3"
              onClick={goToBadgePage}
            >
              Create Badge
            </Button>
          </div>
        </div>
      </AccessController>
      <div className="row">
        {badges.map((badge) => (
          <BadgeCard
            key={badge.id} 
            badge={badge}
            handleDeleteBadge={handleDeleteBadge}
          />
        ))}
      </div>
    </Page>
  );
};

export default BadgesPage;
