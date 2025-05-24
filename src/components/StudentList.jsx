import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Skeleton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StudentProfile from "./StudentProfile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 14;
  const [allUsers, setAllUsers] = useState([]);

  const onClose = () => {
    setSelectedStudent(null);
  };

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://jumechserver.onrender.com/admin/getstudents?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalCount(data.totalCount || 0); // <-- get totalCount from backend
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users for search (only once)
  const fetchAllUsers = async () => {
    try {
      let page = 1;
      let all = [];
      let hasMore = true;
      while (hasMore) {
        const res = await fetch(
          `https://jumechserver.onrender.com/admin/getstudents?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        if (Array.isArray(data.users)) {
          all = all.concat(data.users);
        }
        if (page >= data.totalPages) {
          hasMore = false;
        } else {
          page++;
        }
      }
      setAllUsers(all);
    } catch (err) {
      // fail silently
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Fetch all users for search only once
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // If searching, filter from allUsers, else show current page
  const filteredUsers =
    searchTerm.trim() !== ""
      ? allUsers.filter((user) =>
          `${user.name} ${user.rollNumber}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : users;

  if (loading) {
    return (
      <Paper sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
        <Skeleton variant="text" width={200} height={40} animation="wave" />
        <Box mb={2}>
          <Skeleton
            variant="rectangular"
            height={56}
            animation="wave"
            sx={{ borderRadius: 1 }}
          />
        </Box>
        <List>
          {Array.from({ length: 6 }).map((_, idx) => (
            <ListItem key={idx} divider>
              <Box sx={{ width: "100%" }}>
                <Skeleton
                  variant="text"
                  width="60%"
                  height={24}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={18}
                  animation="wave"
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }

  return (
    <>
      {!selectedStudent ? (
        <Paper sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
          <Typography variant="h5" gutterBottom>
            Student List
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Total Students: {totalCount}
          </Typography>

          <Box mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name or roll number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <List>
            {filteredUsers.map((user, index) => (
              <ListItem
                key={index}
                divider
                onClick={() => setSelectedStudent(user)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText
                  primary={user.name}
                  secondary={`Roll No: ${user.rollNumber}`}
                />
              </ListItem>
            ))}
          </List>

          {/* Pagination Buttons */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={3}
            gap={3}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: "50%",
                border: "1px solid #ccc",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.4 : 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor:
                    currentPage === 1 ? "transparent" : "#f0f0f0",
                },
              }}
              onClick={() => {
                if (currentPage > 1) setCurrentPage((prev) => prev - 1);
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </Box>

            <Typography variant="body1" fontWeight={500}>
              Page {currentPage} of {totalPages}
            </Typography>

            <Box
              sx={{
                p: 1.5,
                borderRadius: "50%",
                border: "1px solid #ccc",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.4 : 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor:
                    currentPage === totalPages ? "transparent" : "#f0f0f0",
                },
              }}
              onClick={() => {
                if (currentPage < totalPages)
                  setCurrentPage((prev) => prev + 1);
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </Box>
          </Box>
        </Paper>
      ) : (
        <StudentProfile user={selectedStudent} onClose={onClose} />
      )}
    </>
  );
};

export default UserList;
