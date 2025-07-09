import React, { useState } from 'react';
import {
  Box, Typography, Button, Paper, Tabs, Tab, Divider, Stack,
  AppBar, Toolbar, Card, CardContent, CardMedia, List, ListItem, ListItemAvatar, ListItemText, Avatar, Container
} from '@mui/material';
import liuLogo from './assets/liu-logo.png';
import UserProfileHeader from './UserProfileHeader';
import { useNavigate, Link } from 'react-router-dom';
// ייבוא מערכי הדמו
import { initialMyWorkshops, attendedWorkshops, futureWorkshops } from './workshopData';

const mainColor = "#b39ddb";
const accentColor = "#d4c1ec";

// טקסטים לשתי שפות
const texts = {
  he: {
    hello: "שלום ליעד!",
    businessTab: "LIU HOST",
    privateTab: "ה-LIU שלי",
    myWorkshops: "הסדנאות שלי",
    newWorkshop: "יצירת סדנה חדשה",
    participants: "משתתפות",
    attended: "הסדנאות שהשתתפתי בהן",
    future: "סדנאות עתידיות",
    mamaCoins: "MAMA COINS",
    balance: "החשבון שלך: 2,690 מטבעות",
    convert: "המרת MAMA COINS",
    buy: "רכישת MAMA COINS",
    requests: "בקשות",
    upcoming: "האירועים הקרובים שלי",
    personal: "פרטים אישיים",
    age: "גיל: 31 | אמא ל-2 | אזור: תל אביב",
    desc: "בעלת עסק עצמאי, מדריכת הורים, מנחת סדנאות",
    menu: "תפריט",
    switchLang: "English",
    profile: "הפרופיל שלי"
  },
  en: {
    hello: "Hello, Liad!",
    businessTab: "LIU HOST",
    privateTab: "My LIU",
    myWorkshops: "My Workshops",
    newWorkshop: "Create New Workshop",
    participants: "Participants",
    attended: "Workshops Attended",
    future: "Upcoming Workshops",
    mamaCoins: "MAMA COINS",
    balance: "Your balance: 2,690 coins",
    convert: "Convert MAMA COINS",
    buy: "Buy MAMA COINS",
    requests: "Requests",
    upcoming: "My Upcoming Events",
    personal: "Personal Info",
    age: "Age: 31 | Mom of 2 | Area: Tel Aviv",
    desc: "Business owner, parent coach, workshop facilitator",
    menu: "Menu",
    switchLang: "עברית",
    profile: "Profile"
  }
};

function WorkshopCard({ workshop, lang, showParticipants }) {
  return (
    <Card sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
      <CardMedia component="img" height="140" image={workshop.image} alt={workshop.title[lang]} />
      <CardContent sx={{ textAlign: 'right' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{workshop.title[lang]}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, lineHeight: 1.5 }}>{workshop.desc[lang]}</Typography>
        <Typography sx={{ mt: 1, mb: 0.5 }}><b>{lang === 'he' ? 'תאריך' : 'Date'}:</b> {workshop.date} | <b>{lang === 'he' ? 'שעה' : 'Time'}:</b> {workshop.time}</Typography>
        <Typography sx={{ mb: 0.5 }}><b>{lang === 'he' ? 'מיקום' : 'Location'}:</b> {workshop.location[lang]}</Typography>
        <Typography sx={{ mb: 1 }}><b>{lang === 'he' ? 'מחיר' : 'Price'}:</b> {workshop.price} Mama Coins</Typography>
        {showParticipants && workshop.participants && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'right' }}>{texts[lang].participants}:</Typography>
            <List dense sx={{ p: 0 }}>
              {workshop.participants.map((p) => (
                <ListItem key={p.id} component="a" href={`#profile/${p.id}`} sx={{ p: 0, mb: 0.5 }}>
                  <ListItemAvatar sx={{ minWidth: 32 }}>
                    <Avatar src={p.avatar} sx={{ width: 24, height: 24 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={p.name[lang]}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.875rem',
                        textAlign: 'right'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function ProfileScreen({ myWorkshops, setMyWorkshops, setPrefill }) {
  const [tab, setTab] = useState(0);
  const [lang, setLang] = useState('he');
  const navigate = useNavigate();

  // כיוון דף
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const align = lang === 'he' ? 'right' : 'left';

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

      {/* טאבים על רוחב מלא וצמודים למעלה */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#fff' }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            '& .MuiTabs-indicator': {
              background: mainColor,
              height: 3
            }
          }}
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label={texts[lang].privateTab}
            sx={{
              color: tab === 0 ? mainColor : "#666",
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'none'
            }}
          />
          <Tab
            label={texts[lang].businessTab}
            sx={{
              color: tab === 1 ? mainColor : "#666",
              fontSize: '0.9rem',
              textTransform: 'none'
            }}
          />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Box sx={{ px: 2, py: 3 }}>
          <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right', fontWeight: 600 }}>
            {texts[lang].future}
          </Typography>
          {futureWorkshops.map(ws => (
            <Link key={ws.id} to={`/workshop/${ws.id}`} style={{ textDecoration: 'none' }}>
              <WorkshopCard workshop={ws} lang={lang} />
            </Link>
          ))}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right', fontWeight: 600 }}>
            {texts[lang].attended}
          </Typography>
          {attendedWorkshops.map(ws => (
            <Link key={ws.id} to={`/workshop/${ws.id}`} style={{ textDecoration: 'none' }}>
              <WorkshopCard workshop={ws} lang={lang} showParticipants />
            </Link>
          ))}
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ px: 2, py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
            <Typography variant="h6" sx={{ color: mainColor, flexGrow: 1, textAlign: 'right', fontWeight: 600 }}>
              {texts[lang].myWorkshops}
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: mainColor, fontWeight: 600, textTransform: 'none' }}
              onClick={() => navigate('/create-workshop')}
            >
              {texts[lang].newWorkshop}
            </Button>
          </Box>
          {myWorkshops.map(ws => (
            <Link key={ws.id} to={`/workshop/${ws.id}`} style={{ textDecoration: 'none' }}>
              <WorkshopCard workshop={ws} lang={lang} showParticipants />
            </Link>
          ))}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      <Paper sx={{ mx: 2, p: 3, borderRadius: 3, bgcolor: accentColor }}>
        <Typography variant="subtitle2" sx={{ color: mainColor, fontWeight: 700, textAlign: 'right', mb: 1 }}>
          {texts[lang].mamaCoins}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'right', mb: 2 }}>
          {texts[lang].balance}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ bgcolor: mainColor, textTransform: 'none' }}>
            {texts[lang].convert}
          </Button>
          <Button variant="outlined" sx={{ color: mainColor, borderColor: mainColor, textTransform: 'none' }}>
            {texts[lang].buy}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
} 