import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "@/app/ThemeContext";
import styled from "styled-components";

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: #a684ff;

    @media (hover: hover) {
      &:hover:not(.ant-switch-disabled) {
        background-color: #a684ff;
      }
    }
  }

  .ant-switch-inner-checked {
    display: flex !important;
    align-items: center;
  }
`;

const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <StyledSwitch
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
      onChange={toggleTheme}
      defaultChecked
    />
  );
};

export default ThemeSwitcher;
