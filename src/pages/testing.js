import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DirectionButton2 } from "../../components/d-button";

// MUI imports
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  IconButton,
  styled,
  useMediaQuery,
  Container,
} from "@mui/material";
import {
  Message as MessageIcon,
  Home as HomeIcon,
  Group as GroupIcon,
  Book as BookIcon,
  PersonAdd as PersonAddIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import FamilyTreeIcon from "@mui/icons-material/AccountTree"; // For "View Family Tree"
import ChatIcon from "@mui/icons-material/Chat"; // For "Start Chat"
import LocationOnIcon from "@mui/icons-material/LocationOn"; // For "State & Culture"
import DetailsIcon from "@mui/icons-material/Details"; // For "Family Details"
import InfoIcon from "@mui/icons-material/Info"; // For "About"

// Custom imports (assumed to exist)
import { AuthContext } from "../../components/context/AuthContext";
import { ChatContext } from "../../components/context/chatContext";
import {
  getProfile,
  getAllProfiles,
} from "../../features/UserFeature/UserAction";
import { calculateBirthdayCountdown } from "../../components/tools/birthdayCountdown";
import noProfile from "../../assets/images/noProfile.png";
import BirthdayFrame from "../../assets/images/birthdayFrame.png";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8080";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

const BirthdayCard = styled(Card)(({ theme }) => ({
  backgroundImage: `url(${BirthdayFrame})`,
  backgroundSize: "cover",
  height: "15rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  "& .MuiTypography-root": {
    color: theme.palette.common.black,
    textAlign: "center",
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "300px", // Adjust as needed
}));

const CarouselTrack = styled(Box)(({ theme }) => ({
  display: "flex",
  transition: "transform 0.5s ease",
}));

const CarouselCard = styled(Card)(({ theme }) => ({
  flex: "0 0 auto",
  width: "250px", // Adjust card width as needed
  marginRight: theme.spacing(2),
}));

const CarouselButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
}));

