import type { Meta, StoryObj } from "@storybook/react";
import Header from "@/components/common/Header/Header";

const meta = {
  title: "Common/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "헤더에 표시될 제목",
    },
    showAdminMenu: {
      control: "boolean",
      description: "관리자 메뉴 버튼 표시 여부",
    },
    onAdminMenuClick: {
      action: "clicked",
      description: "관리자 메뉴 버튼 클릭 시 호출되는 함수",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Build-Up 현장 출입 시스템",
    showAdminMenu: true,
  },
};

export const WithoutAdminMenu: Story = {
  args: {
    title: "Build-Up 현장 출입 시스템",
    showAdminMenu: false,
  },
};

export const CustomTitle: Story = {
  args: {
    title: "커스텀 제목",
    showAdminMenu: true,
  },
};
