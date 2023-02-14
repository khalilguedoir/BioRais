import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";
import { setItems } from "../../state";
import { Box, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Search } from "@mui/icons-material";

export default function Category() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  async function getItems() {
    const items = await fetch(
      `http://localhost:1337/api/items?filters[category][id][$eq]=${categoryId}&populate=*`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  const [category, setCategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  async function getCategories() {
    const categories = await fetch("http://localhost:1337/api/categories/" + categoryId, {
      method: "GET",
    });
    const categoriesJson = await categories.json();
    console.log({ categoriesJson });
    dispatch(setCategory(categoriesJson.data));
  }


  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  console.log({ items });

  const SearchMethod = () => {
    setSearch(searchValue)
  }

  return (
    <Container maxWidth="md">
      <Stack margin="90px auto" p={4}>
        <Stack direction="row" justifyContent="end" alignItems="center">
          <TextField
            label="Rechercher un Produit"
            variant="outlined"
            onChange={(e) => setSearchValue(e.target.value)}
            size="small"
          />
          <IconButton onClick={() => { SearchMethod() }} size="large">
            <Search />
          </IconButton>
        </Stack>
        <Typography variant="h4" color="GrayText">
          List des produits dans la catégorie{" "}
          <Typography variant="h4" fontWeight={theme => theme.typography.fontWeightBold} sx={{ display: "inline-block" }} color="black">{category.attributes?.name}</Typography>
        </Typography>
        <Grid p={4} gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr" display="grid" columnGap="1rem">
          {items && items.length > 0
            ? items.filter(item => item.attributes.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => {
              return <Item item={item} key={index} />;
            })
            : "No product"}
        </Grid>
      </Stack>
    </Container>
  );
}
