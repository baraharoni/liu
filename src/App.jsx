import React, { useState, useEffect } from 'react';
import {
  Box, Avatar, Typography, Button, Paper, Tabs, Tab, Divider, Stack,
  AppBar, Toolbar, IconButton, Card, CardContent, CardMedia, List, ListItem, ListItemAvatar, ListItemText, Drawer, MenuItem, List as MUIList, Menu, Chip, Container, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import liuLogo from './assets/liu-logo.png';
import liaddorImg from './assets/liaddor.jpg';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import CreateWorkshop from './CreateWorkshop';
import HelpWizardDialog from './HelpWizardDialog';
import CalendarScreen from './CalendarScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import WorkshopDetails from './WorkshopDetails';
// ייבוא מערכי הדמו
import { initialMyWorkshops, attendedWorkshops, futureWorkshops, availableWorkshops } from './workshopData';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinearProgress from '@mui/material/LinearProgress';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import HomeIcon from '@mui/icons-material/Home';
import Snackbar from '@mui/material/Snackbar';
import RegistrationAgreementDialog from './RegistrationAgreementDialog';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import StarIcon from '@mui/icons-material/Star';

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
    profile: "ליו",
    calendar: "יומן",
    fav: "מועדפים",
    search: "חיפוש"
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
    profile: "ליו",
    calendar: "Calendar",
    fav: "Favorites",
    search: "Search"
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

function CompactWorkshopCard({ workshop, lang }) {
  return (
    <Card sx={{
      width: { xs: 160, sm: 170 },
      minWidth: { xs: 160, sm: 170 },
      maxWidth: { xs: 160, sm: 170 },
      minHeight: 180, // גובה מינימלי לכרטיסיה
      borderRadius: 3,
      boxShadow: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      scrollSnapAlign: 'start',
    }}>
      <CardMedia component="img" height="80" image={workshop.image} alt={workshop.title[lang]} />
      <CardContent sx={{
        p: 1,
        pb: 1,
        textAlign: 'right',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 120,
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: mainColor, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{workshop.title[lang]}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{workshop.location[lang]}</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 0.5, alignItems: 'center' }}>
          <CalendarTodayIcon sx={{ fontSize: 14, color: mainColor }} />
          <Typography variant="caption">{workshop.date}</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: mainColor, fontWeight: 600, fontSize: '0.8rem' }}>{workshop.price} Mama Coins</Typography>
        <Button variant="contained" size="small" sx={{
          mt: 'auto',
          bgcolor: mainColor,
          fontWeight: 600,
          width: '100%',
          fontSize: '0.95rem',
          minHeight: 32,
          borderRadius: 2,
          py: 0.5,
          whiteSpace: 'nowrap',
          overflow: 'visible',
          boxShadow: 1,
        }}>
          {lang === 'he' ? 'לפרטים' : 'Details'}
        </Button>
      </CardContent>
    </Card>
  );
}

function StoryCircle({ workshop, onClick, active }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
        opacity: active ? 1 : 0.7
      }}
    >
      <Box
        sx={{
          width: 64, height: 64, borderRadius: '50%', border: `3px solid ${mainColor}`,
          overflow: 'hidden', boxShadow: active ? 3 : 1, mb: 0.5, transition: 'box-shadow 0.2s'
        }}
      >
        <img src={workshop.image} alt={workshop.title.he} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      <Typography variant="caption" sx={{ textAlign: 'center', maxWidth: 70, fontWeight: 600 }}>
        {workshop.title.he.split(' ')[0]}
      </Typography>
    </Box>
  );
}

