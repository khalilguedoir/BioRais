import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Divider, IconButton, Link, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from "formik";
import * as React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  removeFromCart
} from "../../state";
import { shades } from "../../theme";
import { FlexBox } from "../global/CartMenu";
import Payment from "./Payment";
import Shipping from "./Shipping";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  const [productList, setProductList] = React.useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1 ? true : false;
  const isThirdStep = activeStep === 2 ? true : false;
  const dispatch = useDispatch();


  const handleFormSubmit = async (values, actions) => {
    // setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isSecondStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isThirdStep) {
      makeOrder(values)
    }

    actions.setTouched({});

    console.log({ values });

  };

  async function makeOrder(values) {
    const requestBody = {
      "data": {
        username: values.billingAddress.firstName.toString(),
        ville: values.billingAddress.country.toString(),
        address: values.billingAddress.street1.toString(),
        email: values.billingAddress.email.toString(),
        phone: values.billingAddress.phone.toString(),
        orders: cart.map((item) => ({
          name: item.attributes.name, quantite: item.count
        })),
        total: totalPrice.toString(),
      }
    };






    const response = await fetch("http://localhost:1337/api/client-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const res = await response.json();
    console.log({ res });
    if (res) {
      handleClickOpen()
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price + 8;
  }, 0);
  const totalPriceWithoutLivraison = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);


  console.log(activeStep);

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>PANIER DETAILS</StepLabel>
        </Step>
        <Step>
          <StepLabel>INFORMATIONS DE FACTURATION</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Stack width="100%" direction="row" spacing="10px" alignItems="flex-start" my="50px">
                  <Stack direction="column" alignItems="start" spacing="10px" width="100%">
                    {cart.map((item) => (
                      <Box key={`${item.attributes.name}-${item.id}`} sx={{ boxShadow: theme => theme.shadows[10], borderRadius: 2, backgroundColor: "white", p: 2, width: "100%" }}>
                        <FlexBox>
                          <Box flex="1 1 40%">
                            <img
                              alt={item?.name}
                              width="70px"
                              height="70px"
                              style={{ borderRadius: "8px" }}
                              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
                            />
                          </Box>
                          <Box flex="1 1 60%">
                            <FlexBox mb="5px">
                              <Typography fontWeight="bold">
                                {item.attributes.name}
                              </Typography>
                              <IconButton
                                onClick={() =>
                                  dispatch(removeFromCart({ id: item.id }))
                                }
                              >
                                <CloseIcon />
                              </IconButton>
                            </FlexBox>
                            <Typography>{item.attributes.shortDescription}</Typography>
                            <FlexBox m="15px 0">
                              <Box
                                display="flex"
                                alignItems="center"
                                border={`1.5px solid ${shades.neutral[500]}`}
                                px={4}
                              >
                                <Typography>{item.count}</Typography>
                              </Box>
                              <Typography fontWeight="bold">
                                {item.attributes.price * item.count} DT
                              </Typography>
                            </FlexBox>
                          </Box>
                        </FlexBox>
                      </Box>
                    ))}

                  </Stack>
                  <Stack width="100%">
                    <Box sx={{ boxShadow: theme => theme.shadows[10], borderRadius: 2, backgroundColor: "white", p: 2 }}>
                      <FlexBox m="20px 0">
                        <Typography fontWeight="bold">SOUS-TOTAL</Typography>
                        <Typography fontWeight="bold">{totalPriceWithoutLivraison}DT</Typography>
                      </FlexBox>
                      <FlexBox m="20px 0">
                        <Typography fontWeight="bold">LIVRAISON Ã DOMICILE</Typography>
                        <Typography fontWeight="bold">8 DT</Typography>
                      </FlexBox>
                      <FlexBox m="20px 0">
                        <Typography fontWeight="bold">TOTAL</Typography>
                        <Typography fontWeight="bold">{totalPrice}DT</Typography>
                      </FlexBox>
                    </Box>
                  </Stack>
                </Stack>
              )}
              {isSecondStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isThirdStep && (
                <Stack width="100%" direction="row" spacing="10px" alignItems="flex-start" my="50px">
                  <Stack direction="column" alignItems="start" spacing="10px" width="100%">
                    <Typography>Votre order a était envoyer</Typography>
                  </Stack>
                </Stack>
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && activeStep < 2 && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[400],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    RETOUR
                  </Button>
                )}
                {activeStep <= 2 &&
                  (
                    <Button
                      fullWidth
                      type="submit"
                      onClick={() => setActiveStep(activeStep + 1)}
                      color="primary"
                      variant="contained"
                      sx={{
                        backgroundColor: shades.primary[400],
                        boxShadow: "none",
                        color: "white",
                        borderRadius: 0,
                        padding: "15px 40px",
                        width: "50%"
                      }}
                    >
                      {isFirstStep ? "Proceed to checkout" : isSecondStep ? "CONFIRMER LA COMMANDE" : "Contine"}
                    </Button>
                  )
                }

              </Box>
            </form>
          )
          }
        </Formik >

        <AlertDialog
          confimred={confirmed}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        />


      </Box >
    </Box >
  );
};



const AlertDialog = (props) => {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Commande ajouter avec succées"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Votre commande est bien ajouter, nous vous contactez plus tot.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} sx={{ color: "green" }} autoFocus>
            <Link href="/" sx={{ textDecoration: "none" }}>

              Agree
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
