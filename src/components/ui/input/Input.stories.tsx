import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/ui/input/Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "select",
      options: ["text", "password"],
    },
    label: {
      control: "text",
    },
    error: {
      control: "text",
    },
    helperText: {
      control: "text",
    },
    fullWidth: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    readOnly: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "입력해주세요",
  },
};

export const WithLabel: Story = {
  args: {
    label: "ID",
    placeholder: "아이디를 입력해주세요",
  },
};

export const Password: Story = {
  args: {
    label: "PW",
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
  },
};

export const WithError: Story = {
  args: {
    label: "ID",
    placeholder: "아이디를 입력해주세요",
    error: "아이디를 입력해주세요",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "ID",
    placeholder: "아이디를 입력해주세요",
    helperText: "영문, 숫자 조합 4-20자",
  },
};

export const Disabled: Story = {
  args: {
    label: "ID",
    placeholder: "비활성화된 입력",
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    label: "ID",
    value: "읽기 전용 값",
    readOnly: true,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "ID",
    placeholder: "작은 크기",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    label: "ID",
    placeholder: "중간 크기",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "ID",
    placeholder: "큰 크기",
  },
};

export const FullWidth: Story = {
  args: {
    label: "ID",
    placeholder: "전체 너비 입력",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};
