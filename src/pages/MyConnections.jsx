import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchPendingRequests,
  respondToConnectionRequest,
  fetchConnections,
  deleteConnection,
} from "../features/connectionFeature/connectionAction";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Pagination,
  Box,
  CircularProgress,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import backendURL from "../config";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PendingRequests = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const { connectionRequests, status } = useSelector(
    (state) => state.connectionRequests
  );
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const itemsPerPage = 5;

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(fetchPendingRequests(userInfo.id));
    }
  }, [dispatch, userInfo]);

  const handleResponse = async (requestId, response) => {
    try {
      await dispatch(
        respondToConnectionRequest({ requestId, response })
      ).unwrap();
      setSnackbar({
        open: true,
        message: `Request ${response.toLowerCase()}ed successfully!`,
        severity: "success",
      });
      dispatch(fetchPendingRequests(userInfo.id));
      dispatch(fetchConnections(userInfo.id));
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || `Failed to ${response.toLowerCase()} request.`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const paginatedRequests = connectionRequests.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
      <Typography variant="h7" gutterBottom>
        <PersonAddIcon
          sx={{ mr: 1, verticalAlign: "middle", fontWeight: "bold" }}
        />
        Pending Connection Requests
      </Typography>
      {status === "loading" ? (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      ) : connectionRequests.length === 0 ? (
        <Typography
          sx={{ m: 1, verticalAlign: "middle" }}
          color="textSecondary"
        >
          No pending requests
        </Typography>
      ) : (
        <>
          <List>
            {paginatedRequests.map((request) => (
              <ListItem
                key={request._id}
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="accept"
                      onClick={() => handleResponse(request._id, "Accepted")}
                      color="primary"
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="reject"
                      onClick={() => handleResponse(request._id, "Rejected")}
                      color="error"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar src={`${backendURL}/${request?.senderId.image}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${request?.senderId.firstName} ${request?.senderId.lastName}`}
                  secondary={request?.senderId.email || "No email provided"}
                />
              </ListItem>
            ))}
          </List>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(connectionRequests.length / itemsPerPage)}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

const ConnectionsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.user);
  const { connections, status } = useSelector(
    (state) => state.connectionRequests
  );
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [connectionToDelete, setConnectionToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const itemsPerPage = 10;

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(fetchConnections(userInfo.id));
    }
  }, [dispatch, userInfo]);

  const handleDeleteConnection = async () => {
    try {
      await dispatch(deleteConnection(connectionToDelete)).unwrap();
      setSnackbar({
        open: true,
        message: "Connection removed successfully!",
        severity: "success",
      });
      dispatch(fetchConnections(userInfo.id));
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to remove connection.",
        severity: "error",
      });
    }
    setDeleteDialogOpen(false);
    setConnectionToDelete(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const paginatedConnections = Array.isArray(connections)
    ? connections.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  const handleUserClick = (userId) => {
    navigate(`/FamilyTree-feeds/${userId}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h7" gutterBottom>
        <PersonRemoveIcon
          sx={{ mr: 1, verticalAlign: "middle", fontWeight: "bold" }}
        />
        My Connections
      </Typography>
      {status === "loading" ? (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      ) : !Array.isArray(connections) || connections.length === 0 ? (
        <Typography color="textSecondary">
          You have no connections yet.
        </Typography>
      ) : (
        <>
          <List>
            {paginatedConnections.map((connection) => (
              <ListItem
                key={connection._id}
                secondaryAction={
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setConnectionToDelete(connection._id);
                      setDeleteDialogOpen(true);
                    }}
                    sx={{
                      textTransform: "lowercase", // make text lowercase
                      fontSize: "0.75rem", // reduce the font size
                      padding: "4px 8px", // reduce padding for smaller button
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.1)", // hover effect with light red background
                        borderColor: "rgba(255, 0, 0, 0.5)", // change border color on hover
                      },
                    }}
                  >
                    Delete
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={`${backendURL}/${connection.userId1.image}`}
                    onClick={() => handleUserClick(connection.userId1._id)}
                    style={{ cursor: "pointer" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${connection.userId1.firstName} ${connection.userId1.lastName}`}
                  secondary={connection.userId1.email || "No email provided"}
                  onClick={() => handleUserClick(connection.userId1._id)}
                  style={{ cursor: "pointer" }}
                />
              </ListItem>
            ))}
          </List>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil((connections?.length || 0) / itemsPerPage)}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete Connection"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this connection?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConnection} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export function MyConnections() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Connections
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PendingRequests />
        </Grid>
        <Grid item xs={12}>
          <ConnectionsList />
        </Grid>
      </Grid>
    </Container>
  );
}
