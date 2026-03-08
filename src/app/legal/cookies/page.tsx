import { Container, Paper, Typography } from '@mui/material';

const Cookies = () => {
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Cookie Policy
        </Typography>

        <Typography paragraph>
          We use cookies and other similar technologies to help provide our services, to advertise
          to you, and to analyze how you use our services and whether advertisements are being viewed.
          We also allow third parties to use tracking technologies for similar purposes.
        </Typography>

        <Typography paragraph>
          We use tracking technologies for the following purposes:
        </Typography>

        <Typography variant="h6" gutterBottom>
          Strictly Necessary
        </Typography>
        <Typography paragraph>
          These cookies are required to let you log in and to ensure site security. Without this
          type of technology, our services will not work properly or will not be able to provide
          certain features and functionalities.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Performance
        </Typography>
        <Typography paragraph>
          These cookies help us analyze how visitors use our website &mdash; for instance, which pages
          are visited most often &mdash; in order to provide a better user experience. We also use this
          technology to check whether you have opened our emails, so we can confirm they are being
          delivered correctly and are of interest.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Personalization
        </Typography>
        <Typography paragraph>
          These cookies remember choices you have made, such as language or region preferences.
        </Typography>

        <Typography variant="h6" gutterBottom>
          How to Manage and Remove Cookies
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Browser
        </Typography>
        <Typography paragraph>
          If you are using our services via a browser, you can restrict, block, or remove cookies
          through your web browser settings. The Help menu in most browsers explains how to prevent
          your browser from accepting new cookies, how to delete old cookies, how to receive
          notifications when a new cookie arrives, and how to disable cookies altogether.
        </Typography>
        <Typography paragraph>
          You can also visit{' '}
          <a href="http://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">
            aboutcookies.org
          </a>{' '}
          for more information on how to manage and remove cookies across a number of different
          internet browsers.
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Mobile Applications
        </Typography>
        <Typography paragraph>
          If you are using our services via a mobile application, the operating system for your
          device provides instructions on how to prevent tailored advertising and how to reset
          your device&apos;s advertising identifier.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography paragraph>
          If you would like to contact us about cookies, please email us at
          cookies [at] yag [dot] im.
        </Typography>

      </Paper>
    </Container>
  );
};

export default Cookies;