function StoryDialog({ open, workshops, index, onClose, onPrev, onNext, lang, setAgreementOpen }) {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  // Flatten all images from all workshops into a single array of {ws, img, wsIndex, imgIndex}
  const allStories = workshops.flatMap((ws, wsIndex) => {
    const imgs = ws.images || (ws.image ? [ws.image] : []);
    return imgs.map((img, imgIndex) => ({ ws, img, wsIndex, imgIndex }));
  });
  // Find the start index for the selected workshop
  const startIndex = workshops.slice(0, index).reduce((acc, ws) => acc + ((ws.images && ws.images.length) || (ws.image ? 1 : 0)), 0);
  const [storyIndex, setStoryIndex] = React.useState(startIndex);
  const [progress, setProgress] = React.useState(0);
  const [fade, setFade] = React.useState(true);
  const FADE_DURATION = 350;

  React.useEffect(() => {
    if (!open) return;
    setFade(true);
    let interval;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2.5, 100));
      }, 100);
    } else if (progress >= 100) {
      // Wait a short moment before moving to next story, so the bar stays full
      const timeout = setTimeout(() => {
        handleNext();
      }, 120);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [open, storyIndex, progress]);

  // Reset progress only when storyIndex changes
  React.useEffect(() => {
    setProgress(0);
  }, [storyIndex, open]);

  // Reset modal and checks when storyIndex changes
  React.useEffect(() => {
    // setModalOpen(false); // Removed as per edit hint
    // setChecks([false, false, false, false]); // Removed as per edit hint
  }, [storyIndex]);

  // Ensure storyIndex is set to the correct story when opening a new story
  React.useEffect(() => {
    setStoryIndex(startIndex);
  }, [startIndex, open]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open || !allStories[storyIndex]) return null;
  const { ws, img, wsIndex, imgIndex } = allStories[storyIndex];

  // Click left/right to move between stories
  const handleStoryClick = (e) => {
    const x = e.nativeEvent.offsetX;
    const width = e.currentTarget.offsetWidth;
    if (x > width * 0.66) {
      handlePrev();
    } else if (x < width * 0.33) {
      handleNext();
    }
  };

  function handleNext() {
    if (storyIndex < allStories.length - 1) {
      setFade(false);
      setTimeout(() => {
        setFade(true);
        setProgress(0);
        setStoryIndex(i => i + 1);
      }, FADE_DURATION);
    } else {
      onClose();
    }
  }
  function handlePrev() {
    if (storyIndex > 0) {
      setFade(false);
      setTimeout(() => {
        setFade(true);
        setProgress(0);
        setStoryIndex(i => i - 1);
      }, FADE_DURATION);
    }
  }

  const agreementTexts = [
    'אני מבינה שההשתתפות בסדנה היא באחריותי האישית.',
    'אם יש לי או לתינוק/ת מצב רפואי מיוחד – אעדכן את מנחת הסדנה מראש.',
    'אני מתחייבת לשמור על פרטיות וכבוד שאר האמהות בקבוצה.',
    'קראתי ואני מסכימה לתקנון ולמדיניות הפרטיות של האפליקציה.'
  ];
  const allChecked = false; // Removed as per edit hint
  const handleCheck = idx => (e) => {
    // const newChecks = [...checks]; // Removed as per edit hint
    // newChecks[idx] = e.target.checked; // Removed as per edit hint
    // setChecks(newChecks); // Removed as per edit hint
  };
  const handleRegister = () => {
    // setModalOpen(false); // Removed as per edit hint
    setSnackbarOpen(true);
    // setChecks([false, false, false, false]); // Removed as per edit hint
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.5)',
          zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          m: 0, p: 0, overflow: 'hidden',
        }}
        dir="rtl"
      >
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 4,
            boxShadow: 6,
            width: '95vw',
            maxWidth: 420,
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 1, sm: 3 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Progress bars for all stories */}
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse', gap: 1, width: '100%', px: 1, pt: 1, position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
            {allStories.map((_, i) => (
              <Box key={i} sx={{ flex: 1, mx: 0.5, minWidth: 0, direction: 'rtl' }}>
                <LinearProgress
                  variant="determinate"
                  value={
                    i < storyIndex ? 100 :
                      i === storyIndex ? progress : 0
                  }
                  sx={{ height: 4, bgcolor: '#eee', borderRadius: 2, transition: 'all 0.3s linear', direction: 'rtl' }}
                />
              </Box>
            ))}
          </Box>
          {/* Close button */}
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, left: 8, zIndex: 20, bgcolor: '#fff' }}>
            <CloseIcon />
          </IconButton>
          {/* Story content */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 420,
              height: { xs: '40vh', sm: '55vh' },
              maxHeight: 350,
              bgcolor: '#eee',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              mt: 5,
              mb: 2,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
            onClick={handleStoryClick}
          >
            <img src={img} alt={ws.title[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' }} />
            {/* Prev/Next arrows */}
            {storyIndex > 0 && (
              <IconButton onClick={e => { e.stopPropagation(); handlePrev(); }} sx={{ position: 'absolute', top: '50%', left: 8, bgcolor: '#fff', transform: 'translateY(-50%)', zIndex: 11, pointerEvents: 'auto' }}>
                <ChevronLeftIcon />
              </IconButton>
            )}
            {storyIndex < allStories.length - 1 && (
              <IconButton onClick={e => { e.stopPropagation(); handleNext(); }} sx={{ position: 'absolute', top: '50%', right: 8, bgcolor: '#fff', transform: 'translateY(-50%)', zIndex: 11, pointerEvents: 'auto' }}>
                <ChevronRightIcon />
              </IconButton>
            )}
          </Box>
          {/* Workshop details and button */}
          <Box sx={{
            flex: 1,
            width: '100%',
            bgcolor: 'transparent',
            borderRadius: 0,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            maxWidth: 420,
            overflowY: 'auto',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            minHeight: 0,
          }}>
            <Typography
              variant="h6"
              sx={{ color: mainColor, fontWeight: 700, mb: 1, textAlign: 'right', width: '100%', overflowWrap: 'break-word', wordBreak: 'break-word', fontSize: { xs: '1.1rem', sm: '1.25rem' }, cursor: 'pointer', textDecoration: 'underline' }}
              onClick={e => { e.stopPropagation(); navigate(`/workshop/${ws.id}`); }}
            >
              {ws.title[lang]}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'right', width: '100%', overflowWrap: 'break-word', wordBreak: 'break-word', fontSize: { xs: '0.95rem', sm: '1rem' } }}>{ws.desc[lang]}</Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1, width: '100%' }}>
              <Chip icon={<CalendarTodayIcon />} label={ws.date} variant="outlined" sx={{ borderColor: mainColor, color: mainColor }} />
              <Chip icon={<AccessTimeIcon />} label={ws.time} variant="outlined" sx={{ borderColor: mainColor, color: mainColor }} />
              <Chip icon={<LocationOnIcon />} label={ws.location[lang]} variant="outlined" sx={{ borderColor: mainColor, color: mainColor }} />
              <Chip icon={<MamaCoinsIcon size={18} color={mainColor} />} label={`${ws.price} Mama Coins`} variant="outlined" sx={{ borderColor: mainColor, color: mainColor }} />
            </Stack>
            <Button variant="contained" fullWidth sx={{ bgcolor: mainColor, fontWeight: 600, mt: 2, maxWidth: 320, pointerEvents: 'auto' }} onClick={() => setAgreementOpen(true)}>
              הרשמה לסדנה
            </Button>
          </Box>
        </Box>
        {/* Removed Dialog for agreement as per edit hint */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="נרשמת בהצלחה לסדנה!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </>
  );
}

