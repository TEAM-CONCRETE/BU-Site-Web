import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/ui/button/Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "확인",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "취소",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "외곽선",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "고스트",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "삭제",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "작은 버튼",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "중간 버튼",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "큰 버튼",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "로딩 중...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성화",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "전체 너비",
  },
  parameters: {
    layout: "padded",
  },
};
