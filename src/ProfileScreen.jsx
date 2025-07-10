import React, { useState } from 'react';
import {
  Box, Typography, Button, Paper, Divider, Stack,
  AppBar, Toolbar, Container, List, ListItem, ListItemIcon, ListItemText, ListItemButton
} from '@mui/material';
import liuLogo from './assets/logonew.jpeg';
import UserProfileHeader from './UserProfileHeader';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const mainColor = "#b39ddb";
const accentColor = "#d4c1ec";

// טקסטים לשתי שפות
const texts = {
  he: {
    profile: "הפרופיל שלי",
    menu: "תפריט",
    about: "אודות",
    terms: "תקנון",
    help: "עזרה",
    settings: "הגדרות",
    logout: "התנתקות",
    myLiu: "הליו שלי",
    liuHost: "LIU HOST"
  },
  en: {
    profile: "My Profile",
    menu: "Menu",
    about: "About",
    terms: "Terms",
    help: "Help",
    settings: "Settings",
    logout: "Logout",
    myLiu: "My LIU",
    liuHost: "LIU HOST"
  }
};

export default function ProfileScreen() {
  const [lang] = useState('he');
  const navigate = useNavigate();

  // כיוון דף
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  const menuItems = [
    { icon: <InfoIcon />, text: texts[lang].about, action: () => navigate('/about') },
    { icon: <DescriptionIcon />, text: texts[lang].terms, action: () => navigate('/terms') },
    { icon: <HelpIcon />, text: texts[lang].help, action: () => navigate('/help') },
    { icon: <SettingsIcon />, text: texts[lang].settings, action: () => navigate('/settings') },
    { icon: <ExitToAppIcon />, text: texts[lang].logout, action: () => console.log('logout') },
    { icon: <ExitToAppIcon />, text: "חזור לאונבורדינג", action: () => navigate('/onboarding') }
  ];

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "#faf7f2", minHeight: "100vh", pb: 8, px: 2, py: 3 }} dir={dir}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 0, borderBottom: '1px solid #eee' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={liuLogo} alt="LIU Logo" style={{ height: 36, marginRight: 8, borderRadius: 8, background: "#fff" }} />
            <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700 }}>{texts[lang].profile}</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* קומפוננטת פרופיל משופרת */}
      <Box sx={{ px: 2, py: 2 }}>
        <UserProfileHeader onEdit={() => { }} />
      </Box>

      {/* תפריט ברוחב מלא */}
      <Box sx={{ px: 2, py: 2 }}>
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItemButton
                  onClick={item.action}
                  sx={{
                    py: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: accentColor
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: mainColor, minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '1rem',
                        fontWeight: 500,
                        textAlign: 'right'
                      }
                    }}
                  />
                </ListItemButton>
                {index < menuItems.length - 1 && (
                  <Divider sx={{ mx: 2 }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
} 