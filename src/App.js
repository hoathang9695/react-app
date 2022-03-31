import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import axios from "axios";

export default function App() {
  const [items, setItems] = React.useState([]);
  const fetchMoreData = async () => {
    let configs = {
      url: `https://demo.treblle.com/api/v1/articles`,
      method: "get"
    };

    let response = await axios(configs);
    setItems(items.concat(response.data.articles));
    return response;
  };
  React.useEffect(() => {
    fetchMoreData();
  }, []);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App example
        </Typography>

        <div id="scrollableDiv" style={{ height: 600, overflow: "auto" }}>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {items.map((i, index) => (
              <Card key={"card" + index} sx={{ maxWidth: 645 }}>
                <CardActionArea>
                  <div key={index}>div - #{index}</div>
                  <CardMedia
                    component="img"
                    height="140"
                    image={i.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {i.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {i.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
            ))}
          </InfiniteScroll>
        </div>
      </Box>
    </Container>
  );
}
