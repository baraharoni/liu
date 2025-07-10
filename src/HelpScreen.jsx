import React from 'react';
import {
    Box, Typography, Container, AppBar, Toolbar, Paper, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import liuLogo from './assets/logonew.jpeg';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const mainColor = "#b39ddb";

const texts = {
    he: {
        title: "עזרה",
        help: "שאלות נפוצות",
        faq: [
            {
                question: "איך אני יוצרת סדנה חדשה?",
                answer: "לחצי על הכפתור 'יצירת סדנה חדשה' בתפריט התחתון או בעמוד הליו שלי. תמלאי את הפרטים הנדרשים ושמרי את הסדנה."
            },
            {
                question: "איך אני נרשמת לסדנה?",
                answer: "לחצי על הסדנה הרצויה, ולאחר מכן על כפתור 'הרשמה'. תצטרכי לאשר את התנאים והסדנה תתווסף ליומן שלך."
            },
            {
                question: "מה זה MAMA COINS?",
                answer: "MAMA COINS הם המטבע הפנימי של הפלטפורמה. את יכולה לרכוש אותם או להרוויח אותם על ידי השתתפות בסדנאות."
            },
            {
                question: "איך אני מעדכנת את הפרופיל שלי?",
                answer: "לכי לעמוד הפרופיל ולחצי על כפתור העריכה ליד התמונה שלך."
            }
        ],
        contact: "צריכות עזרה נוספת? צרו קשר: support@liu.com"
    },
    en: {
        title: "Help",
        help: "Frequently Asked Questions",
        faq: [
            {
                question: "How do I create a new workshop?",
                answer: "Click on the 'Create New Workshop' button in the bottom menu or on the My LIU page. Fill in the required details and save the workshop."
            },
            {
                question: "How do I register for a workshop?",
                answer: "Click on the desired workshop, then click the 'Register' button. You'll need to confirm the terms and the workshop will be added to your calendar."
            },
            {
                question: "What are MAMA COINS?",
                answer: "MAMA COINS are the internal currency of the platform. You can purchase them or earn them by participating in workshops."
            },
            {
                question: "How do I update my profile?",
                answer: "Go to the profile page and click the edit button next to your photo."
            }
        ],
        contact: "Need more help? Contact us: support@liu.com"
    }
};

export default function HelpScreen() {
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
                <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right', fontWeight: 600 }}>
                    {texts[lang].help}
                </Typography>

                {texts[lang].faq.map((item, index) => (
                    <Accordion key={index} sx={{ mb: 1, borderRadius: 2 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ textAlign: 'right' }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2" sx={{ textAlign: 'right', lineHeight: 1.6 }}>
                                {item.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}

                <Paper sx={{ p: 3, borderRadius: 3, mt: 3 }}>
                    <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                        {texts[lang].contact}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
} 