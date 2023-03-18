import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Item from "../../components/Item";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const [categories, setCategories] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  console.log({ items });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?_sort=date:DESC&_start=0&_limit=2&&populate=*",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    console.log(itemsJson.data);
    dispatch(setItems(itemsJson.data));
  }

  async function getCategories() {
    const categories = await fetch(
      "http://localhost:1337/api/categories?populate=image",
      {
        method: "GET",
      }
    );
    const categoriesJson = await categories.json();
    console.log({ categoriesJson });
    dispatch(setCategories(categoriesJson.data));
  }

  useEffect(() => {
    getItems();
    getCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log({ items });

  console.log({ categories });

  const isNonMobile = useMediaQuery("(min-width:600px)");


  return (
    <Box width="80%" margin={isNonMobile ? "80px auto" : "20px auto"} sx={{ scrollBehavior: "smooth" }}>
      <Typography variant="h3" textAlign="center">
        <b> Catégories</b>
      </Typography>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns={isNonMobile ? "1fr 1fr 1fr" : "repeat(auto-fill, 220px)"}
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
        my={8}
      >
        {categories &&
          categories.slice(1, 10).map((item, index) => {
            console.log({ item });
            return (
              <Box
                key={index}
                component={Link}
                to={`/category/${item.id}`}
                sx={{
                  backgroundColor: "#00cbb5",
                  backgroundImage: item.attributes?.image?.data?.attributes
                    ? `url("http://localhost:1337${item.attributes.image?.data?.attributes.formats?.thumbnail.url}")`
                    : "",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  p: 2,
                  py: 5,
                  borderRadius: 2,
                  boxShadow: (theme) => theme.shadows[1],
                  textDecoration: "none",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {/* <Box backgroundColor={grey[100]}> */}
                <Typography
                  variant="h5"
                  fontWeight={(theme) => theme.typography.fontWeightBold}
                  color="primary"
                >
                  {item.attributes.name}
                </Typography>
                {/* </Box> */}
              </Box>
            );
          })}
      </Box>
      <Typography variant="h3" textAlign="center" id="promo">
        <b>Promotions</b>
      </Typography>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 220px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
        my={8}
      >
        {(items || [])
          .filter(
            (item) =>
              item.attributes.categories.data.some(
                (item) => item.attributes.name === "Promo"
              )
          )
          .slice(0, 4)
          .map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
      <Typography variant="h3" textAlign="center" id="products">
        <b>Nouveaux Produits</b>
      </Typography>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 220px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
        my={8}
      >
        {items &&
          items
            .filter((item) => item.attributes.isNew == true)
            .slice(0, 4)
            .map((item, index) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
