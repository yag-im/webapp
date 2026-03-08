import { Container, Paper, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="h6" gutterBottom>
          Effective Date: June 12, 2024
        </Typography>

        <Typography variant="h6" gutterBottom>
          Introduction
        </Typography>
        <Typography paragraph>
          Welcome to yag.im (the &ldquo;Website&rdquo;). We value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how we collect, use, share,
          and safeguard your data when you visit our Website. By using our Website, you consent to the
          practices described in this Privacy Policy.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Information We Collect
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Personal Information
        </Typography>
        <Typography paragraph>
          We may collect personal information such as your name and email address when you voluntarily
          provide it to us &mdash; for example, if you subscribe to our newsletter or contact us through the
          provided contact information.
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Automatically Collected Information
        </Typography>
        <Typography paragraph>
          When you visit our Website, certain information may be automatically collected, such as your
          IP address, browser type, and operating system. We use this data to improve our Website&apos;s
          performance and user experience.
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Cookies
        </Typography>
        <Typography paragraph>
          Our Website uses cookies to enhance your browsing experience. You can control the use of
          cookies through your browser settings. For more details, please see our Cookies page.
        </Typography>

        <Typography variant="h6" gutterBottom>
          How We Use Your Information
        </Typography>
        <Typography paragraph>
          We use the information we collect to improve our Website&apos;s functionality and content,
          to respond to your inquiries and provide customer support, and to send you periodic emails
          including newsletters and updates (if you have subscribed).
        </Typography>

        <Typography variant="h6" gutterBottom>
          Sharing Your Information
        </Typography>
        <Typography paragraph>
          We do not sell, trade, or otherwise transfer your personal information to third parties.
          However, we may share your information with trusted third parties who assist us in managing
          and operating our Website or servicing you, provided that those parties agree to keep this
          information confidential.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Data Security
        </Typography>
        <Typography paragraph>
          We take appropriate measures to protect your data from unauthorized access, alteration,
          disclosure, or destruction. However, no method of transmission over the internet or
          electronic storage is completely secure.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Third-Party Links
        </Typography>
        <Typography paragraph>
          Our Website may contain links to third-party websites. Please note that we are not
          responsible for the privacy practices of these sites. We encourage you to review the
          privacy policies of any website you visit.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Your Choices
        </Typography>
        <Typography paragraph>
          You have the right to opt out of receiving our emails by following the unsubscribe
          instructions included in those emails.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Changes to This Privacy Policy
        </Typography>
        <Typography paragraph>
          We reserve the right to make changes to this Privacy Policy. Any updates will be posted
          on this page, and the &ldquo;Effective Date&rdquo; at the top of the policy will be revised
          accordingly.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions about this Privacy Policy or our practices, you may contact us
          at privacy [at] yag [dot] im.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Thank you for visiting yag.im and trusting us with your privacy.
        </Typography>

      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