// דמו של סדנאות חמות לסטוריז
const demoStories = [
  {
    id: 'demo1',
    title: { he: 'סדנת תנועה', en: 'Movement' },
    desc: { he: 'פעילות תנועה חווייתית.', en: 'Fun movement activity.' },
    date: '01.01.2026',
    time: '10:00',
    location: { he: 'תל אביב', en: 'Tel Aviv' },
    price: 50,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'demo2',
    title: { he: 'סדנת יוגה', en: 'Yoga' },
    desc: { he: 'שחרור מתחים וחיזוק הגוף.', en: 'Release tension and strengthen.' },
    date: '01.01.2026',
    time: '12:00',
    location: { he: 'רמת גן', en: 'Ramat Gan' },
    price: 40,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'demo3',
    title: { he: 'סדנת בישול', en: 'Cooking' },
    desc: { he: 'בישול בריא לכל המשפחה.', en: 'Healthy cooking for all.' },
    date: '01.01.2026',
    time: '14:00',
    location: { he: 'חולון', en: 'Holon' },
    price: 60,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'demo4',
    title: { he: 'סדנת עיסוי', en: 'Massage' },
    desc: { he: 'עיסוי תינוקות ואמהות.', en: 'Baby and mom massage.' },
    date: '01.01.2026',
    time: '16:00',
    location: { he: 'פתח תקווה', en: 'Petah Tikva' },
    price: 70,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'demo5',
    title: { he: 'סדנת יצירה', en: 'Art' },
    desc: { he: 'יצירה חווייתית עם הילדים.', en: 'Art with kids.' },
    date: '01.01.2026',
    time: '18:00',
    location: { he: 'תל אביב', en: 'Tel Aviv' },
    price: 55,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
];

function HotWorkshopCard({ workshop, lang }) {
  return (
    <Card sx={{ minWidth: 180, maxWidth: 200, borderRadius: 3, boxShadow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', mx: 1 }}>
      <CardMedia component="img" height="100" image={workshop.image} alt={workshop.title[lang]} />
      <CardContent sx={{
        p: 1.5,
        pb: 1,
        textAlign: 'right',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 120,
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: mainColor, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{workshop.title[lang]}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{workshop.location[lang]}</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 0.5, alignItems: 'center' }}>
          <CalendarTodayIcon sx={{ fontSize: 16, color: mainColor }} />
          <Typography variant="caption">{workshop.date}</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: mainColor, fontWeight: 600 }}>{workshop.price} Mama Coins</Typography>
        <Button variant="contained" size="small" sx={{
          mt: 'auto',
          bgcolor: mainColor,
          fontWeight: 600,
          width: '100%',
          fontSize: '0.95rem',
          minHeight: 32,
          borderRadius: 2,
          py: 0.5,
          whiteSpace: 'nowrap',
          overflow: 'visible',
          boxShadow: 1,
        }}>
          {lang === 'he' ? 'לפרטים' : 'Details'}
        </Button>
      </CardContent>
    </Card>
  );
}

function ExampleWorkshopPage() {
  const { id } = useParams();
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>דף סדנה לדוגמה</Typography>
      <Typography variant="h6">מזהה סדנה: {id}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>כאן בעתיד יוצגו פרטי הסדנה, הרשמה, ועוד.</Typography>
    </Box>
  );
}

