import { Container, List, ListItem, Paper, Typography, } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    DMCA / Removal request
                </Typography>

                <Typography paragraph>
                    yag.im respects the intellectual property rights and other proprietary rights of others.
                </Typography>

                <Typography paragraph>
                    Be sure the game you are asking to be removed actually contains the copyrighted content you are inquiring about.
                </Typography>

                <Typography paragraph>
                    yag.im does implement game pages that act as informational pages for promotional purposes only. Play a game, inspect it, and if it is indeed your copyrighted work, contact us. To send a claim, include the following information:
                </Typography>
                <List>
                    <ListItem>Identification of the copyrighted work whose copyright you claim has been infringed.</ListItem>
                    <ListItem>An exact description of where the material in question is located within yag.im.</ListItem>
                    <ListItem>Your address, telephone number and email address.</ListItem>
                    <ListItem>A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</ListItem>
                    <ListItem>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the owner of the copyright interest involved or are authorized to act on behalf of that owner.</ListItem>
                    <ListItem>Your electronic or physical signature.</ListItem>
                </List>

                <Typography paragraph>

                </Typography>

                <Typography paragraph>
                    You may send an email to: dmca-removal [at] yag [dot] im for all DMCA / Removal Requests.
                </Typography>

                <Typography paragraph>
                    Please note that if applicable under Section 512(f) of the DMCA any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages. Please take this seriously!
                </Typography>

            </Paper>
        </Container>
    );
};

export default PrivacyPolicy;
