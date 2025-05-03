//? importing library components
import React, { useState } from "react";
import {
    Box,
    Typography,
} from "@mui/material";

//? Componenets of the regular user profile page 
import Navbar from "../components/Navbar";
import UserDetailsLeft from "../components/userDetails/UserDetailsLeft";
import UserDetailsRightGrade from "../components/userDetails/Grade";
import ProfessionalElective from "../components/userDetails/ProfessionalElective";
import OpenElective from "../components/userDetails/OpenElective";
import Projects from "../components/userDetails/Projects";
import Club from "../components/userDetails/Club";
import TechFests from "../components/userDetails/TechFests";
import Leadership from "../components/userDetails/Leadership";
import Skills from "../components/userDetails/Skills";
import SocialActivities from "../components/userDetails/SocialActivities";
import Seminar from "../components/userDetails/Seminar";
import CompetitiveExam from "../components/userDetails/CompetitiveExam";
import HigherStudy from "../components/userDetails/HigherStudy";
import Placement from "../components/userDetails/Placement";
import StartUp from "../components/userDetails/StartUp";

//? Static details of the component page
export default function UserProfile() {

    //* static datas of the user, later on dynamic data will be added

    const [user, setUser] = useState({
        fullName: "Abhirup Guha Roy",
        year: "2nd Year",
        roll: "002311201100",
        phone: "+91 8910232532",
        email: "johndoe@example.com",
        avatar: "/default-avatar.png", // Replace with the actual avatar path
    });

    const sgpaData = [
        { semester: "Semester 1", sgpa: "8.5" },
        { semester: "Semester 2", sgpa: "8.7" },
        { semester: "Semester 3", sgpa: "8.9" },
        { semester: "Semester 4", sgpa: "9.0" },
        // Add more semesters as needed
    ];

    const professionalElectives = [
        "Advanced Robotics",
        "Thermal Engineering",
        "Automobile Engineering",
    ];

    const openElectives = [
        "Introduction to Psychology",
        "Environmental Science",
        "Entrepreneurship Development",
    ];

    const clubs = [
        {
            name: "Mechatronics Club",
            role: "Technical Team Lead",
            accolades: ["Best Project Award 2023"],
            achievements: ["Developed a robotic arm"],
            image: "/path/to/robotics-club.jpg",
        },
        {
            name: "ISHRAE",
            role: "Technical Member",
            accolades: ["Best Design Award 2023", "Best Paper Award 2023"],
            achievements: ["Participated in HVAC design competition"],
            image: "/path/to/coding-club.jpg",
        },
        {
            name: "Motosports Club",
            role: "Powertrain Team Member",
            accolades: ["Best Performance Award 2023"],
            achievements: ["Designed a fuel-efficient engine"],
            image: "/path/to/drama-club.jpg",
        },
    ];

    const techFests = [
        {
            name: "RoboFest 2023",
            organiser: "Tech University",
            eventType: "Robotics Competition",
            year: 2023,
            role: "Team Lead",
            teammates: ["Alice", "Bob", "Charlie"],
            outcome: "Winner",
        },
        {
            name: "CodeSprint 2022",
            organiser: "Code Academy",
            eventType: "Hackathon",
            year: 2022,
            role: "Participant",
            teammates: ["David", "Eve"],
            outcome: "Runner-up",
        },
        {
            name: "GreenTech Workshop",
            organiser: "EcoTech",
            eventType: "Workshop",
            year: 2021,
            role: "Attendee",
            teammates: [],
            outcome: "Certificate of Participation",
        },
    ];

    const leadershipRoles = [
        {
            role: "Team Lead",
            details: "Led a team of 5 members in a robotics competition.",
        },
        {
            role: "Event Coordinator",
            details: "Organized the annual tech fest with 200+ participants.",
        },
        {
            role: "Club President",
            details: "Managed the activities of the coding club for 2 years.",
        },
    ];

    const skills = [
        {
            name: "Machine Learning",
            offeredBy: "Coursera",
            mode: "Online",
            duration: "3 months",
            fee: "50",
        },
        {
            name: "Data Structures and Algorithms",
            offeredBy: "Udemy",
            mode: "Online",
            duration: "2 months",
            fee: "30",
        },
        {
            name: "Thermodynamics",
            offeredBy: "MIT OpenCourseWare",
            mode: "Online",
            duration: "4 months",
            fee: "Free",
        },
    ];

    const socialActivities = [
        {
            name: "Tree Plantation Drive",
            venue: "City Park",
            date: "2023-06-15",
            organizer: "Green Earth Initiative",
            role: "Volunteer",
        },
        {
            name: "Blood Donation Camp",
            venue: "Community Hall",
            date: "2023-08-20",
            organizer: "Red Cross Society",
            role: "Coordinator",
        },
        {
            name: "Beach Cleanup",
            venue: "Sunny Beach",
            date: "2023-09-10",
            organizer: "Clean Shores Organization",
            role: "Participant",
        },
    ];
    const seminars = [
        {
            name: "AI and Machine Learning",
            venue: "Tech Auditorium",
            date: "2023-05-10",
            role: "Speaker",
            organizer: "Tech University",
        },
        {
            name: "Sustainable Energy",
            venue: "Green Hall",
            date: "2023-06-15",
            role: "Participant",
            organizer: "EcoTech",
        },
        {
            name: "Robotics Workshop",
            venue: "Innovation Center",
            date: "2023-07-20",
            role: "Coordinator",
            organizer: "Robotics Club",
        },
    ];

    const exams = [
        {
            name: "GATE",
            year: 2023,
            specificTraining: true,
            trainingName: "GATE Coaching",
            trainingType: "Offline",
            trainingMode: "Instructor-led",
        },
        {
            name: "GRE",
            year: 2022,
            specificTraining: false,
            trainingName: null,
            trainingType: null,
            trainingMode: null,
        },
        {
            name: "CAT",
            year: 2021,
            specificTraining: true,
            trainingName: "CAT Prep Course",
            trainingType: "Online",
            trainingMode: "Self-paced",
        },
    ];

    const higherStudy = {
        programme: "Master of Science in Artificial Intelligence",
        tenure: "2 years",
        institute: "Stanford University",
        country: "United States",
    };

    const offers = [
        {
            company: "Google",
            position: "Software Engineer",
            enrollmentType: "Full-Time",
            recruitmentType: "On-Campus",
            year: 2023,
            package: "$120,000 per annum",
            accepted: false, // This offer is accepted
        },
        {
            company: "Microsoft",
            position: "Cloud Engineer",
            enrollmentType: "Full-Time",
            recruitmentType: "Off-Campus",
            year: 2023,
            package: "$110,000 per annum",
            accepted: true, // This offer is not accepted
        },
        {
            company: "Amazon",
            position: "Data Scientist",
            enrollmentType: "Internship",
            recruitmentType: "On-Campus",
            year: 2022,
            package: "$80,000 per annum",
            accepted: false, // This offer is not accepted
        },
    ];

    const startupDetails = {
        pastInitiatives: "Developed a food delivery startup during college, focusing on sustainable packaging.",
        futureInterest: "Interested in forming a tech startup focusing on AI-driven solutions.",
        universitySupport: true,
        externalSupport: false,
    };

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                overflow: "hidden", // Prevent horizontal scrolling
            }}
        >
            <Navbar />
            <Box sx={{ display: "flex", height: "calc(100vh - 64px)", mt: "64px" }}>
                {/* Left Column: Fixed Side Profile */}
                <Box
                    sx={{
                        position: "fixed",
                        top: "64px", // Adjust for the height of the Navbar
                        left: 0,
                        width: "25%", // Adjust width as needed
                        height: "calc(100vh - 64px)",
                        backgroundColor: "rgba(183, 9, 36, 1)",
                        padding: "20px",
                        borderRight: "1px solid #ddd",
                        color: "#fff",
                        overflowY: "auto", // Allow scrolling if content overflows
                    }}
                >
                    {/* Primary user details of the user */}
                    <UserDetailsLeft user={user} />
                    {/* Edit profile option for the user */}
                </Box>

                {/* Right Column: Scrollable Main Content */}
                <Box
                    sx={{
                        marginLeft: "25%", // Matches the width of the left column
                        width: "75%", // Remaining width
                        padding: "20px",
                        overflowY: "auto", // Enable vertical scrolling
                        height: "calc(100vh - 64px)",
                    }}
                >
                    {/* Main Content */}
                    <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }} gutterBottom>
                        Welcome, {user.fullName}
                    </Typography>
                    {/* Grade details of the user */}
                    <UserDetailsRightGrade sgpaData={sgpaData} />
                    {/* Professional Electives Section */}
                    <ProfessionalElective electives={professionalElectives} />
                    {/* Open Electives Section */}
                    <OpenElective electives={openElectives} />
                    {/* Projects done by the candidate */}
                    <Projects />
                    {/* Clubs joined by the candidate */}
                    <Club clubs={clubs} />
                    {/* Tech fests participated by the candidate */}
                    <TechFests techFests={techFests} />
                    {/* Leaderchip Roles */}
                    <Leadership roles={leadershipRoles} />
                    {/* Skills pursued by the user */}
                    <Skills skills={skills} />
                    {/* Social Actvities of the user */}
                    <SocialActivities activities={socialActivities} />;
                    {/* Seminars attended by the user */}
                    <Seminar seminars={seminars} />
                    {/* Competitive Exams attended by the user */}
                    <CompetitiveExam exams={exams} />
                    {/* Higher studies the user is pursueing */}
                    <HigherStudy higherStudy={higherStudy} />
                    {/* Placement offers got by the user */}
                    <Placement offers={offers} />
                    {/* Startups */}
                    <StartUp startupDetails={startupDetails} />

                </Box>
            </Box>
        </Box>
    );
}