function MamaCoinsScreen() {
  // Example data
  const balance = 2690;
  const actions = [
    { id: 1, desc: 'אירוח סדנה: סדנת תנועה', amount: 200, date: '01.07.2025' },
    { id: 2, desc: 'השתתפות בסדנה: סדנת יוגה', amount: 50, date: '28.06.2025' },
    { id: 3, desc: 'המלצה על חברה', amount: 100, date: '20.06.2025' },
  ];
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MamaCoinsIcon size={32} color={mainColor} />
        <Typography variant="h5" sx={{ color: mainColor, fontWeight: 700 }}>
          {balance} מאמא קוינס
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>פעולות אחרונות:</Typography>
      <Box sx={{ mb: 4 }}>
        {actions.map(a => (
          <Box key={a.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="body1">{a.desc}</Typography>
            <Typography variant="body2" sx={{ color: mainColor, fontWeight: 700 }}>+{a.amount}</Typography>
            <Typography variant="caption" sx={{ color: '#888', ml: 2 }}>{a.date}</Typography>
          </Box>
        ))}
      </Box>
      <Button variant="contained" sx={{ bgcolor: mainColor, fontWeight: 600, fontSize: '1.1rem' }} disabled>
        רכישת מאמא קוינס
      </Button>
    </Container>
  );
}

