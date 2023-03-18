import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import { green } from "@mui/material/colors";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ArrowBack } from "@mui/icons-material";
import ReactPlayer from "react-player";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=*`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch("http://localhost:1337/api/items?populate=*", {
      method: "GET",
    });
    const itemsJson = await items.json();
    console.log(itemsJson.data);
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log({ item });

  const isNonMobile = useMediaQuery("(min-width:600px)");


  return (
    <Box width={isNonMobile ? "80%" : "100%"} m="80px auto" mt="200px" justifyContent="center" p={1}>
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <Box width={400} height={400}>
            <img
              alt={item?.name}
              width="100%"
              height="100%"
              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Link
                href="/"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  ":hover": { color: "gray" },
                }}
              >
                <Stack direction="row" alignItems="center" columnGap="5px">
                  <ArrowBack /> Retour
                </Stack>
              </Link>
            </Box>
          </Box>

          <Stack m="65px 0 25px 0" spacing="20px" sx={{ direction: "rtl" }}>
            <Box>           <Typography variant="h2">{item?.attributes?.name}</Typography>
              <Typography variant="h2">{item?.attributes?.namefrancais}</Typography>
            </Box>

            <Typography variant="h3">
              {item?.attributes?.longDescription}
            </Typography>
            <Divider py="7px" />
            <Typography
              fontWeight="bold"
              fontSize="27px"
              sx={{
                textDecoration:
                  item?.attributes?.prix_en_promo != undefined
                    ? "line-through"
                    : "",
                color:
                  item?.attributes?.prix_en_promo != undefined
                    ? "red"
                    : "#04bbac",
              }}
            >
              {item?.attributes?.price}DT
            </Typography>
            {item?.attributes?.prix_en_promo != undefined && (
              <Typography fontWeight="bold" fontSize="30px" color="#04bbac">
                {item?.attributes?.prix_en_promo != undefined &&
                  item?.attributes?.prix_en_promo}
                DT
              </Typography>
            )}
          </Stack>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#04bbac",
                ":hover": {
                  backgroundColor: "#04bbac",
                },
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              startIcon={<AddShoppingCartIcon />}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Acheter
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>Ajouter au favoris</Typography>
            </Box>
            <Typography fontWeight="bold">
              CATEGORIES:
              {item?.attributes?.categories.data.map((item) => (
                <Link
                  href={`/category/${item?.id}`}
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    ":hover": { color: "gray" },
                  }}
                >
                  {item?.attributes?.name}
                </Link>
              ))}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px" sx={{ direction: "rtl" }}>
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {item?.attributes?.video !== null &&
        <Stack display="flex" justifyContent="center" alignItems="center" mt="40px" width={isNonMobile ? "100%" : "50%"} >
          <ReactPlayer url={item?.attributes?.video} controls />
        </Stack>
      }

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Produits dans la même catégorie:
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {/* {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))} */}
          {(items || [])
            .filter((item) =>
              item.attributes.categories.data.some((item) => item.id === itemId)
            )
            .map((product, index) => (
              <Item item={product} key={`${product.name}-${product.id}`} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
