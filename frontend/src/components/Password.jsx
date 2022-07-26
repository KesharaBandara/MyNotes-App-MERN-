// import React from "react";
// import {
//   IconButton,
//   Grid,
//   InputAdornment,
//   TextField,
// } from "@material-ui/core";
// import ShowPass from "@material-ui/icons/Visibility";
// import HidePass from "@material-ui/icons/VisibilityOff";

// const Password = ({
//   Password,
//   name,
//   handleOnchange,
//   half,
//   type,
//   label,
//   autoFocus,
//   className,
//   handleShowPass,
// }) => (
//   <Grid item xs={12} sm={half ? 6 : 12}>
//     <TextField
//       name={name}
//       onChange={handleOnchange}
//       variant="outlined"
//       required
//       fullWidth
//       type={type}
//       label={label}
//       autoFocus={autoFocus}
//       className={className}
//       InputProps={
//         name === "password"
//           ? {
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleShowPass}>
//                     {type === "password" ? <ShowPass /> : <HidePass />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }
//           : ""
//       }
//     />
//   </Grid>
// );
// export default Password;