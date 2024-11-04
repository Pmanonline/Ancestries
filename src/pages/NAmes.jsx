import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNameDetails } from "../features/nameFeature/nameAction";
import Spinner from "../components/tools/Spinner";
import { DirectionButton2 } from "../components/d-button";
import { NameProfileCard } from "../components/Cards/NameProfileCard";
import NoResult from "../assets/images/noResult.png";
import CardImage2 from "../assets/images/nameMeaning.png";
import CultureImage from "../assets/images/stateAndcultureImage1.png";
import { ClipLoader } from "react-spinners";
import backendURL from "../config";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { RiArrowDropDownLine } from "react-icons/ri";

function NameDetails() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { specificName, loading, error } = useSelector((state) => state.name);

  // State for search input
  const [surname, setSurname] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );

  useEffect(() => {
    if (name) {
      dispatch(fetchNameDetails(name));
    }
  }, [dispatch, name]);

  const handleChange = async (event) => {
    const newValue = event.target.value;
    setSurname(newValue);

    if (newValue.trim()) {
      setIsSearching(true);
      try {
        const response = await fetch(
          `${backendURL}/api/searchUser ?query=${newValue}`
        );
        const data = await response.json();
        setSearchResults(data.names);
        setNoResults(data.names.length === 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setIsSearching(false);
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleSelectName = (selectedName) => {
    const updatedSearches = [selectedName, ...recentSearches].slice(0, 3);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

    navigate(`/names/${encodeURIComponent(selectedName)}`);
    setSurname("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (surname.trim()) {
      navigate(`/names/${encodeURIComponent(surname)}`);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
        <ClipLoader color="#36D7B7" loading={true} size={100} />;
      </div>
    );
  }
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!specificName)
    return <Typography>No details found for the specified name.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        About {specificName.name}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Meaning
        </Typography>
        <Typography>{specificName.meaning}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Background
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography>{specificName.background}</Typography>
          </Grid>
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            <img
              src={CardImage2}
              alt="Sample"
              className="w-full border border-gray-300 rounded-sm"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Tribes that use {specificName.name}
        </Typography>
        <Typography>{specificName.tribeDescribe}</Typography>
      </Paper>

      <IlajeContent specificName={specificName} />

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          OTHER EXTENSIONS OF {specificName.name}
        </Typography>
        {specificName.extensions && specificName.extensions.length > 0 && (
          <List>
            {specificName.extensions.map((extension) => (
              <ListItem key={extension._id}>
                <ListItemText
                  primary={
                    <span className="inline-block ml-[-0.4rem] text-sm font-bold mr-2 list-disc">
                      {extension.extensionName}
                    </span>
                  }
                  secondary={extension.description}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Great people bearing this name
        </Typography>
        <NameProfileCard />
      </Paper>

      <div className="mt-24">
        <h4 className="text-black my-4 text-sm font-bold text-center">
          Don't Find What You Are Looking For?
        </h4>
        <p className="mt-4 text-center lg:max-w-[35rem] mx-auto">
          Should lead to more on culture and town, religion, tribe family
          photograph, highlight position of people on the photo
        </p>
        <div className="flex flex-col items-center mt-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center w-full sm:w-auto"
          >
            <input
              type="text"
              placeholder="Customize your search more"
              value={surname}
              onChange={handleChange}
              className="px-6 py-2 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-[26rem] focus:outline-none focus:ring-2 focus:ring-green text-black bg-NavClr rounded-xl rounded-bl-xl"
            />
            <button className="text-white flex items-center justify-center bg-green-500 px-4 py-2 bg-green hover:bg-green-600 rounded-xl rounded-br-xl sm:w-auto">
              <span className="mr-2">Search</span>
              <DirectionButton2 className="ml-2" />
            </button>
          </form>
          {isSearching && (
            <div className="text-center mt-4">
              <p className="text-lg font-semibold mb-2">Searching...</p>
            </div>
          )}
          {noResults && surname.trim() && (
            <div className="text-center mt-4">
              <div className="flex flex-col items-center">
                <img
                  src={NoResult}
                  alt="No Results"
                  className="w-24 h-24 mb-4"
                />
                <p className="text-lg font-semibold mb-2">No results found</p>
                <p className="text-gray-500">
                  Try a different search term or check the spelling.
                </p>
              </div>
            </div>
          )}
          {searchResults?.length > 0 && (
            <div className="text-center mt-4">
              <p className="text-lg mb-2">Related Searches</p>
              <div className="flex flex-wrap justify-center space-x-2">
                {searchResults.map((result) => (
                  <button
                    key={result._id}
                    onClick={() => handleSelectName(result.name)}
                    className="bg-gray-100 hover:bg-gray-300 px-4 py-2 rounded"
                  >
                    {result.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Searches
        </Typography>
        <List>
          {recentSearches.length > 0 ? (
            recentSearches.map((search, index) => (
              <ListItem key={index}>{search}</ListItem>
            ))
          ) : (
            <ListItem>No recent searches</ListItem>
          )}
        </List>
      </Box>
    </Container>
  );
}

export default NameDetails;

export function IlajeContent({ specificName }) {
  const [activeState, setActiveState] = useState(null);
  const [activeTribe, setActiveTribe] = useState(null);

  const toggleStateContent = (stateName) => {
    setActiveState(activeState === stateName ? null : stateName);
    setActiveTribe(null);
  };

  const toggleTribeContent = (tribeName) => {
    setActiveTribe(activeTribe === tribeName ? null : tribeName);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Tribes that use {specificName.name}
      </Typography>
      {specificName.states?.map((state) => (
        <div key={state.stateName}>
          <Button
            onClick={() => toggleStateContent(state.stateName)}
            sx={{ width: "100%", mb: 2 }}
          >
            <Typography variant="body1">{state.stateName}</Typography>
            <RiArrowDropDownLine
              sx={{
                transform:
                  activeState === state.stateName ? "rotate(180deg)" : "",
              }}
            />
          </Button>
          {activeState === state.stateName && (
            <div>
              {state.tribes?.map((tribe) => (
                <div key={tribe.tribeName}>
                  <Button
                    onClick={() => toggleTribeContent(tribe.tribeName)}
                    sx={{ width: "100%", mb: 2 }}
                  >
                    <Typography variant="body1">{tribe.tribeName}</Typography>
                    <RiArrowDropDownLine
                      sx={{
                        transform:
                          activeTribe === tribe.tribeName
                            ? "rotate(180deg)"
                            : "",
                      }}
                    />
                  </Button>
                  {activeTribe === tribe.tribeName && (
                    <div>
                      <Typography variant="body1">
                        {tribe.description}
                      </Typography>
                      <Link to="/genealogy">
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ width: "100%", mt: 2 }}
                        >
                          View more on State and Culture
                          <DirectionButton2 sx={{ ml: 1 }} />
                        </Button>
                      </Link>
                      <img
                        src={tribe.image || CultureImage}
                        alt={tribe.tribeName}
                        sx={{ width: "100%", mt: 2 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </Paper>
  );
}
