import { getIn } from "formik";
import { Box, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddressForm = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // these functions allow for better code readability
  const formattedName = (field) => `${type}.${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
      getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      rowGap="10px"
    // px={40}
    >
      <Stack direction="row" alignItems="center">

      </Stack>
      <TextField
        fullWidth
        type="text"
        label="Nom prénom"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name={formattedName("firstName")}
        error={formattedError("firstName")}
        helperText={formattedHelper("firstName")}
      />
      <Stack direction="row" alignItems="center" spacing="10px">
        <TextField
          fullWidth
          type="text"
          label="Ville"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.country}
          name={formattedName("country")}
          error={formattedError("country")}
          helperText={formattedHelper("country")}
          sx={{ minWidth: "40%" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Adresse"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.street1}
          name={formattedName("street1")}
          error={formattedError("street1")}
          helperText={formattedHelper("street1")}
          sx={{ minWidth: "40%" }}
        />
      </Stack>

      <TextField
        fullWidth
        type="text"
        label="email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name={formattedName("email")}
        error={formattedError("email")}
        helperText={formattedHelper("email")}
        sx={{ minWidth: "40%" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Telephone"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phoneNumber}
        name={formattedName("phone")}
        error={formattedError("phone")}
        helperText={formattedHelper("phone")}
        sx={{ minWidth: "40%" }}
      />
    </Box>
  );
};

export default AddressForm;
