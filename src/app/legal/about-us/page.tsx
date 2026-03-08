import { Container, Paper, Typography } from '@mui/material';

const AboutUs = () => {
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>

        <Typography variant="h6" gutterBottom>
          Welcome to yag.im, a digital edutainment and adventure games museum!
        </Typography>

        <Typography variant="h6" gutterBottom>
          Our Purpose
        </Typography>
        <Typography paragraph>
          yag.im is a non-profit digital initiative dedicated to the <b>playable preservation</b> of
          1990s edutainment and interactive media. We believe that software, particularly educational titles, is a vital
          cultural artifact that must be experienced — not just archived — to be understood.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Our Vision
        </Typography>
        <Typography paragraph>
          As hardware and operating systems from the 20th century become obsolete, a generation of
          digital heritage is at risk of &ldquo;bit rot&rdquo; and permanent loss. We provide a cloud-based, browser-accessible
          emulation layer to ensure that educators, researchers, and the public can continue to access and study these
          historically significant works.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Our Main Goal
        </Typography>
        <Typography paragraph>
          yag.im is all about bringing the joy of playing classic adventure and edutainment games
          into the digital age. That&apos;s why we&apos;ve created a platform where you can not only read about these games but also
          play them directly in your web browser.
        </Typography>
        <Typography paragraph>
          Our aim is to showcase a comprehensive collection of adventure and edutainment games
          released in the 20th century. Our mission is to ensure that the magic of these classics continues to captivate new
          generations.
        </Typography>

        <Typography variant="h6" gutterBottom>
          How It Works
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Gameplay
        </Typography>
        <Typography paragraph>
          Dive into nostalgia with our collection of games, all playable online through various
          open-source emulators such as ScummVM, DOSBox, QEMU, and others.
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Supporting Creators
        </Typography>
        <Typography paragraph>
          We encourage you to support the original creators by purchasing their games. It&apos;s a
          great way to show appreciation for their work.
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Game Suggestions
        </Typography>
        <Typography paragraph>
          If you&apos;re on the hunt for a specific title and can&apos;t find it on our site, don&apos;t hesitate
          to suggest it <a href="https://discord.gg/N4QavHBBAG">here</a>. We&apos;re always looking to expand our library.
        </Typography>

        <Typography variant="h6" gutterBottom>
          DMCA Compliance &amp; Copyright
        </Typography>
        <Typography paragraph>
          All content on yag.im is provided strictly for non-commercial, educational, and research
          purposes in service of digital preservation. We do not claim ownership of any third-party intellectual property.
        </Typography>
        <Typography paragraph>
          We fully comply with the <b>Digital Millennium Copyright Act (DMCA)</b> and operate under
          a strict <b>Notice and Takedown</b> policy. If you are a rights holder, or an authorized agent acting on behalf
          of one, and believe that any material hosted on yag.im infringes your copyright, please submit a formal DMCA
          takedown notice to our designated agent. Upon receipt of a valid notice, we will promptly remove or disable
          access to the allegedly infringing material.
        </Typography>
        <Typography paragraph>
          We respect the intellectual property of all creators and aim to work collaboratively with
          rights holders to maintain the legacy of their works in a safe, controlled, and educational environment.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Join us on yag.im and rediscover the adventure that awaits in every game!
        </Typography>

      </Paper>
    </Container>
  );
};

export default AboutUs;
