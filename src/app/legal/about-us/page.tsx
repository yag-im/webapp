import { Container, List, Paper, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>

        <Typography variant="h6" gutterBottom>
          Welcome to yag.im, your go-to destination for classic point-and-click adventure games!
        </Typography>
        <Typography paragraph>
          We’re a group of passionate gamers dedicated to preserving and celebrating the timeless charm of these games.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Our Main Goal
        </Typography>
        <Typography paragraph>yag.im is all about bringing the joy of playing classic adventure games into the digital age. While there are plenty of resources out there that talk about these gems, we believe in the power of experience. </Typography>
        <Typography paragraph>That’s why we’ve created a platform where you can not only read about these games but also play them directly in your web browser.</Typography>
        <Typography paragraph>Our aim is to showcase a comprehensive collection of adventure games released in the 20th century, all hosted on our website.</Typography>
        <Typography paragraph>Our mission is to ensure that the magic of these classics continues to captivate new generations.</Typography>

        <Typography variant="h6" gutterBottom>
          How It Works
        </Typography>
        <Typography>
          Gameplay
        </Typography>
        <List>
          <Typography paragraph>Dive into nostalgia with our collection of games, all playable online through various emulators like ScummVM, DOSBOX, and more.</Typography>
        </List>
        <Typography>
          Supporting Creators
        </Typography>
        <List>
          <Typography paragraph>We encourage you to support the original creators by purchasing their games. It’s a great way to show appreciation for their work.</Typography>
        </List>
        <Typography>
          Game Suggestions
        </Typography>
        <List>
          <Typography paragraph>If you’re on the hunt for a specific game and can’t find it on our site, don’t hesitate to suggest it here(link). We’re always looking to expand our library.</Typography>
        </List>
        <Typography>
          Copyright Respect
        </Typography>
        <List>
          <Typography paragraph>We take copyright seriously. If you’re not comfortable with your game being featured on yag.im, just let us know, and we’ll remove it promptly.</Typography>
        </List>

        <Typography variant="h6" gutterBottom>
          Join us on yag.im and rediscover the adventure that awaits in every game!
        </Typography>

      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