function HomeScreen({ myWorkshops, setMyWorkshops, setPrefill, setAgreementOpen }) {
  const [lang, setLang] = useState('he');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // כיוון דף
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const align = lang === 'he' ? 'right' : 'left';

  // סינון סדנאות חמות (24-48 שעות הקרובות)
  const now = new Date();
  let hotWorkshops = availableWorkshops.filter(ws => {
    const [day, month, year] = ws.date.split('.');
    const wsDate = new Date(`${year}-${month}-${day}T${ws.time}`);
    const diff = (wsDate - now) / (1000 * 60 * 60); // שעות
    return diff >= 0 && diff <= 48;
  });

  // סימולציה: תמיד 5 סטוריז (אם אין מספיק, להשלים עם דמו)
  if (hotWorkshops.length < 5) {
    hotWorkshops = [...hotWorkshops, ...demoStories.slice(0, 5 - hotWorkshops.length)];
  }
  // אם אין בכלל (גם לא דמו) - לא להציג
  const showStories = hotWorkshops.length > 0;

  // הגדרות סליידר hotWorkshops
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1.2 } }
    ]
  };

  // --- הוספת לוגיקה להבטיח 5 כרטיסיות בכל רשימה ---
  let areaWorkshops = futureWorkshops;
  if (areaWorkshops.length < 5) {
    const usedIds = new Set(areaWorkshops.map(ws => ws.id));
    const fill = availableWorkshops.filter(ws => !usedIds.has(ws.id)).slice(0, 5 - areaWorkshops.length);
    areaWorkshops = [...areaWorkshops, ...fill];
  }
  let hotList = attendedWorkshops;
  if (hotList.length < 5) {
    const usedIds = new Set(hotList.map(ws => ws.id));
    const fill = availableWorkshops.filter(ws => !usedIds.has(ws.id)).slice(0, 5 - hotList.length);
    hotList = [...hotList, ...fill];
  }
  // --- סוף לוגיקה ---

  // HomeScreen חוזר למצבו הקודם (רשימות אנכיות בלבד)
  return (
    <Container maxWidth="sm" sx={{ bgcolor: "#faf7f2", px: 2, py: 3, overflowY: 'visible', overflowX: 'hidden', position: 'relative', pb: 8 }} dir={dir}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 2, borderBottom: '1px solid #eee' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={liuLogo} alt="LIU Logo" style={{ height: 36, marginRight: 8, borderRadius: 8, background: "#fff" }} />
            <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700 }}>{texts[lang].hello}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor={lang === 'he' ? 'right' : 'left'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{texts[lang].menu}</Typography>
          <MUIList>
            <MenuItem onClick={() => { setLang(lang === 'he' ? 'en' : 'he'); setDrawerOpen(false); }}>
              {texts[lang].switchLang}
            </MenuItem>
          </MUIList>
        </Box>
      </Drawer>
      {/* כותרת לסטוריז */}
      {showStories && (
        <Box sx={{ px: 0, pt: 2 }}>
          <Typography variant="subtitle1" sx={{ color: mainColor, fontWeight: 700, mb: 1, textAlign: 'right' }}>
            סדנאות ב-48 השעות הקרובות
          </Typography>
        </Box>
      )}
      {/* שורת סטוריז עגולים */}
      {showStories && (
        <Box sx={{ display: 'flex', gap: 2, px: 0, pb: 2, overflowX: 'auto', alignItems: 'center', width: '100%' }}>
          {hotWorkshops.map((ws, idx) => (
            <StoryCircle
              key={ws.id}
              workshop={ws}
              onClick={() => { setStoryIndex(idx); setStoryOpen(true); }}
              active={storyOpen && storyIndex === idx}
            />
          ))}
        </Box>
      )}
      {showStories && (
        <StoryDialog
          open={storyOpen}
          workshops={hotWorkshops}
          index={storyIndex}
          onClose={() => setStoryOpen(false)}
          onPrev={() => setStoryIndex(i => Math.max(0, i - 1))}
          onNext={() => setStoryIndex(i => Math.min(hotWorkshops.length - 1, i + 1))}
          lang={lang}
          setAgreementOpen={setAgreementOpen}
        />
      )}
      {/* תוכן עיקרי - רשימות */}
      <Box>
        <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <span role="img" aria-label="בית" style={{ fontSize: 22, marginLeft: 6 }}>🏠</span>
          סדנאות באזור שלי
        </Typography>
        {/* סליידר אופקי לסדנאות באזור שלי */}
        <Box
          className="workshop-scrollbar"
          sx={{
            display: 'block',
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '100vw', // חשוב למובייל
            px: 0.5,
            pb: 1,
            scrollSnapType: 'x mandatory',
          }}
        >
          {areaWorkshops.map(ws => (
            <Box key={ws.id} sx={{ display: 'inline-block', verticalAlign: 'top', mr: 2, scrollSnapAlign: 'start' }}>
              <Link to={`/workshop/${ws.id}`} style={{ textDecoration: 'none' }}>
                <CompactWorkshopCard workshop={ws} lang={lang} />
              </Link>
            </Box>
          ))}
        </Box>
        {/* מרווח עדין במקום Divider */}
        <Box sx={{ height: 16 }} />
        <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <span role="img" aria-label="להבה" style={{ fontSize: 22, marginLeft: 6 }}>🔥</span>
          סדנאות חמות
        </Typography>
        {/* סליידר אופקי לסדנאות חמות */}
        <Box
          className="workshop-scrollbar"
          sx={{
            display: 'block',
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '100vw', // חשוב למובייל
            px: 0.5,
            pb: 1,
            scrollSnapType: 'x mandatory',
          }}
        >
          {hotList.map(ws => (
            <Box key={ws.id} sx={{ display: 'inline-block', verticalAlign: 'top', mr: 2, scrollSnapAlign: 'start' }}>
              <Link to={`/workshop/${ws.id}`} style={{ textDecoration: 'none' }}>
                <CompactWorkshopCard workshop={ws} lang={lang} />
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Mama Coins display at top left, clickable and links to /mama-coins */}
      <Box component={Link} to="/mama-coins" sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', borderRadius: 3, px: 2, py: 0.5, boxShadow: 1, textDecoration: 'none', cursor: 'pointer' }}>
        <MamaCoinsIcon size={22} color={mainColor} />
        <Typography variant="subtitle2" sx={{ color: mainColor, fontWeight: 700, fontSize: '1.1rem' }}>2690</Typography>
      </Box>
      {/* Call to Action: Create Workshop */}
      <Box sx={{ mt: 4, bgcolor: '#faf7f2', pt: 2, pb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700, mb: 1, textAlign: 'center' }}>
          רוצה ליצור סדנה משלך?
        </Typography>
        <Typography variant="body2" sx={{ color: '#555', mb: 2, textAlign: 'center', maxWidth: 320 }}>
          יש לך רעיון לסדנה, או שאת רוצה שנעזור לך למצוא רעיון? לחצי על הכפתור והתחילי בתהליך פשוט ומהנה!
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: mainColor, fontWeight: 700, fontSize: '1.1rem', borderRadius: 3, px: 4, py: 1.2, boxShadow: 2 }}
          onClick={() => navigate('/create-workshop?help=1')}
        >
          יצירת סדנה חדשה
        </Button>
      </Box>
    </Container>
  );
}

