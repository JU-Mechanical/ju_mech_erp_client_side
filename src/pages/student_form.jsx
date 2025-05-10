import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Drawer,
  IconButton,
  Avatar,
} from "@mui/material"; // Import Avatar
//? importing multiform components
import PersonalInfoForm from "../forms/personal-info-form"; // form component for hanlding the personal info
import EnrollmentDetailsForm from "../forms/enrollment-details-forms"; // form component for handling the enrollment details
import AcademicBackgroundForm from "../forms/academic-background-form"; // form component for hanlding the acedamic component details
import AcademicInfoForm from "../forms/academic-info-form"; // form component for handling the university acedamic info
import ProgressionForm from "../forms/progression-form"; // form component for handling the placement details of the student
import CoCurricularForm from "../forms/co-curricular-form"; // form component for handling the co-curricular and extra-curricular activities
import MiscellaneousForms from "../forms/miscellaneous-forms"; // form component for handling the miscellenous details of the student
//? importing components
import Sidebar from "../components/Sidebar"; // sidebar component
import { Menu as MenuIcon } from "@mui/icons-material"; // Import MenuIcon for mobile sidebar
import Navbar from "../components/Navbar"; // Import Navbar for mobile view
import { useSelector } from "react-redux";

export default function MultiStepForm({ fetchUserProfile }) {
  // const user = localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user"))
  //   : null;

  //* states to control the active section of the form
  const [activeSection, setActiveSection] = useState(0); //state to control session
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)"); // responsive state property
  const user=useSelector((state)=>state.user);
  console.log(user);
  //* state object to store personal details/general info of student
  const [personalformData, setPersonalFormData] = useState({
    name: user?.personalInfo?.name || "",
    dob: user?.personalInfo?.dob || "",
    gender: user?.personalInfo?.gender || "",
    category: user?.personalInfo?.category || "",
    isPwd: user?.personalInfo?.isPwd || false,
    mobileNo: user?.personalInfo?.mobileNo || "",
    whatsappNo: user?.personalInfo?.whatsappNo || "",
    email: user?.personalInfo?.email || "",
    alternateEmail: user?.personalInfo?.alternateEmail || "",
    presentAddress: user?.personalInfo?.presentAddress || "",
    presentState: user?.personalInfo?.presentState || "",
    permanentAddress: user?.personalInfo?.permanentAddress || "",
    permanentState: user?.personalInfo?.permanentState || "",
    emergencyContactName: user?.personalInfo?.emergencyContactName || "",
    emergencyContactNumber: user?.personalInfo?.emergencyContactNumber || "",
    emergencyContactRelation:
      user?.personalInfo?.emergencyContactRelation || "",
    nationality: user?.personalInfo?.nationality || "",
    idType: user?.personalInfo?.idType || "",
    idNumber: user?.personalInfo?.idNumber || "",
    familyIncome: user?.personalInfo?.familyIncome || "",
  });

  //* State to control enrollment details of the student resistered in JU
  const [enrollformData, setEnrollFormData] = useState({
    rollNumber: user?.enrollmentDetails?.rollNumber || "",
    section: user?.enrollmentDetails?.section || "",
    programme: user?.enrollmentDetails?.programme || "",
    isLateralEntry: user?.enrollmentDetails?.isLateralEntry || false,
    admissionYear: user?.enrollmentDetails?.admissionYear || "",
    currentSemester: user?.enrollmentDetails?.currentSemester || "",
    currentYear: user?.enrollmentDetails?.currentYear || "",
    expectedGraduationYear:
      user?.enrollmentDetails?.expectedGraduationYear || "",
    registrationNumber: user?.enrollmentDetails?.registrationNumber || "",
    registrationYear: user?.enrollmentDetails?.registrationYear || "",
    mentorName: user?.enrollmentDetails?.mentorName || "",
    hasScholarship: user?.enrollmentDetails?.hasScholarship || false,
    scholarshipDetails: user?.enrollmentDetails?.scholarshipDetails || "",
  });

  //* state to control school acedamic background details
  const [acadbackformData, setAcadBackFormData] = useState({
    secondaryMarks: user?.academicBackground?.secondaryMarks || "",
    secondaryYear: user?.academicBackground?.secondaryYear || "",
    higherSecondaryMarks: user?.academicBackground?.higherSecondaryMarks || "",
    higherSecondaryYear: user?.academicBackground?.higherSecondaryYear || "",
    mediumOfEducation: user?.academicBackground?.mediumOfEducation || "",
    entranceExamName: user?.academicBackground?.entranceExamName || "",
    entranceExamRank: user?.academicBackground?.entranceExamRank || "",
    entranceExamYear: user?.academicBackground?.entranceExamYear || "",
  });

  //* state to control acedamic details at the university
  const [acedamicformData, setAcedamicFormData] = useState({
    grades: user?.acedamicInfo?.grades || [
      {
        semester: 1,
        sgpa: "",
        cgpa: "",
        gradecard: null,
      },
    ],
    selectedProfessional: user?.acedamicInfo?.selectedProfessional || [],
    selectedOpen: user?.acedamicInfo?.selectedOpen || [],
    projects: user?.acedamicInfo?.projects || [
      {
        title: "",
        type: "",
        mode: "",
        duration: "",
        year: "",
        graded: false,
        supervisor: "",
        coSupervisor: "",
        institute: "",
        sdgConnection: false,
        outcome: "",
        certificate: null,
      },
    ],
    publications: {
      journalPapers: user?.acedamicInfo?.publications?.journalPapers || [
        {
          title: "",
          journalName: "",
          volume: "",
          pageNo: "",
          doi: "",
          firstPage: "",
        },
      ],
      conferencePapers: user?.acedamicInfo?.publications?.conferencePapers || [
        {
          title: "",
          conferenceName: "",
          venue: "",
          dates: "",
          organizedBy: "",
        },
      ],
      patent: user?.acedamicInfo?.publications?.patent || [
        {
          title: "",
          details: "",
          applno: "",
          patno: "",
          certificate: null,
        },
      ],
    },
    courses: user?.acedamicInfo?.courses || [
      {
        name: "",
        duration: "",
        mode: "",
        noCredits: "",
        platform: "",
        instituteName: "",
        facultyName: "",
        curriculumPart: false, // Initialize as Boolean
        creditTransfer: false, // Initialize as Boolean
        gradeCard: "",
        certificate: null,
      },
    ],
    trainings: user?.acedamicInfo?.trainings || [
      {
        place: "",
        duration: 0,
        mode: "",
        noCredits: "",
        organizedBy: "",
        certificate: null,
      },
    ],
    interns: user?.acedamicInfo?.interns || [
      {
        place: "",
        duration: "",
        mode: "",
        noCredits: "",
        platform: "",
        organizedBy: "",
        certificate: null,
      },
    ],
    remedial: user?.acedamicInfo?.remedial || [
      {
        num: 0,
        name: "",
      },
    ],
  });
  //console.log(user.careerProgression)
  //* state to control placement details at the university
  const [placementformData, setPlacementFormData] = useState({
    placements: user?.careerProgression?.placement || [],
    competitiveExam: user?.careerProgression?.exams || [
      {
        examinationName: "",
        year: "",
        score: "",
        rank: "",
        percentile: "",
        trainingType: "",
        trainingMode: "",
        rankcards: null,
      },
    ],
    higherStudy: user?.careerProgression?.higherStudy || {
      programme: "",
      duration: "",
      university: "",
      country: "",
    },
    startup: user?.careerProgression?.startup || {
      details: "",
      support: "",
      externalSupport: "",
    },
  });

  //* state to control extra-curricular and co-curricular form details
  const [curricularformData, setCurricularFormData] = useState({
    clubs: user?.curricularInfo?.clubs || [
      {
        name: "",
        role: "",
        accolades: [""],
        achievements: [""],
        clubs: null,
      },
    ],
    techFests: user?.curricularInfo?.techfests || [
      {
        name: "",
        organizer: "",
        eventType: "",
        year: "",
        role: "",
        teammates: [""],
        outcome: "",
        techfests: null,
      },
    ],
    leadership: user?.curricularInfo?.leadership || [
      {
        role: "",
        details: "",
        leadership: null,
      },
    ],
    sports: user?.curricularInfo?.sports || [
      {
        name: "",
        level: "",
        venue: "",
        year: "",
        result: "",
        accolades: "",
        sports: null,
      },
    ],
    skills: user?.curricularInfo?.skills || [
      {
        name: "",
        offeredby: "",
        mode: "",
        duration: "",
        fee: "",
        skills: null,
      },
    ],
    socialActivities: user?.curricularInfo?.socialActivities || [
      {
        name: "",
        details: "",
        date: "",
        location: "",
        socialactivities: null,
      },
    ],
    seminars: user?.curricularInfo?.seminars || {
      name: "",
      venue: "",
      date: "",
      organizer: "",
      seminars: null,
    },
  });

  //* state to control misc form details
  const [miscformData, setMiscFormData] = useState({
    lor: null,
    keyLearnings: "",
    sop: "",
    vision: "",
  });

  //& function to handle h=changes in multi form state values
  //? function to handle the change in the personal info form
  const handlepersonalChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setPersonalFormData({
      ...personalformData,
      [name]: newValue,
    });
  };

  //? function to handle the change in the enrollment details form
  const handleenrollChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setEnrollFormData({
      ...enrollformData,
      [name]: newValue,
    });
  };

  //? function to handle the change in the academic background form
  const handleacadbackChange = (event) => {
    const { name, value } = event.target;

    setAcadBackFormData({
      ...acadbackformData,
      [name]: value,
    });
  };

  //? function to handle the change in the academic info form
  const handleacedamicChange = (event) => {
    const { name, value } = event.target;

    setAcedamicFormData({
      ...acedamicformData,
      [name]: value,
    });
  };

  //? function to handle the change in the placement form
  const handlePlacementChange = (event) => {
    const { name, value } = event.target;

    setPlacementFormData({
      ...placementformData,
      [name]: value,
    });
  };

  //? function to handle the change in the curriculum form
  const handleCurricularChange = (event) => {
    const { name, value } = event.target;

    setCurricularFormData({
      ...curricularformData,
      [name]: value,
    });
  };

  //? function to handle the change in the misc form
  const handleMiscChange = (event) => {
    const { name, value } = event.target;

    setMiscFormData({
      ...miscformData,
      [name]: value,
    });
  };

  //& function to handle submit of the form data to the server
  const handleFormSubmit = async () => {
    console.log(acadbackformData);
    const allFormData = {
      personalInfo: personalformData,
      enrollmentDetails: enrollformData,
      academicBackground: acadbackformData,
      academicInfo: acedamicformData,
      careerProgression: {
        placement: placementformData.placements,
        exams: placementformData.competitiveExam,
        higherStudy: placementformData.higherStudy,
        startup: placementformData.startup,
      },
      curricularInfo: curricularformData,
      miscellenous: {
        lor: miscformData.lor,
        keyLearnings: miscformData.keyLearnings,
        sop: miscformData.sop,
        vision: miscformData.vision,
      },
    };

    console.log(JSON.stringify(allFormData.academicInfo.projectDetails));
    console.log(typeof allFormData.academicInfo.projectDetails);
    //for submitting form data to the server
    try {
      const response = await fetch(
        "http://localhost:5000/users/details-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allFormData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);

        // fetch user details after form submission
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="));
        if (token) {
          fetchUserProfile(token.split("=")[1]);
        }
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //^ For debugging purpose (checking form details in console)
  const logStateValues = (activeComponent) => {
    console.log("Active Component:", activeComponent);
    switch (activeComponent) {
      case "General Info":
        console.log("Personal Info:", personalformData);
        break;
      case "Enrollment Details":
        console.log("Enrollment Details:", enrollformData);
        break;
      case "Academic Background":
        console.log("Academic Background:", acadbackformData);
        break;
      case "Academic Info":
        console.log("Academic Info:", acedamicformData);
        break;
      case "Placement":
        console.log("Placement Details:", placementformData);
        break;
      case "Co-Curricular and Extra-Curricular Activities":
        console.log(
          "Co-Curricular and Extra-Curricular Activities:",
          curricularformData
        );
        break;
      case "Miscellaneous":
        console.log("Miscellaneous:", miscformData);
        break;
      default:
        console.log("Unknown Section");
    }
  };

  //& array of dicts containing section titles and component tags
  const sections = [
    {
      title: "General Info",
      component: (
        <PersonalInfoForm
          formData={personalformData}
          handleChange={handlepersonalChange}
        />
      ),
    },
    {
      title: "Enrollment Details",
      component: (
        <EnrollmentDetailsForm
          formData={enrollformData}
          handleChange={handleenrollChange}
        />
      ),
    },
    {
      title: "Academic Background",
      component: (
        <AcademicBackgroundForm
          formData={acadbackformData}
          handleChange={handleacadbackChange}
        />
      ),
    },
    {
      title: "Academic Info",
      component: (
        <AcademicInfoForm
          formData={acedamicformData}
          handleChange={handleacedamicChange}
        />
      ),
    },
    {
      title: "Placement",
      component: (
        <ProgressionForm
          formData={placementformData}
          handleChange={handlePlacementChange}
        />
      ),
    },
    {
      title: "Co-Curricular and Extra-Curricular Activities",
      component: (
        <CoCurricularForm
          formData={curricularformData}
          handleChange={handleCurricularChange}
        />
      ),
    },
    {
      title: "Miscellaneous",
      component: (
        <MiscellaneousForms
          formData={miscformData}
          handleChange={handleMiscChange}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Adjust layout for mobile
        overflowY: isMobile ? "auto" : "hidden",
        backgroundColor: "white",
      }}
    >
      {/* Sidebar (Desktop and Mobile) */}
      {!isMobile && (
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          profileAvatar={
            <Avatar
              sx={{
                width: 80,
                height: 80,
                marginBottom: 2,
                backgroundColor: "#fff",
                color: "#b70924",
                fontSize: "2rem",
              }}
            >
              {user?.personalInfo?.name?.charAt(0).toUpperCase() || "U"}
            </Avatar>
          }
        />
      )}
      {isMobile && (
        <>
          <IconButton
            sx={{ position: "absolute", top: 16, left: 16 }}
            onClick={() => setMobileSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
          >
            <Sidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              profileAvatar={
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    marginBottom: 2,
                    backgroundColor: "#fff",
                    color: "#b70924",
                    fontSize: "2rem",
                  }}
                >
                  {user?.personalInfo?.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>
              }
            />
          </Drawer>
        </>
      )}
      {/* Form Section */}
      <Box
        key={activeSection}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? "50px" : "70px", // Adjust padding for mobile
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 2, color: "#b70924" }}
        >
          {sections[activeSection].title}
        </Typography>

        {/* component selection based on activeSession state */}
        {sections[activeSection].component}

        {/* If mobile use button to proceed to next page */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // Adjust spacing for Back and Next buttons
            gap: 2,
          }}
        >
          {activeSection > 0 && (
            // Render "Back" button for all sections except the first one
            <Button
              variant="outlined"
              sx={{
                mt: 3,
                borderRadius: "10px",
                color: "#b70924",
                borderColor: "#b70924",
                "&:hover": { background: "#f5f5f5" },
                width: isMobile ? "40%" : "20%", // Adjust button width for mobile
              }}
              onClick={() =>
                setActiveSection((prev) => (prev > 0 ? prev - 1 : prev))
              }
            >
              Back
            </Button>
          )}
          {activeSection < sections.length - 1 ? (
            // Render "Next" button for all sections except the last one
            <Button
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: "10px",
                background: "#b70924",
                color: "#fff",
                "&:hover": { background: "#90071d" },
                width: isMobile ? "40%" : "20%", // Adjust button width for mobile
              }}
              onClick={() =>
                setActiveSection((prev) =>
                  prev < sections.length - 1 ? prev + 1 : prev
                )
              }
            >
              Next
            </Button>
          ) : (
            // Render "Submit" button on the last section
            <Button
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: "10px",
                background: "#388e3c",
                color: "#fff",
                "&:hover": { background: "#2e7d32" },
                width: isMobile ? "40%" : "20%", // Adjust button width for mobile
              }}
              onClick={() => handleFormSubmit()}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
