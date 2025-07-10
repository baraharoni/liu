import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, CardMedia, AppBar, Toolbar,
  Avatar, Paper, Chip, Stack, TextField, InputAdornment, Button,
  Grid, Divider, Container,
  Select, MenuItem, FormControl, InputLabel, Menu
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MapIcon from '@mui/icons-material/Map';
import ViewListIcon from '@mui/icons-material/ViewList';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import liuLogo from './assets/logonew.jpeg';
import liaddorImg from './assets/liaddor.jpg';
// ייבוא מערך הדמו
import { availableWorkshops } from './workshopData';
import WorkshopMap from './WorkshopMap';

const mainColor = "#b39ddb";

// תגיות לסינון
const categories = [
  { id: 'all', label: { he: 'הכל', en: 'All' }, emoji: '🌟' },
  { id: 'babies', label: { he: 'תינוקות', en: 'Babies' }, emoji: '👶' },
  { id: 'art', label: { he: 'יצירה', en: 'Art' }, emoji: '🎨' },
  { id: 'movement', label: { he: 'תנועה', en: 'Movement' }, emoji: '💃' },
  { id: 'cooking', label: { he: 'בישול', en: 'Cooking' }, emoji: '👨‍🍳' },
  { id: 'yoga', label: { he: 'יוגה', en: 'Yoga' }, emoji: '🧘‍♀️' },
  { id: 'parenting', label: { he: 'הורות', en: 'Parenting' }, emoji: '👨‍👩‍👧‍👦' }
];

function WorkshopCard({ workshop, lang }) {
  const availableSpots = workshop.maxParticipants - workshop.participants;
  const isFull = availableSpots <= 0;

  return (
    <Card sx={{ mb: 1.2, borderRadius: 2, width: '100%', boxShadow: 0, border: '1px solid #eee', display: 'flex', flexDirection: 'row', alignItems: 'center', px: 1, py: 1.2 }}>
      <CardMedia component="img" image={workshop.image} alt={workshop.title[lang]} sx={{ width: 64, height: 64, borderRadius: 2, mr: 1 }} />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 15, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{workshop.title[lang]}</Typography>
          <Chip label={isFull ? 'מלא' : `${availableSpots} מקומות`} size="small" sx={{ bgcolor: isFull ? '#f44336' : mainColor, color: 'white', fontWeight: 600, minWidth: 44, height: 22, fontSize: 12, px: 0.5 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CalendarTodayIcon sx={{ fontSize: 14, color: mainColor }} />
          <Typography variant="caption" sx={{ fontSize: 13 }}>{workshop.date} • {workshop.time}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOnIcon sx={{ fontSize: 14, color: mainColor }} />
          <Typography variant="caption" sx={{ fontSize: 13 }}>{workshop.location[lang]}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <Chip label={categories.find(c => c.id === workshop.category)?.label[lang]} size="small" variant="outlined" sx={{ borderColor: mainColor, color: mainColor, fontSize: 12, height: 20, px: 0.5 }} />
          <Typography variant="caption" sx={{ fontWeight: 600, color: mainColor, fontSize: 13 }}>{workshop.price} Mama Coins</Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          disabled={isFull}
          sx={{ mt: 0.5, bgcolor: mainColor, fontWeight: 600, fontSize: 13, minWidth: 0, px: 2, py: 0.2, borderRadius: 2, boxShadow: 0 }}
        >
          {isFull ? (lang === 'he' ? 'מלא' : 'Full') : (lang === 'he' ? 'הרשמה' : 'Register')}
        </Button>
      </Box>
    </Card>
  );
}

function MapPlaceholder() {
  return (
    <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, bgcolor: '#f5f5f5' }}>
      <MapIcon sx={{ fontSize: 64, color: mainColor, mb: 2 }} />
      <Typography variant="h6" sx={{ mb: 1, color: mainColor }}>
        מפת הסדנאות
      </Typography>
      <Typography variant="body2" color="text.secondary">
        כאן תוצג מפה אינטראקטיבית עם מיקומי הסדנאות
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        (בגרסה הבאה תהיה אינטגרציה עם Google Maps)
      </Typography>
    </Paper>
  );
}

