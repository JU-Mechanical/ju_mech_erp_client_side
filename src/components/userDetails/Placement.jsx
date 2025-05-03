import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
} from "@mui/material";

function Placement({ offers }) {
  console.log(offers);
  const [selectedOffer, setSelectedOffer] = useState(offers[0]); // Default to the first offer

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Placement Offers
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Left Pane: List of Offers */}
        <Box
          sx={{
            width: "20%", // Reduced width of the left column
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            backgroundColor: "#f9f9f9",
          }}
        >
          <List>
            {offers.map((offer, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={selectedOffer.company === offer.company}
                  onClick={() => setSelectedOffer(offer)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#b70924",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#a10820",
                      },
                    },
                  }}
                >
                  <ListItemText primary={offer.company} />
                  {/* Accepted Badge */}
                  {offer.accepted && (
                    <Chip
                      label="Accepted"
                      color="success"
                      size="small"
                      sx={{
                        marginLeft: 1,
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Pane: Offer Details */}
        <Box sx={{ flexGrow: 1 }}>
          <Card
            sx={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                {selectedOffer.company}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                <b>Position Offered:</b> {selectedOffer.position}
              </Typography>
              {/* Enrollment Type and Recruitment Type on the same line */}
              <Box sx={{ display: "flex", gap: 8 }}>
                <Typography variant="body1" gutterBottom>
                  <b>Enrollment Type:</b> {selectedOffer.enrollmentType}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Recruitment Type:</b> {selectedOffer.recruitmentType}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 8 }}>
                <Typography variant="body1" gutterBottom>
                  <b>Year of Offer:</b> {selectedOffer.year}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Package:</b> {selectedOffer.package}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() =>
                  alert(`Viewing offer letter for ${selectedOffer.company}`)
                }
              >
                View Offer Letter
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Placement;
