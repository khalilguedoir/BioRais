import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Steps } from "./Steps";

export const Checkout = () => {

  const [step, setStep] = useState(1);
  const [state, setState] = useState({});
  const [open, setOpen] = useState(false);

  const activeStep = step === 2 ? true : false;


  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price + 8;
  }, 0);


  async function makeOrder() {
    const requestBody = {
      "data": state
    };
    const response = await fetch("http://localhost:1337/api/client-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const res = await response.json();
    console.log({ res });
    if (res) {
      console.log("Done")
      setOpen(true)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!activeStep) {
      setStep(step + 1);
    }
    if (activeStep) {
      setState((oldState) => (
        {
          ...oldState,
          orders: cart.map((item) => ({
            name: item.attributes.name, quantite: item.count
          })),
          total: totalPrice.toString(),
        }
      ))
      console.log({ state });
      if (state.orders) {
        makeOrder()
      }
    }
  }

  useEffect(() => {
    console.log({ open })
  }, [open])



  return (
    <Box>

      <form onSubmit={onSubmit}>
        <Stack my={"100px"} py="50px">
          <Stack direction="row" spacing="5px" justifyContent="center" width="100%" mb="40px" alignItems="center">
            <Box sx={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid black", display: "flex", justifyContent: "center", backgroundColor: step === 1 ? "#04bbac" : "inherit", color: step === 1 ? "white" : "back", borderColor: "#04bbac" }}>1</Box>
            <Box>VOTRE COMMANDE</Box>
            <Box sx={{ height: "5px", width: "200px", borderRadius: 15, backgroundColor: "#04bbac" }}></Box>
            <Box sx={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid black", display: "flex", justifyContent: "center", backgroundColor: step === 2 ? "#04bbac" : "inherit", color: step === 2 ? "white" : "back", borderColor: "#04bbac" }}>2</Box>
            <Box>Facturation & Expédition</Box>
          </Stack>
          <Steps
            step={step}
            state={state}
            setState={setState}
          />
          <Stack direction="row" spacing="10px" justifyContent="center" alignItems="center" mt="20px">
            {step === 2 &&
              <Button variant="contained" sx={{ color: "white", backgroundColor: "#04bbac" }} onClick={() => setStep(step - 1)}>Back</Button>
            }
            <Button type="submit" variant="contained" sx={{ color: "white", backgroundColor: "#04bbac" }} >{activeStep ? "COMMANDER" : "VALIDER LA COMMANDE"}</Button>
          </Stack>
        </Stack>
      </form>
      <AlertDialog
        open={open}
        setOpen={setOpen}
      />
    </Box>
  )
}

const AlertDialog = (props) => {

  return (
    <div>
      <Dialog
        open={props.open}
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
          <Button sx={{ color: "green" }} autoFocus>
            <Link href="/" sx={{ textDecoration: "none" }}>
              Agree
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}