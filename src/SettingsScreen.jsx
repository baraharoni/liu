import React from 'react';
import {
    Box, Typography, Container, AppBar, Toolbar, Paper, Switch, FormControlLabel, List, ListItem, ListItemText, Divider
} from '@mui/material';
import liuLogo from './assets/logonew.jpeg';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const mainColor = "#b39ddb";

const texts = {
    he: {
        title: "הגדרות",
        notifications: "התראות",
        pushNotifications: "התראות דחיפה",
        emailNotifications: "התראות אימייל",
        language: "שפה",
        hebrew: "עברית",
        english: "English",
        privacy: "פרטיות",
        showProfile: "הצג פרופיל למשתמשות אחרות",
        dataUsage: "שימוש בנתונים",
        autoSync: "סנכרון אוטומטי",
        about: "אודות האפליקציה",
        version: "גרסה 1.0.0",
        clearCache: "נקה מטמון",
        logout: "התנתק"
    },
    en: {
        title: "Settings",
        notifications: "Notifications",
        pushNotifications: "Push Notifications",
        emailNotifications: "Email Notifications",
        language: "Language",
        hebrew: "עברית",
        english: "English",
        privacy: "Privacy",
        showProfile: "Show profile to other users",
        dataUsage: "Data Usage",
        autoSync: "Auto Sync",
        about: "About App",
        version: "Version 1.0.0",
        clearCache: "Clear Cache",
        logout: "Logout"
    }
};

export default function SettingsScreen() {
    const [lang] = React.useState('he');
    const navigate = useNavigate();
    const dir = lang === 'he' ? 'rtl' : 'ltr';
    const [pushNotifications, setPushNotifications] = React.useState(true);
    const [emailNotifications, setEmailNotifications] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(true);
    const [autoSync, setAutoSync] = React.useState(true);

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
                <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <List sx={{ p: 0 }}>
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].notifications}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        fontWeight: 600,
                                        color: mainColor,
                                        textAlign: 'right'
                                    }
                                }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].pushNotifications}
                                sx={{ '& .MuiListItemText-primary': { textAlign: 'right' } }}
                            />
                            <Switch
                                checked={pushNotifications}
                                onChange={(e) => setPushNotifications(e.target.checked)}
                                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: mainColor } }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].emailNotifications}
                                sx={{ '& .MuiListItemText-primary': { textAlign: 'right' } }}
                            />
                            <Switch
                                checked={emailNotifications}
                                onChange={(e) => setEmailNotifications(e.target.checked)}
                                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: mainColor } }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].privacy}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        fontWeight: 600,
                                        color: mainColor,
                                        textAlign: 'right'
                                    }
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].showProfile}
                                sx={{ '& .MuiListItemText-primary': { textAlign: 'right' } }}
                            />
                            <Switch
                                checked={showProfile}
                                onChange={(e) => setShowProfile(e.target.checked)}
                                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: mainColor } }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].dataUsage}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        fontWeight: 600,
                                        color: mainColor,
                                        textAlign: 'right'
                                    }
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].autoSync}
                                sx={{ '& .MuiListItemText-primary': { textAlign: 'right' } }}
                            />
                            <Switch
                                checked={autoSync}
                                onChange={(e) => setAutoSync(e.target.checked)}
                                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: mainColor } }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].clearCache}
                                sx={{ '& .MuiListItemText-primary': { textAlign: 'right' } }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="אפס אונבורדינג"
                                sx={{ '& .MuiListItemText-primary': { textAlign: 'right' } }}
                                onClick={() => {
                                    localStorage.removeItem('onboardingCompleted');
                                    localStorage.removeItem('userData');
                                    window.location.reload();
                                }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].version}
                                sx={{ '& .MuiListItemText-primary': { textAlign: 'center', color: '#666' } }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={texts[lang].logout}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        textAlign: 'center',
                                        color: '#d32f2f',
                                        fontWeight: 600
                                    }
                                }}
                            />
                        </ListItem>
                    </List>
                </Paper>
            </Box>
        </Container>
    );
} 