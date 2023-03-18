import { Search } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";
import { setItems } from "../../state";

export default function Category() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  async function getItems() {
    const items = await fetch(`http://localhost:1337/api/items?populate=*`, {
      method: "GET",
    });
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  const [category, setCategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  async function getCategories() {
    const categories = await fetch(
      "http://localhost:1337/api/categories/" + categoryId,
      {
        method: "GET",
      }
    );
    const categoriesJson = await categories.json();
    console.log({ categoriesJson });
    dispatch(setCategory(categoriesJson.data));
  }

  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  const SearchMethod = () => {
    setSearch(searchValue);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");


  return (
    <Container maxWidth="md">
      <Stack margin="90px auto" p={4}>
        <Stack direction="row" justifyContent="end" alignItems="center">
          <TextField
            label="Rechercher un Produit"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />
          <IconButton
            size="large"
          >
            <Search />
          </IconButton>
        </Stack>
        <Typography variant="h4" color="GrayText">
          List des produits dans la catégorie{" "}
          <Typography
            variant="h4"
            fontWeight={(theme) => theme.typography.fontWeightBold}
            sx={{ display: "inline-block" }}
            color="black"
          >
            {category.attributes?.name}
          </Typography>
        </Typography>
        <Grid
          p={4}
          gridTemplateColumns={isNonMobile ? "1fr 1fr 1fr 1fr" : "1fr"}
          display="grid"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="20px"
        >
          {items && items.length > 0
            ? (
              items.filter((item) =>
                item.attributes.categories.data.some(
                  (item) => item.id == categoryId
                )
              ) || []
            ).filter(item => item.attributes.name.includes(search)).map((item, index) => {
              return <Item item={item} key={index} />;
            })
            : "No product"}
        </Grid>
      </Stack>
    </Container>
  );
}
