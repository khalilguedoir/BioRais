import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades, theme } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { green } from "@mui/material/colors";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { price, name, image, prix_en_promo, isNew, poids } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          small: { url },
        },
      },
    },
  } = image;

  console.log({ item });

  const isPromo = item.attributes.categories.data.some((item) => item.attributes.name === "Promo")

  console.log({ isPromo });
  console.log(item.attributes.categories.data.some((item) => item.attributes.name === "Promo"))

  return (
    <Box
      width={width}
      sx={{
        boxShadow: isHovered ? (theme) => theme.shadows[1] : "",
        width: 240,
        // px: 2
      }}
    >
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        sx={
          {
            // backgroundColor: isHovered ? "aquamarine" : "inherit",
          }
        }
      >
        {isNew == true ? (
          <Box
            sx={{
              position: "absolute",
              top: 5,
              left: 5,
              py: 0.5,
              px: 1,
              backgroundColor: "#04bbac",
              borderRadius: 4,
            }}
          >
            <Typography fontSize="12px" fontWeight="bold" color="white">
              New
            </Typography>
          </Box>
        ) : (
          ""
        )}
        <Box
          sx={{
            width: "100%",
            height: 240,
          }}
        >
          <img
            alt={item.name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${url}`}
            onClick={() => navigate(`/item/${item.id}`)}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="5%"
          left="0"
          width="100%"
          // padding="0 5%"
          sx={{
            // backgroundColor: isHovered ? "aquamarine" : "inherit",
            px: 0,
            width: "100%",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            columnGap="4px"
            px={2}
          >
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[500]}
              borderRadius="3px"
              padding={0}
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[700]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{
                backgroundColor: "#04bbac",
                width: "200px",
                color: "white",
                ":hover": { backgroundColor: "#04bbac" },
              }}
            >
              Acheter
            </Button>
          </Box>
        </Box>
      </Box>

      <Stack mt="3px" p={2} spacing={2} width="100%">
        <Typography
          variant="h5"
          fontWeight={(theme) => theme.typography.fontWeightBold}
          textAlign="center"
        >
          {name}
        </Typography>
        {poids !== "" && (
          <Typography fontWeight="bold" textAlign="center">
            {poids}
          </Typography>
        )}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          textAlign={"center"}
          width="100%"
          columnGap={5}
        >
          <Typography
            fontWeight="bold"
            fontSize="18px"
            sx={{
              textDecoration:
                isPromo
                  ? "line-through"
                  : "",
              color:
                isPromo
                  ? "red"
                  : "#04bbac",
            }}
            textAlign="center"
          >
            {price} DT
          </Typography>
          {isPromo && (
            <Typography
              fontWeight="bold"
              textAlign="center"
              fontSize="20px"
              color="#04bbac"
            >
              {isPromo && prix_en_promo}{" "}
              DT
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Item;
