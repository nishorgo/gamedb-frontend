import { HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons//fa";
import { BsGlobe } from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import Platform from "../entities/Platform";

interface Props {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: Props) => {

  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

  const renderedIcons = new Set<string>();

  
  return (
    <HStack marginY={"10px"}>
      {platforms.map((platform) => {
        const icon = iconMap[platform.family];
        if (!icon || renderedIcons.has(platform.family)) {
          return null;
        }
        renderedIcons.add(platform.family);
        return <Icon key={platform.family} as={icon} color="gray.500" />;
      })}
    </HStack>
  );
};

export default PlatformIconList;
