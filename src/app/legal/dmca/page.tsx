import { Container, List, ListItem, Paper, Typography, } from '@mui/material';

const DmcaPolicy = () => {
    return (
        <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    DMCA Notice and Takedown Policy
                </Typography>

                <Typography paragraph>
                    yag.im respects the intellectual property rights of others and complies with the provisions of the Digital Millennium Copyright Act (DMCA). If you believe your copyrighted work has been used or posted on our site in a way that constitutes copyright infringement, please notify our Designated Agent as specified below.
                </Typography>

                <Typography paragraph>
                    dmca-removal [at] yag [dot] im
                </Typography>

                <Typography paragraph>
                    Be sure the work you are asking to be removed actually contains the copyrighted content you are inquiring about.
                </Typography>

                <Typography paragraph>
                    yag.im does implement game pages that act as informational pages for promotional purposes only. Inspect the page, and if it is indeed your copyrighted work, contact us. To send a claim, include the following information:
                </Typography>
                <List>
                    <ListItem>A physical or electronic signature of the copyright owner or person authorized to act on their behalf.</ListItem>
                    <ListItem>Identification of the copyrighted work claimed to have been infringed.</ListItem>
                    <ListItem>An exact description of where the material in question is located within yag.im.</ListItem>
                    <ListItem>Your contact information, including address, telephone number, and email address.</ListItem>
                    <ListItem>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.</ListItem>
                    <ListItem>A statement that the information in the notification is accurate, and under penalty of perjury, that you are the copyright owner or authorized to act on their behalf.</ListItem>
                </List>

                <Typography paragraph>
                    Please note that if applicable under Section 512(f) of the DMCA any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages. Please take this seriously!
                </Typography>

            </Paper>
        </Container>
    );
};

export default DmcaPolicy;
