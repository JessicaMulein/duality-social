import {
  faDesktop,
  faRobot,
  faUser,
} from '@awesome.me/kit-89ec609b07/icons/classic/regular';
import { HumanityTypeEnum } from '@duality-social/duality-social-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface HumanityTypeIconProps {
  humanityType: HumanityTypeEnum;
}

const HumanityTypeIcon: React.FC<HumanityTypeIconProps> = ({
  humanityType,
}) => {
  let icon;
  switch (humanityType) {
    case HumanityTypeEnum.Human:
      icon = faUser;
      break;
    case HumanityTypeEnum.Ai:
      icon = faRobot;
      break;
    case HumanityTypeEnum.Bot:
      icon = faDesktop;
      break;
    default:
      icon = faUser;
  }

  return <FontAwesomeIcon icon={icon} />;
};

export default HumanityTypeIcon;
