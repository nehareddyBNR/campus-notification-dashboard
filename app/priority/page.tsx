"use client";

import Link from "next/link";

import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
} from "@mui/material";

import { mockNotifications } from "../../services/mockNotifications";
import { getPriorityScore } from "../../utils/priorityCalculator";

export default function PriorityPage() {
  const rankedNotifications = [...mockNotifications]
    .sort(
      (a, b) =>
        getPriorityScore(b.Type) -
        getPriorityScore(a.Type)
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          ⭐ Priority Notifications
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 3 }}
        >
          Ranked by Priority Score
        </Typography>

        <Button
          component={Link}
          href="/"
          variant="contained"
          sx={{
            mb: 4,
            backgroundColor: "#ffffff",
            color: "#4f46e5",
            fontWeight: "bold",
          }}
        >
          Back To Dashboard
        </Button>

        {rankedNotifications.map(
          (notification, index) => (
            <Paper
              key={notification.ID}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: 3,
              }}
            >
              <Typography variant="h5">
                #{index + 1}{" "}
                {notification.Message}
              </Typography>

              <Typography>
                Type: {notification.Type}
              </Typography>

              <Typography>
                Priority Score:{" "}
                {getPriorityScore(
                  notification.Type
                )}
              </Typography>
            </Paper>
          )
        )}
      </Container>
    </Box>
  );
}