function BottomNavigation({ currentPath }) {
  const navigate = useNavigate();
  const [lang] = useState('he');

  return (
    <Box sx={{
      position: "fixed", bottom: 0, left: 0, right: 0, bgcolor: "#fff", borderTop: "1px solid #eee",
      display: "flex", justifyContent: "space-around", py: 1, zIndex: 100
    }}>
      <Box
        sx={{
          flexDirection: "column",
          minWidth: "auto",
          color: '#999',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <img
          src={liaddorImg}
          alt="Profile"
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: 2,
            border: '1.5px solid #ccc',
            background: '#fff'
          }}
        />
        <div style={{ fontSize: "0.7rem" }}>הפרופיל שלי</div>
      </Box>
      <Button
        sx={{
          color: currentPath === '/profile' ? mainColor : '#666',
          flexDirection: "column",
          minWidth: "auto",
          '&:hover': { bgcolor: 'transparent' },
          flex: 1
        }}
        onClick={() => navigate('/profile')}
      >
        <img
          src={liuLogo}
          alt="LIU Logo"
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: currentPath === '/profile' ? '2px solid #b39ddb' : 'none',
            background: '#fff',
            objectFit: 'cover',
            marginBottom: 2
          }}
        />
        <div style={{ fontSize: "0.7rem" }}>{texts[lang].profile}</div>
      </Button>
      <Button
        sx={{
          color: currentPath === '/calendar' ? mainColor : '#666',
          flexDirection: "column",
          minWidth: "auto",
          '&:hover': { bgcolor: 'transparent' },
          flex: 1
        }}
        onClick={() => navigate('/calendar')}
      >
        <CalendarTodayIcon />
        <div style={{ fontSize: "0.7rem" }}>{texts[lang].calendar}</div>
      </Button>
      <Button
        sx={{
          color: currentPath === '/search' ? mainColor : '#666',
          flexDirection: "column",
          minWidth: "auto",
          '&:hover': { bgcolor: 'transparent' },
          flex: 1
        }}
        onClick={() => navigate('/search')}
      >
        <SearchIcon />
        <div style={{ fontSize: "0.7rem" }}>{texts[lang].search}</div>
      </Button>
      <Button
        sx={{
          color: currentPath === '/' ? mainColor : '#666',
          flexDirection: "column",
          minWidth: "auto",
          '&:hover': { bgcolor: 'transparent' },
          flex: 1
        }}
        onClick={() => navigate('/')}
      >
        <HomeIcon style={{ height: 24, width: 24, marginBottom: 2 }} />
        <div style={{ fontSize: "0.7rem" }}>בית</div>
      </Button>
    </Box>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent({ setAgreementOpen }) {
  const [myWorkshops, setMyWorkshops] = useState([...initialMyWorkshops]);
  const [prefill, setPrefill] = useState(null);
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen myWorkshops={myWorkshops} setMyWorkshops={setMyWorkshops} setPrefill={setPrefill} setAgreementOpen={setAgreementOpen} />} />
        <Route path="/profile" element={<ProfileScreen myWorkshops={myWorkshops} setMyWorkshops={setMyWorkshops} setPrefill={setPrefill} />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/create-workshop" element={<CreateWorkshop myWorkshops={myWorkshops} setMyWorkshops={setMyWorkshops} prefill={prefill} />} />
        <Route path="/workshop/demo1" element={<ExampleWorkshopPage />} />
        <Route path="/workshop/demo2" element={<ExampleWorkshopPage />} />
        <Route path="/workshop/demo3" element={<ExampleWorkshopPage />} />
        <Route path="/workshop/demo4" element={<ExampleWorkshopPage />} />
        <Route path="/workshop/:id" element={<WorkshopDetails />} />
        <Route path="/mama-coins" element={<MamaCoinsScreen />} />
      </Routes>
      <BottomNavigation currentPath={location.pathname} />
    </>
  );
}

// Custom icon: 3 stacked stars for Mama Coins
export function MamaCoinsIcon({ size = 22, color = mainColor, ...props }) {
  return (
    <span style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: 0 }} {...props}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="16,3 20,12 30,12 22,18 25,28 16,22 7,28 10,18 2,12 12,12" fill={color} fillOpacity="0.9" />
      </svg>
    </span>
  );
}

export default function App() {
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleAgreementConfirm = () => {
    setAgreementOpen(false);
    setSnackbarOpen(true);
    // כאן אפשר להוסיף לוגיקת הרשמה אמיתית
  };
  return (
    <Router>
      <AppContent setAgreementOpen={setAgreementOpen} />
      <RegistrationAgreementDialog
        open={agreementOpen}
        onClose={() => setAgreementOpen(false)}
        onConfirm={handleAgreementConfirm}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="נרשמת בהצלחה לסדנה!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Router>
  );
}