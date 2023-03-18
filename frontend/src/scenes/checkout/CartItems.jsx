import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    decreaseCount,
    increaseCount,
    removeFromCart
} from "../../state";
import { shades } from "../../theme";
import { FlexBox } from "../global/CartMenu";

export const CartItems = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price + 8;
    }, 0);
    const totalPriceWithoutLivraison = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0);

    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Stack direction={matches ? "row" : "column"} alignItems={matches ? "flex-start" : "center"} spacing="10px" width="100%" my="50px" justifyContent="center">
            <Stack width={matches ? "60%" : "70%"} direction="column" alignItems="start" spacing="10px">
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
                                <FlexBox m="15px 0">
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        border={`1.5px solid ${shades.neutral[500]}`}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                dispatch(decreaseCount({ id: item.id }))
                                            }
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography>{item.count}</Typography>
                                        <IconButton
                                            onClick={() =>
                                                dispatch(increaseCount({ id: item.id }))
                                            }
                                        >
                                            <AddIcon />
                                        </IconButton>
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
            <Stack width={matches ? "30%" : "70%"}>
                <Box sx={{ boxShadow: theme => theme.shadows[10], borderRadius: 2, backgroundColor: "white", p: 2 }}>
                    <Typography fontWeight="bold" textAlign="center">TOTAL PANIER
                    </Typography>
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
    )
}