import React from 'react';
import {
    Box, Typography, Container, AppBar, Toolbar, Paper
} from '@mui/material';
import liuLogo from './assets/logonew.jpeg';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const mainColor = "#b39ddb";

const texts = {
    he: {
        title: "אודות",
        about: "LIU הוא פלטפורמה ייחודית לאמהות שמאפשרת להן ליצור ולהשתתף בסדנאות, לשתף ידע ולבנות קהילה תומכת.",
        mission: "המשימה שלנו היא ליצור מרחב בטוח ואמפתי שבו אמהות יכולות להתפתח, ללמוד ולגדול יחד.",
        version: "גרסה 1.0.0"
    },
    en: {
        title: "About",
        about: "LIU is a unique platform for mothers that allows them to create and participate in workshops, share knowledge and build a supportive community.",
        mission: "Our mission is to create a safe and empathetic space where mothers can develop, learn and grow together.",
        version: "Version 1.0.0"
    }
};

export default function AboutScreen() {
    const [lang] = React.useState('he');
    const navigate = useNavigate();
    const dir = lang === 'he' ? 'rtl' : 'ltr';

    return (
        <Container maxWidth="sm" sx={{ bgcolor: "#faf7f2", minHeight: "100vh", pb: 8, px: 2, py: 3 }} dir={dir}>
            <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 0, borderBottom: '1px solid #eee' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ArrowBackIcon
                            onClick={() => navigate('/profile')}
                            sx={{ cursor: 'pointer', color: mainColor }}
                        />
                        <img src={liuLogo} alt="LIU Logo" style={{ height: 36, borderRadius: 8, background: "#fff" }} />
                        <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700 }}>{texts[lang].title}</Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ px: 2, py: 3 }}>
                <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                    <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right', fontWeight: 600 }}>
                        {texts[lang].about}
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'right', lineHeight: 1.6, mb: 3 }}>
                        {texts[lang].mission}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                        {texts[lang].version}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
} 