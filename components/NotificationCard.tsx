import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

interface Props {
  notification: any;
}

export default function NotificationCard({
  notification,
}: Props) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Chip
            label={notification.Type}
            color={
              notification.Type === "Placement"
                ? "success"
                : notification.Type === "Result"
                ? "primary"
                : "warning"
            }
          />

          <Chip
            label={
              notification.Viewed
                ? "Viewed"
                : "New"
            }
            color={
              notification.Viewed
                ? "default"
                : "error"
            }
          />
        </Stack>

        <Typography
          variant="h6"
          fontWeight="bold"
        >
          {notification.Message}
        </Typography>

        <Typography color="text.secondary">
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}