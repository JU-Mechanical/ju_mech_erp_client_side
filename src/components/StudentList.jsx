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
  LinearProgress,
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
  const [allUsers, setAllUsers] = useState([]);

  const limit = 14;

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

      if (data.users && Array.isArray(data.users)) {

        setUsers(data.users);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || 1);
      } else {
        console.error("Invalid data format received from server");
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users to get total count and no-data count
  const fetchAllUsers = async () => {
    try {
      let page = 1;
      let all = [];
      let hasMore = true;
      const limit = 14;
      while (hasMore) {
        const res = await fetch(
          `https://jumechserver.onrender.com/admin/getstudents?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        if (Array.isArray(data.users)) {
          all = [...all, ...data.users];
        }
        if (
          page >= (data.totalPages || 1) ||
          !data.users ||
          data.users.length === 0
        ) {
          hasMore = false;
        } else {
          page++;
        }
      }

      const updatedUsers = all.map((user) => ({
        ...user,
        percentageFilled: getPercentageFilled(user),
      }));
      console.log("All Users:", updatedUsers);
      setAllUsers(updatedUsers);

      // Count users with no data (all fields empty or null except _id)
      const noDataCount = all.filter((u) => {
        const keys = Object.keys(u).filter((k) => k !== "_id");
        return keys.every((k) => {
          const v = u[k];
          if (Array.isArray(v)) return v.length === 0;
          if (typeof v === "object" && v !== null)
            return Object.keys(v).length === 0;
          return v === null || v === undefined || v === "";
        });
      }).length;
      setTotalCount(`${all.length} (No Data: ${noDataCount})`);
    } catch (err) {
      setAllUsers([]);
      setTotalCount(0);
    }
  }
 const getPercentageFilled = (user) => {
  const skipTopLevel = ["_id", "name", "email", "mobileNo", "password", "resetPasswordToken", "resetPasswordExpires", "createdAt", "updatedAt", "__v"];
  const requiredTopLevelSections = [
    "personalInfo",
    "enrollmentDetails",
    "academicBackground",
    "academicInfo",
    "curricularInfo",
    "careerProgression",
    "miscellaneous",
  ];

  let filled = 0;
  let total = 0;

  const isFilledValue = (v) => {
    if (typeof v === "string") return v.trim() !== "";
    if (typeof v === "number" || typeof v === "boolean") return true;
    if (Array.isArray(v)) return v.length > 0 && v.some(isFilledValue);
    if (typeof v === "object" && v !== null) return Object.values(v).some(isFilledValue);
    return false;
  };

  const countFilled = (val) => {
    if (Array.isArray(val)) {
      for (const item of val) countFilled(item);
    } else if (typeof val === "object" && val !== null) {
      for (const key in val) {
        countFilled(val[key]);
      }
    } else {
      total++;
      if (isFilledValue(val)) filled++;
    }
  };

  // Loop through only required sections
  for (const section of requiredTopLevelSections) {
    const sectionData = user[section];

    if (sectionData === undefined || sectionData === null) {
      // If entire section is missing, count as unfilled
      total++;
    } else {
      countFilled(sectionData);
    }
  }

  return total === 0 ? 0 : Math.round((filled / total) * 100);
};




  useEffect(() => {
    fetchUsers(currentPage);
    fetchAllUsers();
  }, [currentPage]);

  const filteredUsers =
    searchTerm.trim() !== ""
      ? allUsers.filter((user) =>
        `${user.name || ""} ${user.rollNumber || ""}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      : allUsers;

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
          <Box
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 600,
              fontSize: "1.08rem",
              color: "#b70924",
              background: "rgba(247, 232, 232, 0.7)",
              px: 2,
              py: 1,
              borderRadius: 2,
              boxShadow: "0 1px 6px 0 rgba(183,9,36,0.07)",
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.13rem",
                color: "#b70924",
              }}
            >
              Total Students:
            </span>
            <span style={{ fontWeight: 700, color: "#222" }}>
              {totalCount.toString().split(" ")[0]}
            </span>
            <span
              style={{
                fontWeight: 500,
                color: "#fff",
                background: "#b70924",
                borderRadius: "12px",
                padding: "2px 10px",
                fontSize: "0.95em",
                marginLeft: 8,
              }}
            >
              {totalCount.toString().match(/\(No Data: \d+\)/)?.[0]}
            </span>
          </Box>
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <ListItem
                  key={index}
                  divider
                  onClick={() => setSelectedStudent(user)}
                  sx={{ cursor: "pointer" }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                    }}>
                    <ListItemText
                      primary={user.name || "No name"}
                      secondary={`Roll No: ${user.rollNumber || "N/A"}`}

                    />
                    {user.academicBackground?(<Box sx={{ width: 100, textAlign: "right" }}>
                      <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
                        {user.percentageFilled === 100 ? "Completed" : `Filled: ${user.percentageFilled}%`}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={user.percentageFilled}
                        sx={{
                          height: 6,
                          borderRadius: 5,
                          backgroundColor: "#eee",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: user.percentageFilled === 100 ? "green" : "#8e0038",
                          },
                        }}
                      />
                    </Box>):(<><Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
                        Only Login
                      </Typography></>)}
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No students found" />
              </ListItem>
            )}
          </List>

          {/* Pagination Buttons */}
          {searchTerm.trim() === "" && (
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
                  "&:hover": {
                    backgroundColor:
                      currentPage === 1 ? "transparent" : "#f0f0f0",
                  },
                }}
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
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
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.4 : 1,
                  "&:hover": {
                    backgroundColor:
                      currentPage === totalPages ? "transparent" : "#f0f0f0",
                  },
                }}
                onClick={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
              >
                <ArrowForwardIosIcon fontSize="small" />
              </Box>
            </Box>
          )}
        </Paper>
      ) : (
        <StudentProfile user={selectedStudent} onClose={onClose} />
      )}
    </>
  );
};

export default UserList;
