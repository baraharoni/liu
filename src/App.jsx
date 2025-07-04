import React, { useState } from 'react';
import {
  Box, Avatar, Typography, Button, Paper, Tabs, Tab, Divider, Stack,
  AppBar, Toolbar, IconButton, Card, CardContent, CardMedia, List, ListItem, ListItemAvatar, ListItemText, Drawer, MenuItem, List as MUIList, Menu, Chip, Container
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import liuLogo from './assets/liu-logo.png';
import liaddorImg from './assets/liaddor.jpg';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
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
    profile: "הפרופיל שלי",
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
    profile: "Profile",
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

function StoryDialog({ open, workshops, index, onClose, onPrev, onNext, lang }) {
  const [progress, setProgress] = React.useState(0);
  const [fade, setFade] = React.useState(true);
  const [displayIndex, setDisplayIndex] = React.useState(index);
  const storyCount = workshops.length;
  const FADE_DURATION = 350; // ms

  // מעבר אוטומטי
  React.useEffect(() => {
    if (!open) return;
    setProgress(0);
    setFade(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleNext();
          return 0;
        }
        return prev + 2.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [open, displayIndex]);

  // מעבר fade מקצועי
  React.useEffect(() => {
    if (displayIndex !== index) {
      setFade(false); // fade out
      const timeout = setTimeout(() => {
        setDisplayIndex(index); // החלפת תוכן
        setFade(true); // fade in
        setProgress(0);
      }, FADE_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [index, displayIndex]);

  // מניעת scroll במסך סטורי
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open || !workshops[displayIndex]) return null;
  const ws = workshops[displayIndex];
  const images = ws.images || (ws.image ? [ws.image] : []);

  // מעבר בלחיצה על צד המסך
  const handleStoryClick = (e) => {
    const x = e.nativeEvent.offsetX;
    const width = e.currentTarget.offsetWidth;
    // RTL: ימין = קודם, שמאל = הבא
    if (x > width * 0.66) {
      handlePrev();
    } else if (x < width * 0.33) {
      handleNext();
    }
  };

  function handleNext() {
    if (displayIndex < storyCount - 1) {
      setFade(false);
      setTimeout(() => {
        setFade(true);
        setProgress(0);
        setDisplayIndex(i => i + 1);
      }, FADE_DURATION);
    } else {
      onClose();
    }
  }
  function handlePrev() {
    if (displayIndex > 0) {
      setFade(false);
      setTimeout(() => {
        setFade(true);
        setProgress(0);
        setDisplayIndex(i => i - 1);
      }, FADE_DURATION);
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.96)',
        zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        m: 0, p: 0, overflow: 'hidden',
      }}
      dir="rtl"
    >
      {/* פסי סטוריז בראש - RTL אמיתי */}
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', gap: 1, width: '100vw', px: 2, pt: 2, position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
        {workshops.map((_, i) => (
          <Box key={i} sx={{ flex: 1, mx: 0.5, minWidth: 0, direction: 'rtl' }}>
            <LinearProgress
              variant="determinate"
              value={
                i < displayIndex ? 100 :
                i === displayIndex ? progress : 0
              }
              sx={{ height: 4, bgcolor: '#eee', borderRadius: 2, transition: 'all 0.3s linear', direction: 'rtl' }}
            />
          </Box>
        ))}
      </Box>
      {/* Close button */}
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, left: 16, zIndex: 20, bgcolor: '#fff' }}>
        <CloseIcon />
      </IconButton>
      {/* תוכן סטורי במסך מלא */}
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `opacity ${FADE_DURATION}ms`,
          opacity: fade ? 1 : 0,
          position: 'relative',
        }}
        onClick={handleStoryClick}
      >
        {/* תמונה */}
        <Box sx={{ width: '100vw', height: '55vh', bgcolor: '#eee', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={images[0]} alt={ws.title[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Prev/Next arrows */}
          {displayIndex > 0 && (
            <IconButton onClick={e => { e.stopPropagation(); handlePrev(); }} sx={{ position: 'absolute', top: '50%', left: 8, bgcolor: '#fff', transform: 'translateY(-50%)', zIndex: 11 }}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          {displayIndex < storyCount - 1 && (
            <IconButton onClick={e => { e.stopPropagation(); handleNext(); }} sx={{ position: 'absolute', top: '50%', right: 8, bgcolor: '#fff', transform: 'translateY(-50%)', zIndex: 11 }}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </Box>
        {/* פרטי סדנה וכפתור */}
        <Box sx={{ flex: 1, width: '100vw', bgcolor: 'rgba(255,255,255,0.98)', borderRadius: 0, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700, mb: 1, textAlign: 'right', width: '100%' }}>{ws.title[lang]}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'right', width: '100%' }}>{ws.desc[lang]}</Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1, width: '100%' }}>
            <Chip icon={<CalendarTodayIcon />} label={ws.date} variant="outlined" sx={{ borderColor: mainColor, color: mainColor }} />
            <Chip icon={<AccessTimeIcon />} label={ws.time} variant="outlined" sx={{ borderColor: mainColor, color: mainColor }} />
            <Chip icon={<LocationOnIcon />} label={ws.location[lang]} variant="outlined" sx={{ borderColor: mainColor, color: mainColor }} />
            <Chip icon={<MonetizationOnIcon />} label={`${ws.price} Mama Coins`} variant="outlined" sx={{ borderColor: mainColor, color: mainColor }} />
          </Stack>
          <Button variant="contained" fullWidth sx={{ bgcolor: mainColor, fontWeight: 600, mt: 2, maxWidth: 320 }}>
            הרשמה לסדנה
          </Button>
        </Box>
      </Box>
    </Box>
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

function HomeScreen({ myWorkshops, setMyWorkshops, setPrefill }) {
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
    <Container maxWidth="sm" sx={{ bgcolor: "#faf7f2", px: 2, py: 3, overflowY: 'visible', overflowX: 'hidden' }} dir={dir}>
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
        />
      )}
      {/* תוכן עיקרי - רשימות */}
      <Box>
        <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <span role="img" aria-label="בית" style={{ fontSize: 22, marginLeft: 6 }}>🏠</span>
          סדנאות באזור שלי
        </Typography>
        {/* סליידר אופקי לסדנאות באזור שלי */}
        <Box sx={{
          display: 'block',
          overflowX: 'auto',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '100vw', // חשוב למובייל
          px: 0.5,
          pb: 1,
          scrollSnapType: 'x mandatory',
        }}>
          {areaWorkshops.map(ws => (
            <Box key={ws.id} sx={{ display: 'inline-block', verticalAlign: 'top', mr: 2, scrollSnapAlign: 'start' }}>
              <Link to={`/workshop/${ws.id}`} style={{ textDecoration: 'none' }}>
                <CompactWorkshopCard workshop={ws} lang={lang} />
              </Link>
            </Box>
          ))}
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <span role="img" aria-label="להבה" style={{ fontSize: 22, marginLeft: 6 }}>🔥</span>
          סדנאות חמות
        </Typography>
        {/* סליידר אופקי לסדנאות חמות */}
        <Box sx={{
          display: 'block',
          overflowX: 'auto',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '100vw', // חשוב למובייל
          px: 0.5,
          pb: 1,
          scrollSnapType: 'x mandatory',
        }}>
          {hotList.map(ws => (
            <Box key={ws.id} sx={{ display: 'inline-block', verticalAlign: 'top', mr: 2, scrollSnapAlign: 'start' }}>
              <Link to={`/workshop/${ws.id}`} style={{ textDecoration: 'none' }}>
                <CompactWorkshopCard workshop={ws} lang={lang} />
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Paper sx={{ mx: 0, p: 3, borderRadius: 3, bgcolor: accentColor }}>
        <Typography variant="subtitle2" sx={{ color: mainColor, fontWeight: 700, textAlign: 'right', mb: 1 }}>{texts[lang].mamaCoins}</Typography>
        <Typography variant="body2" sx={{ textAlign: 'right', mb: 2 }}>{texts[lang].balance}</Typography>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ bgcolor: mainColor, textTransform: 'none' }}>{texts[lang].convert}</Button>
          <Button variant="outlined" sx={{ color: mainColor, borderColor: mainColor, textTransform: 'none' }}>{texts[lang].buy}</Button>
        </Stack>
      </Paper>
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
      <Button 
        sx={{ 
          color: currentPath === '/profile' ? mainColor : '#666', 
          flexDirection: "column", 
          minWidth: "auto",
          '&:hover': { bgcolor: 'transparent' }
        }}
        onClick={() => navigate('/profile')}
      >
        <Avatar 
          src={liaddorImg}
          sx={{ 
            width: 24, 
            height: 24,
            border: currentPath === '/profile' ? '2px solid #b39ddb' : 'none'
          }}
        />
        <div style={{ fontSize: "0.7rem" }}>{texts[lang].profile}</div>
      </Button>
      <Button 
        sx={{ 
          color: currentPath === '/calendar' ? mainColor : '#666', 
          flexDirection: "column", 
          minWidth: "auto",
          '&:hover': { bgcolor: 'transparent' }
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
          '&:hover': { bgcolor: 'transparent' }
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
          '&:hover': { bgcolor: 'transparent' }
        }}
        onClick={() => navigate('/')}
      >
        <img src={liuLogo} alt="LIU" style={{ height: 24, width: 24, marginBottom: 2 }} />
        <div style={{ fontSize: "0.7rem" }}>ליו</div>
      </Button>
    </Box>
  );
}

function AppContent() {
  const [myWorkshops, setMyWorkshops] = useState([...initialMyWorkshops]);
  const [prefill, setPrefill] = useState(null);
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen myWorkshops={myWorkshops} setMyWorkshops={setMyWorkshops} setPrefill={setPrefill} />} />
        <Route path="/profile" element={<ProfileScreen myWorkshops={myWorkshops} setMyWorkshops={setMyWorkshops} setPrefill={setPrefill} />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/create-workshop" element={<CreateWorkshop myWorkshops={myWorkshops} setMyWorkshops={setMyWorkshops} prefill={prefill} />} />
        <Route path="/workshop/:id" element={<WorkshopDetails />} />
      </Routes>
      <BottomNavigation currentPath={location.pathname} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}