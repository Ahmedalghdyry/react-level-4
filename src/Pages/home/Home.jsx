import React, { useEffect, useState } from "react";
import "./Home.css";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const Home = () => {
  // Get totalPriceDatatotalPrice
  const [mydata, setmydata] = useState([]);
  console.log(mydata);
  useEffect(() => {
    fetch("http://localhost:3100/mydata")
      .then((response) => response.json())

      .then((data) => setmydata(data));
  }, []);


  const handeleDelete = (item) => {
    fetch(`http://localhost:3100/mydata/${item.id}`, {
      method: "DELETE",
    });

    const newArr = mydata.filter((myObject) => {
      return myObject.id !== item.id;
    });

    setmydata(newArr);
  }

  let totalPrice = 0;
  return (
    <Box>
      {mydata.map((item) => {
        totalPrice += item.price;
        return (
          <Paper
            key={item.id}
            sx={{
              position: "relative",
              width: "366px",
              display: "flex",
              justifyContent: "space-between",
              mt: "22px",
              pt: "27px",
              pb: "7px",
              backgroundColor: "#1c1c1c",
            }}
          >
            <Typography sx={{ ml: "16px", fontSize: "1.3em" }} variant="h6">
              {item.title}
            </Typography>
            <Typography
              sx={{
                mr: "33px",
                fontWeight: 500,
                fontSize: "1.4em",
                opacity: "0.8",
              }}
              variant="h6"
            >
              ${item.price}
            </Typography>

            {/* DELETE */}
            <IconButton
              onClick={() => {
                handeleDelete(item)
              }}
              sx={{ position: "absolute", top: "0", right: "0" }}
            >
              <Close sx={{ fontSize: "20px" }} />
            </IconButton>
          </Paper>
        );
      })}
      <Typography mt="55px" textAlign="center" variant="h6">
        👉 You Spend ${totalPrice}
      </Typography>
    </Box>
  );
};

export default Home;
