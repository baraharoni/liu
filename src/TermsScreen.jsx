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
        title: "תקנון",
        terms: "תנאי השימוש",
        content: "בשימוש בפלטפורמת LIU, את מסכימה לתנאים הבאים:",
        points: [
            "כל התוכן שתשתפי חייב להיות מתאים ובעל ערך לקהילה",
            "יש לכבד את פרטיות המשתמשות האחרות",
            "אסור להעליב או לפגוע במשתמשות אחרות",
            "הפלטפורמה שומרת לעצמה את הזכות להסיר תוכן לא מתאים",
            "כל המידע האישי שלך מוגן ומאובטח"
        ],
        lastUpdated: "עודכן לאחרונה: דצמבר 2024"
    },
    en: {
        title: "Terms",
        terms: "Terms of Service",
        content: "By using the LIU platform, you agree to the following terms:",
        points: [
            "All content you share must be appropriate and valuable to the community",
            "You must respect the privacy of other users",
            "It is forbidden to insult or harm other users",
            "The platform reserves the right to remove inappropriate content",
            "All your personal information is protected and secure"
        ],
        lastUpdated: "Last updated: December 2024"
    }
};

export default function TermsScreen() {
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
                        {texts[lang].terms}
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'right', lineHeight: 1.6, mb: 3 }}>
                        {texts[lang].content}
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        {texts[lang].points.map((point, index) => (
                            <Typography
                                key={index}
                                variant="body2"
                                sx={{
                                    textAlign: 'right',
                                    mb: 1,
                                    pl: 2,
                                    '&:before': {
                                        content: '"• "',
                                        color: mainColor,
                                        fontWeight: 'bold'
                                    }
                                }}
                            >
                                {point}
                            </Typography>
                        ))}
                    </Box>
                    <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                        {texts[lang].lastUpdated}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
} 