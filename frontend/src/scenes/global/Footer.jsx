import { useTheme } from "@emotion/react";
import { EmailOutlined, PhoneAndroid, PlaceOutlined } from "@mui/icons-material";
import { Box, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import { SocialIcon } from 'react-social-icons';


const TikTok = ({ color = "#000000" }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="20px"
      height="20px"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};


function Footer() {
  const {
    palette: { neutral },
  } = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor="#04bbac" id="about">
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap={isNonMobile ? "clamp(20px, 30px, 40px)" : "1fr"}
      >
        <Box width={isNonMobile ? "clamp(20%, 30%, 40%)" : "100%"}>
          <Typography
            variant="h3"
            fontWeight={theme => theme.typography.fontWeightBold}
            mb={2}
            color="#ddd"
          >
            Bio Rais
          </Typography>
          <Box color="white">
            Notre boutique N° 97 en face de la mosquée Zitouna à la medina Tunis
            Spécialité vente des produits naturelles
          </Box>
        </Box>
        <Box>
          <Typography variant="h3" fontWeight={theme => theme.typography.fontWeightBold} mb={2} color="#ddd">
            Contact Us
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: "14px" }}>
              <PlaceOutlined />
              <Typography color="white">
                <Link href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x12fd347540b9a6db:0x38d97ea17c623bb7?utm_source=mstt_1&entry=gps&lucs=swa"
                  style={{ color: "white", textDecoration: "none" }}>
                  97 Rue Jamaa Ezzitouna,Tunis,1008
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: "14px" }}>
              <EmailOutlined />
              <Typography sx={{ wordWrap: "break-word" }} color="white">
                Email: <Link href="email:raistunis@gmail.com" style={{ color: "white", textDecoration: "none" }}>raistunis@gmail.com</Link>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: "14px" }}>
              <PhoneAndroid />
              <Typography color="white">Téléphone: <Link href="tel:+21655660555" style={{ color: "white", textDecoration: "none" }}>(+216)55 660 555</Link></Typography>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Typography variant="h3" fontWeight={theme => theme.typography.fontWeightBold} mb={2} color="#ddd">
            SUIVEZ-NOUS !
          </Typography>
          <Stack direction="row" spacing="1rem">
            <Box>
              <Link href="https://www.facebook.com/biorais" sx={{ textDecoration: "none" }}>
                {/* <FacebookOutlined color="blue" /> */}
                <Box sx={{ width: "40px" }}>
                  <SocialIcon url="https://www.facebook.com/biorais" network="facebook" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                </Box>
                <Typography fontSize={theme => theme.typography.h6} fontWeight={theme => theme.typography.fontWeightRegular} color="white">Facebook</Typography>
              </Link>
            </Box>
            <Box>
              <Link href="https://www.instagram.com/bio.rais/?hl=fr" sx={{ textDecoration: "none" }}>
                <SocialIcon url="https://www.instagram.com/bio.rais/?hl=fr" network="instagram" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                <Typography fontSize={theme => theme.typography.h6} fontWeight={theme => theme.typography.fontWeightRegular} color="white">instgram</Typography>
              </Link>
            </Box>
            <Box>
              <Link href="https://www.tiktok.com/@bio.rais?lang=fr" sx={{ textDecoration: "none" }}>
                <SocialIcon url="https://www.tiktok.com/@bio.rais?lang=fr" network="tiktok" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                <Typography fontSize={theme => theme.typography.h6} fontWeight={theme => theme.typography.fontWeightRegular} color="white">Tiktok</Typography>
              </Link>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
