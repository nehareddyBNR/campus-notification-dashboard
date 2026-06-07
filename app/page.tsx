"use client";

import { useState } from "react";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";
import { mockNotifications } from "../services/mockNotifications";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [page, setPage] = useState(1);

  const totalCount = mockNotifications.length;

  const placementCount = mockNotifications.filter(
    (n) => n.Type === "Placement"
  ).length;

  const resultCount = mockNotifications.filter(
    (n) => n.Type === "Result"
  ).length;

  const eventCount = mockNotifications.filter(
    (n) => n.Type === "Event"
  ).length;

  const filteredNotifications = mockNotifications.filter(
    (notification) => {
      const matchesSearch =
        notification.Message
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType =
        filterType === "All" ||
        notification.Type === filterType;

      return matchesSearch && matchesType;
    }
  );

  const notificationsPerPage = 3;

  const startIndex =
    (page - 1) * notificationsPerPage;

  const paginatedNotifications =
    filteredNotifications.slice(
      startIndex,
      startIndex + notificationsPerPage
    );

  const totalPages = Math.ceil(
    filteredNotifications.length /
      notificationsPerPage
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
        >
          🎓 Campus Command Center
        </Typography>

        <Typography
          variant="h5"
          sx={{ mb: 4 }}
        >
          Smart Notification Dashboard
        </Typography>

        {/* Statistics Cards */}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Total Notifications
                </Typography>

                <Typography variant="h2">
                  {totalCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Placements
                </Typography>

                <Typography variant="h2">
                  {placementCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Results
                </Typography>

                <Typography variant="h2">
                  {resultCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Events
                </Typography>

                <Typography variant="h2">
                  {eventCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Priority Inbox */}

        <Box sx={{ mt: 5 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              background:
                "linear-gradient(135deg,#7c3aed,#4f46e5)",
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              ⭐ Priority Inbox
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Top High Priority Notifications
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography>
                • Microsoft Hiring
              </Typography>

              <Typography>
                • Mid Sem Results Published
              </Typography>

              <Typography>
                • Google Hiring
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Search & Filter */}

        <Box sx={{ mt: 5, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="Search Notifications"
                variant="outlined"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Filter Type"
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value)
                }
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                }}
              >
                <MenuItem value="All">
                  All
                </MenuItem>

                <MenuItem value="Placement">
                  Placement
                </MenuItem>

                <MenuItem value="Result">
                  Result
                </MenuItem>

                <MenuItem value="Event">
                  Event
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        {/* Recent Notifications */}

        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
          >
            Recent Notifications
          </Typography>

          {paginatedNotifications.map(
            (notification) => (
              <NotificationCard
                key={notification.ID}
                notification={notification}
              />
            )
          )}
        </Box>

        {/* Pagination */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            pb: 4,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) =>
              setPage(value)
            }
            color="primary"
          />
        </Box>
      </Container>
    </Box>
  );
}