function FamilyTreeFeeds() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const { CreateChat, updateCurrentChat } = useContext(ChatContext);

  const { profile, profiles, loading } = useSelector((state) => state.person);

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
      dispatch(getAllProfiles());
    }
  }, [dispatch, userId]);

  const formattedDate = profile?.DOB
    ? moment(profile.DOB).format("DD MMMM YYYY")
    : "N/A";
  const daysUntilBirthday = calculateBirthdayCountdown(formattedDate);
  const imageSrc = profile?.image
    ? `${backendURL}/${profile.image}`
    : noProfile;

  const handleStartChat = async () => {
    try {
      const chat = await CreateChat(userId, user.id);
      if (chat) {
        updateCurrentChat(chat, user, []);
        navigate("/chatPage");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  const relatedProfiles = profiles.filter(
    (p) =>
      (p.firstName === profile?.firstName ||
        p.lastName === profile?.lastName) &&
      p._id !== userId
  );
  const carouselRef = useRef(null);
  const [carouselPosition, setCarouselPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const maxScroll =
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        setCarouselPosition((prevPosition) => {
          const newPosition = prevPosition + 1;
          return newPosition > maxScroll ? 0 : newPosition;
        });
      }
    }, 50); // Adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselPosition,
        behavior: "smooth",
      });
    }
  }, [carouselPosition]);

  const handleCarouselScroll = (direction) => {
    const scrollAmount = 250; // Adjust based on card width
    setCarouselPosition((prevPosition) => {
      const newPosition =
        prevPosition + (direction === "left" ? -scrollAmount : scrollAmount);
      const maxScroll =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      return Math.max(0, Math.min(newPosition, maxScroll));
    });
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ display: "flex", p: 3 }}>
      {/* Sidebar */}
      <section className="Nlg:hidden ">
        <Box
          component="nav"
          sx={{
            width: 240,
            flexShrink: 0,
            bgcolor: "background.paper",
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            marginTop: 9,
          }}
        >
          <List>
            {/* View Family Tree */}
            <ListItem button component={Link} to={`/view-tree/${userId}`}>
              <FamilyTreeIcon sx={{ marginRight: 1 }} /> {/* Add icon */}
              <ListItemText primary="View Family Tree" />
            </ListItem>

            {/* Start Chat */}
            <ListItem button onClick={handleStartChat}>
              <ChatIcon sx={{ marginRight: 1 }} /> {/* Add icon */}
              <ListItemText primary="Start Chat" />
            </ListItem>

            {/* State & Culture */}
            <ListItem
              button
              component={Link}
              to={`/genealogy/${profile?.state}`}
            >
              <LocationOnIcon sx={{ marginRight: 1 }} /> {/* Add icon */}
              <ListItemText primary="State & Culture" />
            </ListItem>

            {/* Family Details */}
            <ListItem button>
              <DetailsIcon sx={{ marginRight: 1 }} /> {/* Add icon */}
              <ListItemText primary="Family Details" />
            </ListItem>

            {/* About */}
            <ListItem button>
              <InfoIcon sx={{ marginRight: 1 }} /> {/* Add icon */}
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Box>
      </section>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            maxWidth: 600,
            justifyContent: "space-between",
            marginBottom: 2,
          }}
          variant="h4"
          gutterBottom
        >
          {/* Left side: H2 heading */}
          <h2 className="text-black text-2xl md:text-xl font-bold uppercase font-Montserrat text-left">
            ABOUT {profile?.lastName} {profile?.firstName} {profile?.middlename}
          </h2>

          {/* Right side: Button */}
          <Link to={`/view-tree/${userId}`}>
            <button className="bg-green text-white text-xs mx-2 rounded-2xl w-[9rem] py-2 flex items-center justify-center transition ease-in-out duration-200 transform hover:scale-105 Nlg:hidden">
              <span className="mr-2"> Go to Tree</span>
              <DirectionButton2 />
            </button>
          </Link>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: 600,
            marginLeft: 0,
          }}
        >
          <Avatar
            src={imageSrc}
            alt={`${profile?.firstName} ${profile?.lastName}`}
            sx={{
              width: "50vw",
              height: "30vw",
              marginBottom: 2,
              borderRadius: 2,
            }}
          />
          <Typography variant="h5" sx={{ marginBottom: 1, font: 2 }}>
            {profile?.lastName} {profile?.firstName} {profile?.middlename}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "row",
              gap: 2,
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              startIcon={<MessageIcon />}
              sx={{
                backgroundColor: "#00d121",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                width: { xs: "auto", sm: "auto", md: "auto" },
                fontSize: { xs: "0.75rem", sm: "0.75rem" },
                padding: { xs: "6px 8px", sm: "8px 16px" },
              }}
            >
              Message
            </Button>

            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{
                backgroundColor: "#00d121",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                width: { xs: "auto", sm: "auto", md: "auto" },
                fontSize: { xs: "0.75rem", sm: "0.75rem" },
                padding: { xs: "6px 8px", sm: "8px 16px" },
              }}
            >
              Connect
            </Button>

            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{
                backgroundColor: "#00d121",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                width: { xs: "auto", sm: "auto", md: "auto" },
                fontSize: { xs: "0.75rem", sm: "0.75rem" },
                padding: { xs: "6px 8px", sm: "8px 16px" },
              }}
            >
              Connect
            </Button>
          </Box>
        </Box>

        {/* Personal Details */}
        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            Personal Details
          </Typography>
          <Grid container spacing={2}>
            {[
              { label: "Phone Number", value: profile?.phoneNumber },
              { label: "Email", value: profile?.email },
              { label: "State of Origin", value: profile?.state },
              { label: "Local Government", value: profile?.lga },
              { label: "Autonomous Community", value: profile?.autonomous },
              { label: "Kindred", value: profile?.kindred },
              { label: "Religion", value: profile?.religion },
              { label: "Tribe", value: profile?.tribe },
              { label: "Profession", value: profile?.profession },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Typography variant="subtitle2">
                  <span className=" font-bold">{item.label}</span>:
                </Typography>
                <Typography variant="body2">
                  {item.value || "Unavailable"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </StyledPaper>

        {/* Social Links */}
        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            Social Media
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton href={profile?.twitter} target="_blank">
              <TwitterIcon />
            </IconButton>
            <IconButton
              href={`https://wa.me/${profile?.phoneNumber}`}
              target="_blank"
            >
              <WhatsAppIcon />
            </IconButton>
            <IconButton href={profile?.facebook} target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton href={profile?.instagram} target="_blank">
              <InstagramIcon />
            </IconButton>
          </Box>
        </StyledPaper>

        {/* Birthday Countdown */}
        <BirthdayCard>
          <Typography variant="h5" gutterBottom>
            {profile?.firstName}'s birthday is in {daysUntilBirthday}{" "}
            {daysUntilBirthday === 1 ? "day" : "days"}
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: "80%" }}>
            On days like this, Essential Groups advises visitors like yourself
            to find a way to wish this person a happy birthday. You can use our
            provided social media handles, and if this person is deceased, you
            can still get through to any family member through our platform
            here.
          </Typography>
        </BirthdayCard>

        {/* About Section */}
        {profile?.about && (
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Background
            </Typography>
            <Typography variant="body2"> {getText(profile.about)}</Typography>
          </StyledPaper>
        )}

        {/* Family Details */}
        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            Family Photos
          </Typography>
          <FamilyDetails />
        </StyledPaper>

        {/* Related Profiles Carousel */}
        {relatedProfiles.length > 0 && (
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Great People Bearing This Name
            </Typography>
            <CarouselContainer>
              <CarouselButton
                onClick={() => handleCarouselScroll("left")}
                sx={{ left: 0 }}
              >
                <ChevronLeftIcon />
              </CarouselButton>
              <CarouselTrack ref={carouselRef}>
                {relatedProfiles.map((item) => (
                  <CarouselCard key={item._id}>
                    <CardContent>
                      <Avatar
                        src={
                          item.image ? `${backendURL}/${item.image}` : noProfile
                        }
                        alt={item.firstName}
                        sx={{ width: 100, height: 100, margin: "auto" }}
                      />
                      <Typography variant="h6" align="center">
                        {item.lastName} {item.firstName} {item.middleName}
                      </Typography>
                      <Typography variant="body2" align="center">
                        {item.profession}
                      </Typography>
                      <Typography
                        variant="body2"
                        align="center"
                        color="text.secondary"
                      >
                        {item.gender}
                      </Typography>
                    </CardContent>
                  </CarouselCard>
                ))}
              </CarouselTrack>
              <CarouselButton
                onClick={() => handleCarouselScroll("right")}
                sx={{ right: 0 }}
              >
                <ChevronRightIcon />
              </CarouselButton>
            </CarouselContainer>
          </StyledPaper>
        )}
      </Box>
    </Box>
  );
}

export default FamilyTreeFeeds;
