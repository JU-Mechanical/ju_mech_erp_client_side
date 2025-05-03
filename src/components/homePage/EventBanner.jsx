import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const events = [
  {
    title: "Annual Tech Fest",
    date: "April 15th",
    description: "Join us for our annual tech fest!",
    image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
  },
  {
    title: "Workshop on AI",
    date: "May 10th",
    description: "A workshop on Artificial Intelligence.",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
  },
  {
    title: "Sports Meet",
    date: "June 5th",
    description: "Participate in our annual sports meet.",
    image: "https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg",
  },
];

function EventBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Slider {...settings}>
        {events.map((event, index) => (
          <Box
            key={index}
            sx={{
              backgroundImage: `url(${event.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "20px",
              textAlign: "center",
              borderRadius: "8px",
              height: "320px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              color: "#fff",
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              {event.title}
            </Typography>
            <Typography variant="h6" component="p" gutterBottom>
              {event.date}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {event.description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#b70924",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#9a081e",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default EventBanner;
