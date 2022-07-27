import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";

import axios from "axios";
import { API_URL } from "./Utils/constant";
import { useHistory } from "react-router-dom";

//dialog box import
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";



/**
 * draggable dialog component
 * @param {*} props
 * @returns
 */
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "85%",
    margin: "auto",
    marginTop: "20px",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  image: {
    backgroundImage:
      "url(https://2wanderlust.files.wordpress.com/2013/11/slide_321715_3023940_free.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

const initialState = {
  email: "",
  password: "",
  errors: {
    email: "",
    password: "",
  },
};
const AddUser = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    status: "",
    accountType: "",
    password: "",
    dateOfBirth:new Date(),
    errors: {
      email: "",
      password: "",
    },
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      const { email, password } = state;
      if (email.trim() !== "" && password.trim() !== "") {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        await axios.post(`${API_URL}/user/insert`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setSuccessMsg("upload Success");
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  const reload = () => {
    setState(initialState);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
    const validEmail = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const validPassword = RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );

    switch (name) {
      case "email":
        errors.email =
          value.length <= 0
            ? "Email can not be empty! Ex :- jhon@mail.com"
            : "";
        if (!validEmail.test(value)) {
          errors.email = "Enter valid Email ! Ex:- jhon@mail.com";
        }
        break;
      case "password":
        errors.password = value.length <= 0 ? "Password can not be empty!" : "";

        if (!validPassword.test(value)) {
          errors.password =
            "Password must be cantain 1 Capital letter , 1 special charectar , 1 digit and 8 charectars long  ! Ex:- A@1aaaaa";
        }
        break;
      default:
        break;
    }
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { errors } = state;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add New User
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <div className={classes.alert}>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle
                  style={{
                    cursor: "move",
                    backgroundColor: "#02032b",
                    color: "#ffffff",
                  }}
                  id="draggable-dialog-title"
                ></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {successMsg !== "" ? (
                      <>
                        <div style={{ color: "#008000" }}>
                          <CheckIcon />
                          {successMsg}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ color: "#aa202b" }}>
                          <ClearIcon />
                          {errorMsg}
                        </div>
                      </>
                    )}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="fName"
              autoComplete="fName"
              autoFocus
              value={state.fName || ""}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lName"
              label="Last Name"
              name="lName"
              autoComplete="lName"
              autoFocus
              value={state.lName || ""}
              onChange={handleInputChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E- mail address"
              name="email"
              autoComplete="email"
              autoFocus
              value={state.email || ""}
              onChange={handleInputChange}
            />
            

            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}


<DatePicker
        label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
      />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile"
              name="mobile"
              autoComplete="mobile"
              autoFocus
              value={state.mobile || ""}
              onChange={handleInputChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="status"
              label="Status"
              name="status"
              autoComplete="status"
              autoFocus
              value={state.status || ""}
              onChange={handleInputChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              value={state.password || ""}
              onChange={handleInputChange}
            />

            {errors.password.length > 0 && (
              <span className="error">{errors.password}</span>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="accountType"
              label="Account Type"
              name="accountType"
              autoComplete="accountType"
              autoFocus
              value={state.accountType || ""}
              onChange={handleInputChange}
            />

            <div className={classes.btnGroup}>
              <Button
                id="btnBack"
                type="button"
                onClick={history.goBack}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.back}
              >
                Back
              </Button>

              <Button
                id="btnSave"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.sub}
              >
                Save
              </Button>

              <Button
                type="reset"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={reload}
                className={classes.clear}
              >
                Clear
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddUser;
