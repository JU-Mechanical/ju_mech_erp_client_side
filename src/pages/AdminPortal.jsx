//? importing library components
import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
} from "@mui/material";

//? Componenets of the regular user profile page 
import Navbar from "../components/Navbar";
import AdminsPanel from "../components/adminDetails/AdminsPanel";
import AdminDetails from "../components/adminDetails/AdminDetails";
import StudentProfile from "../components/StudentProfile";
import UserList from "../components/StudentList";

//? Static details of the component page
export default function AdminPortal() {

    const [activeComponent, setActiveComponent] = useState("AdminDetails");
    const [students,setStudents]=useState([]);  
    const admin = {
        fullName: "Abhirup Guha Roy",
        role: "Admin",
        email: "admin@example.com",
        phone: "+91 9876543210",
        avatar: "/default-avatar.png", // Replace with actual avatar URL
        department: "Mechanical Engineering",
        lobby: "Design",
        lastLogin: "2025-04-14 10:30 AM",
        description:
          "The admin is responsible for managing the student profiles, handling pending requests, and configuring system settings. They play a crucial role in ensuring the smooth functioning of the portal and maintaining data integrity.",
      };

      useEffect(() => {
        const getallstudents=async()=>{
            try {
               const response=await fetch("http://localhost:5000/admin/getstudents", {
                method:"GET",
                
               });
               const studentdata=await response.json();
               console.log(studentdata); 
               setStudents(studentdata); 
            } catch (error) {
                
            }
        }
        getallstudents();

      },[]);

      

    const renderActiveComponent = () => {
        switch (activeComponent) {
          case "AdminDetails":
            return <AdminDetails admin={admin} />;
          case "ManageProfiles":
            return   <UserList users={students} />
          case "PendingRequests":
            return <Typography variant="h5">Pending Requests Component</Typography>;
          case "Settings":
            return <Typography variant="h5">Settings Component</Typography>;
          case "EditProfile":
            return <Typography variant="h5">Edit Admin Profile Component</Typography>;
          default:
            return <Typography variant="h5">Welcome to the Admin Portal</Typography>;
        }
    };

    const mockData={
        "name": "Aarav Gupta",
        "mobileNo": "9876543210",
        "email": "aarav.gupta@example.com",
        "rollNumber": "JU2021CSE001",
        "password": "hashed_password_here",
        "personalInfo": {
          "name": "Aarav Gupta",
          "dob": "2003-06-15T00:00:00.000Z",
          "gender": "Male",
          "category": "General",
          "isPwd": false,
          "mobileNo": "9876543210",
          "whatsappNo": "9876543210",
          "email": "aarav.gupta@example.com",
          "alternateEmail": "a.gupta@altmail.com",
          "presentAddress": "123 College Road, Kolkata",
          "presentState": "West Bengal",
          "permanentAddress": "45 Lake Gardens, Kolkata",
          "permanentState": "West Bengal",
          "emergencyContactName": "Rohit Gupta",
          "emergencyContactNumber": "9876543200",
          "emergencyContactRelation": "Father",
          "nationality": "Indian",
          "idType": "Aadhaar",
          "idNumber": "1234-5678-9012",
          "familyIncome": "6,00,000 INR"
        },
        "enrollmentDetails": {
          "registrationYear": "2021"
        },
        "academicBackground": {
          "secondaryMarks": "92%",
          "secondaryYear": "2019",
          "higherSecondaryMarks": "90%",
          "higherSecondaryYear": "2021",
          "mediumOfEducation": "English",
          "entranceExamName": "WBJEE",
          "entranceExamRank": "102",
          "entranceExamYear": "2021",
          "rankcard": "rankcard123.pdf"
        },
        "academicInfo": {
          "grades": [
            {
              "semester": 1,
              "sgpa": "9.1",
              "cgpa": "9.1",
              "gradecard": "sem1_gradecard.pdf"
            },
            {
              "semester": 2,
              "sgpa": "8.9",
              "cgpa": "9.0",
              "gradecard": "sem2_gradecard.pdf"
            }
          ],
          "selectedProfessional": ["AI & ML", "Cyber Security"],
          "selectedOpen": ["Philosophy", "Design Thinking"],
          "projectDetails": [
            {
              "title": "AI-Powered Recommender",
              "type": "Course",
              "mode": "Online",
              "duration": 3,
              "year": 2023,
              "graded": true,
              "supervisor": "Dr. Sharma",
              "coSupervisor": "Prof. Mehta",
              "institute": "Jadavpur University",
              "sdgConnection": true,
              "outcome": "Prototype",
              "certificate": "project_cert.pdf"
            }
          ],
          "publications": {
            "journalPapers": [
              {
                "title": "Deep Learning for Urban Transport",
                "journalName": "AI Journal",
                "volume": "12",
                "pageNo": "45-53",
                "doi": "10.1234/ai.journal.2023.45",
                "firstPage": "45"
              }
            ],
            "conferencePapers": [],
            "patent": []
          },
          "courses": [
            {
              "name": "Full Stack Web Dev",
              "duration": "10 weeks",
              "mode": "Online",
              "noCredits": "4",
              "platform": "Coursera",
              "instituteName": "Meta",
              "facultyName": "Dr. Smith",
              "curriculumPart": true,
              "creditTransfer": false,
              "gradeCard": "fswd_grades.pdf",
              "certificate": "fswd_cert.pdf"
            }
          ],
          "trainings": [],
          "interns": [],
          "remedial": []
        },
        "curricularInfo": {
          "clubs": [
            {
              "name": "Coding Club",
              "role": "Member",
              "accolades": ["Best Coder 2022"],
              "achievements": ["Won CodeRush"],
              "certificate": "club_cert.pdf"
            }
          ],
          "techFests": [
            {
              "name": "TechUtsav",
              "organizer": "JU CSE Dept",
              "eventType": "Hackathon",
              "year": "2023",
              "role": "Team Lead",
              "teammates": ["Riya", "Aniket"],
              "outcome": "Finalist",
              "certificate": "hack_cert.pdf"
            }
          ],
          "leadership": [
            {
              "role": "Student Representative",
              "details": "Coordinated academic events",
              "certificate": "leader_cert.pdf"
            }
          ],
          "sports": [],
          "skills": [
            {
              "name": "Data Structures",
              "offeredby": "NPTEL",
              "mode": "Online",
              "duration": "6 weeks",
              "fee": "Free",
              "certificate": "ds_cert.pdf"
            }
          ],
          "socialActivities": [],
          "seminars": []
        },
        "careerProgression": {
          "placement": [
            {
              "company": "Google",
              "position": "SDE Intern",
              "employmentType": "Internship",
              "recruitmentType": "On-Campus",
              "year": "2024",
              "package": "20 LPA",
              "accepted": true,
              "offerLetter": "google_offer.pdf"
            }
          ],
          "exams": [
            {
              "name": "GATE",
              "year": "2025",
              "score": "750",
              "rank": "120",
              "percentile": "98.5",
              "hasTraining": true,
              "trainingType": "Online",
              "trainingMode": "Self-paced",
              "resultCard": "gate_result.pdf"
            }
          ],
          "higherStudy": {
            "programme": "M.Tech in AI",
            "duration": "2 years",
            "university": "IIT Bombay",
            "country": "India"
          },
          "startup": {
            "hasStartup": false,
            "startupDetails": "",
            "interestedInStartup": true,
            "universitySupport": "Yes",
            "externalSupport": "No"
          }
        },
        "miscellaneous": {
          "notes": "Highly motivated and consistent performer."
        }
      }
      
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
                        borderRight: "1px solid #ddd",
                        color: "#fff",
                        overflowY: "auto", // Allow scrolling if content overflows
                    }}
                >
                    {/* Primary user details of the user */}
                    <AdminsPanel admin={admin} setActiveComponent={setActiveComponent} />
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
                    {renderActiveComponent()}

                </Box>
            </Box>
        </Box>
    );
}