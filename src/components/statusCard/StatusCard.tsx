import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

type StatusCardData = {
  icon: any;
  count: string;
  title: string;
};

type StatusCardProps = {
  item: StatusCardData;
};

const StatusCard: React.FC<StatusCardProps> = ({ item }) => {
  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
      display="flex"
      justifyContent="center"
      width="100%"
    >
      <Stack
        position="relative"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(48, 140, 122, 0.15)"
        width="100%"
        border="1px solid #308c7a4d"
        borderRadius="20px"
        padding="20px 10px"
        sx={{
          gap: { xs: "10px", md: "30px" },
          "&hover": { color: "white !important" },
        }}
        overflow="hidden"
        zIndex={3}
        className="statusCard"
      >
        {item.icon}
        <Stack alignItems="center" gap="3px">
          <Typography fontWeight="bold" fontSize="23px">
            {item.count}
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: { xs: "10.5px", md: "14px" },
              textAlign: "center",
            }}
          >
            {item.title}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
};
export default StatusCard;
