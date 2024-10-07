import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./features/auth/authSlice";
import { ChatContextProvider } from "./components/context/chatContext";
import { AuthContext } from "./components/context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Modal from "./components/tools/sessionModal";

// Authentication Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgotpassword from "./pages/Forgotpassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/profilePage";

// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Pages
import LoginGetStarted from "./pages/LoginGetStarted";
import Home from "./pages/Home";
import NameMeaning from "./pages/NameMeaning";
import FamilyTree from "./pages/Family-tree";
import Genealogy from "./pages/Genealogy";
import { SearchTree } from "./pages/SearchTree";
import AboutUs from "./pages/AboutUs";
import NameDetails from "./pages/NAmes";
import GetStartedWithFamilyTree from "./pages/GetStartedWithFamilyTree";
import FamilyTreeFeeds from "./pages/FamilyTree-Pages/FamilyTree-Feeds";
import Layout from "./pages/LAYOUTS/Pages/FamilyTreeSelf";
import NotFound from "./pages/NotFound";
import SearchUsers from "./components/tools/SearchUsers";
import HistoricalPeople from "./pages/HistoricalPeople";
import AcceptInvite from "./pages/acceptInvite";

//  all family tree forms
import PersonalForm from "./components/Forms/personalForm";
import MotherForm from "./components/Forms/MothersForm";
import FatherForm from "./components/Forms/FathersForm";
import PaternalGrandmotherForm from "./components/Forms/PaternalGrandmotherForm";
import PaternalGrandfatherForm from "./components/Forms/PaternalGrandfatherForm";
import MaternalGrandmotherForm from "./components/Forms/MaternalGrandmotherForm";
import MaternalGrandfatherForm from "./components/Forms/MaternalGrandfatherForm";
import MaternalGGMform from "./components/Forms/maternalGGMform";
import MaternalGGFform from "./components/Forms/maternalGGFform";
import PaternalGGMform from "./components/Forms/paternalGGMform";
import PaternalGGFform from "./components/Forms/paternalGGFform";

// Other pages in Layout
import Viewers from "./pages/LAYOUTS/Pages/Viewers";
import Invites from "./pages/LAYOUTS/Pages/Invites";
import FindInTree from "./pages/LAYOUTS/Pages/FindInTree";
import { ViewTree } from "./pages/ViewTree";
import ChatPage from "./pages/chatPage";
import { MyConnections } from "./pages/MyConnections";

function App() {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const noNavFooterRoutes = [
      "/login",
      "/register",
      "/forgotpassword",
      "/VerifyOtpPage",
      "/ResetPassword",
    ];
    const protectedRoutes = ["/layout", "/chatPage"];

    // Avoid unnecessary state updates by checking first
    const shouldShowNav = !noNavFooterRoutes.includes(location.pathname);
    const shouldShowFooter = !protectedRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (showNav !== shouldShowNav) setShowNav(shouldShowNav);
    if (showFooter !== shouldShowFooter) setShowFooter(shouldShowFooter);
  }, [location.pathname]);

  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/VerifyOtpPage" element={<VerifyOTP />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/LoginGetStarted" element={<LoginGetStarted />} />
        <Route path="/name-meanings" element={<NameMeaning />} />
        <Route path="/my-family-tree" element={<FamilyTree />} />
        <Route path="/search-a-tree" element={<SearchTree />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/historicalPeople" element={<HistoricalPeople />} />
        <Route path="/accept-invite" element={<AcceptInvite />} />
        {/* <Route path="/about-ayo" element={<AboutAyo />} /> */}
        <Route path="/names/:name" element={<NameDetails />} />
        <Route path="/get-started" element={<GetStartedWithFamilyTree />} />
        <Route path="/FamilyTree-feeds/:userId" element={<FamilyTreeFeeds />} />
        <Route path="/" element={<Navigate to="/genealogy/Abia State" />} />
        <Route
          path="/genealogy"
          element={<Navigate to="/genealogy/Abia State" />}
        />
        <Route path="/genealogy/:stateName" element={<Genealogy />} />
        <Route path="*" element={<NotFound />} />

        {/* Layout Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="/search" element={<SearchUsers />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* <Route path="/familytree/:userId" element={<FamilyTreePage />} /> */}
          <Route path="/view-tree/:userId" element={<ViewTree />} />
          <Route path="/ChatPage" element={<ChatPage />} />
          <Route path="/MyConnections" element={<MyConnections />} />
          <Route path="/layout" element={<Layout />}>
            <Route path="personal-form/:userId" element={<PersonalForm />} />
            <Route path="mothers-form/:userId" element={<MotherForm />} />
            <Route path="fathers-form/:userId" element={<FatherForm />} />
            <Route
              path="paternalGrandmother-form/:userId"
              element={<PaternalGrandmotherForm />}
            />
            <Route
              path="paternalGrandfather-form/:userId"
              element={<PaternalGrandfatherForm />}
            />
            <Route
              path="maternalGrandmother-form/:userId"
              element={<MaternalGrandmotherForm />}
            />
            <Route
              path="maternalGrandfather-form/:userId"
              element={<MaternalGrandfatherForm />}
            />
            <Route
              path="maternalGGMother-form/:userId"
              element={<MaternalGGMform />}
            />
            <Route
              path="maternalGGFather-form/:userId"
              element={<MaternalGGFform />}
            />
            <Route
              path="paternalGGMother-form/:userId"
              element={<PaternalGGMform />}
            />
            <Route
              path="paternalGGFather-form/:userId"
              element={<PaternalGGFform />}
            />
            <Route path="viewers/:userId" element={<Viewers />} />
            <Route path="invites" element={<Invites />} />
            <Route path="find-in-tree" element={<FindInTree />} />
          </Route>
        </Route>
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default function WrappedApp() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = () => {
    // Redirect to login page or show login form
    window.location.href = "/login";
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let inactivityTimer;

    const refreshAccessToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/refresh-token",
          {},
          { withCredentials: true }
        );
        localStorage.setItem("userToken", response.data.accessToken);
      } catch (error) {
        dispatch(logoutUser());
        setIsModalOpen(true); // Show modal instead of alert
      }
    };

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(refreshAccessToken, 24 * 60 * 60 * 1000); // Refresh before 24h
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // Initialize the timer

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(inactivityTimer);
    };
  }, [dispatch]);

  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          onLogin={handleLogin}
        />
      </div>
      <ChatContextProvider user={user}>
        <Router>
          <App />
        </Router>
      </ChatContextProvider>
    </>
  );
}
