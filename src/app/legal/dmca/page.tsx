import { Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const DmcaPolicy = () => {
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          DMCA Notice and Takedown Policy
        </Typography>

        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Typography paragraph>
          yag.im respects the intellectual property rights of others and complies with the provisions
          of the Digital Millennium Copyright Act (DMCA). If you believe your copyrighted work has been
          used or posted on our site in a way that constitutes copyright infringement, please notify
          our designated agent as described below.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Educational &amp; Research Notice
        </Typography>
        <Typography paragraph>
          This platform is a non-commercial digital archive intended strictly for educational,
          historical, and scholarly research purposes. All software titles accessible herein are
          provided via user-directed submissions through our open-source archival flow.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Notice of Content Verification
        </Typography>
        <Typography paragraph>
          While we perform post-submission verification to ensure metadata accuracy and system
          compatibility, yag.im operates as a service provider and does not claim ownership or
          editorial control over user-submitted content. We respect the intellectual property rights
          of others and will expeditiously remove any material found to be in violation of copyright
          law upon receipt of a valid DMCA notice.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography paragraph>
          Users are solely responsible for ensuring their use of the platform complies with local
          laws and institutional policies. By using this site, you acknowledge that yag.im provides
          technical infrastructure only and is not liable for unauthorized use or distribution of
          content by third parties.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Designated Agent
        </Typography>
        <Typography paragraph>
          DMCA takedown notices should be sent to: dmca-removal [at] yag [dot] im.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Before Filing a Notice
        </Typography>
        <Typography paragraph>
          Please ensure that the material you are requesting to be removed actually contains the
          copyrighted content in question. yag.im hosts game pages that serve as informational pages
          for promotional purposes only. Inspect the page carefully, and if it does indeed contain
          your copyrighted work, proceed with the notice below.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Required Information
        </Typography>
        <Typography paragraph>
          To submit a valid DMCA takedown notice, please include the following information:
        </Typography>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item', py: 0.5 }}>
            <ListItemText primary="A physical or electronic signature of the copyright owner, or a person authorized to act on their behalf." />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5 }}>
            <ListItemText primary="Identification of the copyrighted work claimed to have been infringed." />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5 }}>
            <ListItemText primary="An exact description of where the allegedly infringing material is located on yag.im." />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5 }}>
            <ListItemText primary="Your contact information, including address, telephone number, and email address." />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5 }}>
            <ListItemText primary="A statement that you have a good-faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law." />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5 }}>
            <ListItemText primary="A statement, made under penalty of perjury, that the information in the notification is accurate and that you are the copyright owner or are authorized to act on their behalf." />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          Misrepresentation Warning
        </Typography>
        <Typography paragraph>
          Please note that under Section 512(f) of the DMCA, any person who knowingly and materially
          misrepresents that material or activity is infringing may be subject to liability for damages.
        </Typography>
      </Paper>
    </Container>
  );
};

export default DmcaPolicy;
