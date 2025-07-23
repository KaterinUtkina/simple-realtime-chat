import styled from "styled-components";
import { Avatar } from "antd";
import { MOBILE_MAX } from "@/app/shared/enum";

export const StyledAvatar = styled(Avatar)<{ $bg: string }>`
  background-color: ${(props) => props.$bg};
  width: 40px;
  height: 40px;
  font-size: 20px !important;

  @media (max-width: ${MOBILE_MAX}) {
    width: 24px;
    height: 24px;
    font-size: 14px !important;
  }
`;
