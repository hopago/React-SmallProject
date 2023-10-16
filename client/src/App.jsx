import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getPosts } from './actions/posts';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import memories from './images/momories.png';

import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import useStyles from './styles';

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentPostId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            className={classes.mainContainer}
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentPostId={setCurrentPostId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form
                currentPostId={currentPostId}
                setCurrentPostId={setCurrentPostId}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