function SearchScreen() {
  const [lang] = useState('he');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('date');

  // State for sort menu
  const [sortMenuAnchor, setSortMenuAnchor] = React.useState(null);
  // State for baby age filter
  const [babyAge, setBabyAge] = useState('all');
  const [babyAgeMenuAnchor, setBabyAgeMenuAnchor] = useState(null);
  const babyAgeOptions = [
    { id: 'all', label: 'כל הגילאים' },
    { id: 'pregnancy', label: 'הריון' },
    { id: '0-3', label: '0-3' },
    { id: '3-6', label: '3-6' },
    { id: '6-12', label: '6-12' },
    { id: '1-2', label: '1-2' },
    { id: '3+', label: '3+' },
  ];
  // State for filter visibility
  const [filtersOpen, setFiltersOpen] = useState(true);

  console.log('SearchScreen - availableWorkshops:', availableWorkshops);

  let filteredWorkshops = availableWorkshops.filter(workshop => {
    const matchesSearch = workshop.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.desc[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.location[lang].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workshop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // מיון
  filteredWorkshops = [...filteredWorkshops].sort((a, b) => {
    if (sortBy === 'date') {
      // assume date is in format DD.MM.YYYY or DD.MM.YY
      const parseDate = d => {
        const [day, month, year] = d.split('.')
        return new Date(Number(year.length === 2 ? '20' + year : year), Number(month) - 1, Number(day));
      };
      return parseDate(a.date) - parseDate(b.date);
    }
    if (sortBy === 'priceLow') {
      return a.price - b.price;
    }
    if (sortBy === 'priceHigh') {
      return b.price - a.price;
    }
    // מרחק - לא ממומש, רק placeholder (תמיד 0)
    if (sortBy === 'distance') {
      return 0;
    }
    return 0;
  });

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "#faf7f2", minHeight: "100vh", pb: 8, px: 2, py: 3 }} dir="rtl">
      <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 2, borderBottom: '1px solid #eee', bgcolor: '#faf7f2' }}>
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'stretch', px: 0 }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', mb: 1 }}>
            <img src={liuLogo} alt="LIU Logo" style={{ height: 36, marginRight: 8, borderRadius: 8, background: "#fff" }} />
          </Box>
          <TextField
            fullWidth
            placeholder={lang === 'he' ? 'חיפוש סדנאות...' : 'Search workshops...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 0, bgcolor: '#fff', borderRadius: 2 }}
            inputProps={{ style: { textAlign: 'right' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: mainColor }} />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>

      {/* תגיות סינון */}
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button onClick={() => setFiltersOpen(o => !o)} size="small" sx={{ minWidth: 0, p: 0.5, color: mainColor, bgcolor: '#f7f4f0', borderRadius: 2 }}>
          <span style={{ display: 'flex', alignItems: 'center', fontSize: 18, transition: 'transform 0.2s', transform: filtersOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
        </Button>
      </Box>
      {filtersOpen && (
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, bgcolor: '#f7f4f0', borderRadius: 3, px: 2, py: 1, boxShadow: 0 }}>
          <Typography variant="subtitle2" sx={{ color: mainColor, fontWeight: 600, fontSize: 15, minWidth: 90, textAlign: 'right' }}>
            {lang === 'he' ? 'סינון לפי קטגוריה:' : 'Filter by category:'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {categories.map(category => (
              <Chip
                key={category.id}
                label={`${category.emoji} ${category.label[lang]}`}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  bgcolor: selectedCategory === category.id ? mainColor : '#fff',
                  color: selectedCategory === category.id ? 'white' : mainColor,
                  borderColor: mainColor,
                  border: '1px solid',
                  fontSize: 15,
                  height: 32,
                  borderRadius: 2,
                  boxShadow: 0,
                  px: 1.5,
                  '&:hover': {
                    bgcolor: selectedCategory === category.id ? mainColor : '#f0f0f0'
                  }
                }}
              />
            ))}
          </Box>
          <Typography variant="subtitle2" sx={{ color: mainColor, fontWeight: 600, fontSize: 15, minWidth: 110, textAlign: 'right', ml: 2 }}>
            סינון לפי גיל התינוק:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {babyAgeOptions.map(opt => (
              <Chip
                key={opt.id}
                label={opt.label}
                onClick={() => setBabyAge(opt.id)}
                sx={{
                  bgcolor: babyAge === opt.id ? mainColor : '#fff',
                  color: babyAge === opt.id ? 'white' : mainColor,
                  borderColor: mainColor,
                  border: '1px solid',
                  fontSize: 15,
                  height: 32,
                  borderRadius: 2,
                  boxShadow: 0,
                  px: 1.5,
                  '&:hover': {
                    bgcolor: babyAge === opt.id ? mainColor : '#f0f0f0'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}
      {/* שורת מיון */}
      {filtersOpen && (
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', gap: 1.5, bgcolor: '#f7f4f0', borderRadius: 3, px: 2, py: 1, boxShadow: 0 }}>
          <Typography variant="subtitle2" sx={{ color: mainColor, fontWeight: 600, fontSize: 15, minWidth: 70, textAlign: 'right', ml: 0 }}>
            מיון לפי:
          </Typography>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', minWidth: 0 }}
            onClick={e => setSortMenuAnchor(e.currentTarget)}>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 15, color: '#222', ml: 0.5 }}>
              {({
                distance: 'מרחק',
                date: 'תאריך',
                priceLow: 'מחיר מהזול ליקר',
                priceHigh: 'מחיר מהיקר לזול'
              })[sortBy]}
            </Typography>
            <SwapVertIcon sx={{ color: mainColor, fontSize: 22, mt: 0.2 }} />
          </Box>
          <Menu
            anchorEl={sortMenuAnchor}
            open={Boolean(sortMenuAnchor)}
            onClose={() => setSortMenuAnchor(null)}
          >
            <MenuItem onClick={() => { setSortBy('distance'); setSortMenuAnchor(null); }}>מרחק</MenuItem>
            <MenuItem onClick={() => { setSortBy('date'); setSortMenuAnchor(null); }}>תאריך</MenuItem>
            <MenuItem onClick={() => { setSortBy('priceLow'); setSortMenuAnchor(null); }}>מחיר מהזול ליקר</MenuItem>
            <MenuItem onClick={() => { setSortBy('priceHigh'); setSortMenuAnchor(null); }}>מחיר מהיקר לזול</MenuItem>
          </Menu>
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title={lang === 'he' ? 'הצג רשימה' : 'Show List'}>
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 42,
              height: 42,
              borderRadius: '50%',
              bgcolor: '#fff',
              border: !showMap ? `2px solid ${mainColor}` : '1.5px solid #e0e0e0',
              color: !showMap ? mainColor : '#bdbdbd',
              cursor: 'pointer',
              transition: 'all 0.18s',
              '&:hover': {
                borderColor: mainColor,
                color: mainColor,
                bgcolor: '#faf7f2',
              },
            }}
            onClick={() => setShowMap(false)}
          >
            <ViewListIcon sx={{ fontSize: 24 }} />
          </Box>
        </Tooltip>
        <Tooltip title={lang === 'he' ? 'הצג מפה' : 'Show Map'}>
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 42,
              height: 42,
              borderRadius: '50%',
              bgcolor: '#fff',
              border: showMap ? `2px solid ${mainColor}` : '1.5px solid #e0e0e0',
              color: showMap ? mainColor : '#bdbdbd',
              cursor: 'pointer',
              transition: 'all 0.18s',
              '&:hover': {
                borderColor: mainColor,
                color: mainColor,
                bgcolor: '#faf7f2',
              },
            }}
            onClick={() => setShowMap(true)}
          >
            <MapIcon sx={{ fontSize: 24 }} />
          </Box>
        </Tooltip>
      </Box>

      {showMap ? (
        <WorkshopMap />
      ) : (
        <Grid container spacing={2}>
          {filteredWorkshops.map(workshop => (
            <Grid item xs={12} key={workshop.id} style={{ width: '100%' }}>
              <Link to={`/workshop/${workshop.id}`} style={{ textDecoration: 'none' }}>
                <WorkshopCard workshop={workshop} lang={lang} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}

      {filteredWorkshops.length === 0 && !showMap && (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <SearchIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            לא נמצאו סדנאות
          </Typography>
          <Typography variant="body2" color="text.secondary">
            נסי לשנות את החיפוש או הסינון
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default SearchScreen; 