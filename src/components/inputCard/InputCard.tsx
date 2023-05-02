import { Stack, Typography } from "@mui/material";
import React from "react";

type InputCardProps = {
  label: string;
  value: string;
  multi?: boolean;
};

const InputCard: React.FC<InputCardProps> = ({ label, value, multi }) => {
  return (
    <Stack
      gap="5px"
      border="1px solid #229476"
      padding="10px 15px"
      borderRadius="15px"
      width="45%"
      height={multi ? "100px" : "69px"}
    >
      <Typography fontSize="12px" color="var(--text-sec)">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
};
export default InputCard;
