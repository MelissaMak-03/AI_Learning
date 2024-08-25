import Image from "next/image";
import styles from "./page.module.css";
import { AppBar,Box, Button, Grid, Toolbar, Typography, Container, Card, CardContent} from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
       <Container maxWidth="xl"
       sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        textAlign: 'center',
      }}>
    
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Flashcard App
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to create flashcards from your text.
          </Typography>
          <Typography variant="h6" component="p" gutterBottom sx={{ mt: 3 }}>
            To get started, you can choose to generate flashcards on any topic or chat with your document to better understand them.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" href="/generate">
              Generate Flashcards
            </Button>
            <Button variant="contained" color="primary" href="/chatbot">
              Chat with Document
            </Button>
          </Box>
        </Box>
      </Container>
    </main>
  );
}
