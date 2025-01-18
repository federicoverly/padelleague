import { Button } from "@mui/material";
import { ReactElement } from "react";
import { colors } from "../../theme/colors";

interface CustomButtonProps {
  type: "primary" | "secondary";
  title: string | ReactElement;
  disabled?: boolean;
  onClick: () => void | Promise<void>;
}

export function CustomButton({
  type,
  title,
  disabled,
  onClick,
}: CustomButtonProps) {
  const customStyles = [
    {
      name: "primary",
      style: {
        color: colors.pumpkin,
        backgroundColor: colors.licorice,
        "&:hover": {
          color: colors.licorice,
          backgroundColor: colors.pumpkin,
        },
        "&:disabled": {
          backgroundColor: colors.lightGray,
          color: colors.darkPurple,
        },
      },
    },
    {
      name: "secondary",
      style: {
        color: colors.pumpkin,
        backgroundColor: colors.lightGray,
        "&:hover": {
          color: colors.lightGray,
          backgroundColor: colors.pumpkin,
        },
      },
    },
  ];

  return (
    <Button
      sx={customStyles.find((style) => style.name === type)?.style}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}

CustomButton.displayName = "CustomButton";
