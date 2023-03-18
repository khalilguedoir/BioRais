import { Box, Stack } from "@mui/material";
import { CartItems } from "./CartItems";
import { Form } from "./Form";

export const Steps = (props) => {
 const StepIndex = () => {
  switch (props.step) {
   case 1:
    return <CartItems />;
   case 2:
    return <Form
     state={props.state}
     setState={props.setState}
    />

   default:
    break;
  }
 }
 return (
  <Stack>
   {StepIndex()}
  </Stack>
 )
}