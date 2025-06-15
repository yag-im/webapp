import { Container, Paper, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Cookies
        </Typography>
        <Typography paragraph>We use cookies and other similar technologies to help provide Services, to advertise to you and to analyse how you use our Services and whether advertisements are being viewed. We also allow third parties to use tracking technologies for similar purposes.</Typography>

        <Typography paragraph>We use tracking technologies for the following purposes:</Typography>

        <Typography variant='h6' gutterBottom>Strictly necessary purposes</Typography>
        <Typography paragraph>To let you login, to ensure site security and to provide shopping cart functionality. Without this type of technology, our Services won’t work properly or won’t be able to provide certain features and functionalities.</Typography>

        <Typography variant='h6' gutterBottom>Performance purposes</Typography>
        <Typography paragraph>To analyze how visitors use a website, for instance which pages visitors visit most often, in order to provide a better user experience. We also use this technology to check if you have opened our emails, so we can see if they are being delivered correctly and are of interest.</Typography>

        <Typography variant='h6' gutterBottom>Personalisation purposes</Typography>
        <Typography paragraph>To remember choices you have made — such as language or region.</Typography>

        <Typography variant='h6' gutterBottom>Advertising cookies</Typography>
        <Typography paragraph>To limit the number of times you see an advertisement, or to customize advertising across Services and make it more relevant to you and to allow us to measure the effectiveness of advertising campaigns and track whether ads have been properly displayed so we can pay for this.</Typography>

        <Typography variant='h6' gutterBottom>Social media cookies</Typography>
        <Typography paragraph>Cookies are used by social media services to enable you to share our content with your friends and networks. These cookies may track your browser across other sites and build a profile of your interests, which may impact the content and messages you see on other websites that you visit.</Typography>

        <Typography variant='h6' gutterBottom>How to manage & remove cookies</Typography>
        <Typography paragraph>If you are using our Services via a browser you can restrict, block or remove cookies through your web browser settings. The Help menu on the menu bar of most browsers also tells you how to prevent your browser from accepting new cookies, how to delete old cookies, how to have the browser notify you when you receive a new cookie and how to disable cookies altogether.</Typography>
        <Typography paragraph>You can also visit http://www.aboutcookies.org for more information on how to manage and remove cookies across a number of different internet browsers. You also have the option to change your choices relating to cookies utilized to deliver behaviorally targeted advertising here “Advertising cookies“.</Typography>

        <Typography paragraph>We also use Flash cookies to provide some content such as video clips or animation. You can manage Flash cookies via Adobe’s website.</Typography>

        <Typography paragraph>If you are using our Services via an application, the operating system for your device provides instructions on how to prevent tailored advertising and how to reset your device’s advertising identifier.</Typography>

        <Typography paragraph>If you would like to contact us about cookies please email us at cookies [at] yag [dot] im.</Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
