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
import liuLogo from './assets/liu-logo.png';
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
    <Card sx={{ mb: 2, borderRadius: 2, width: '100%' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia component="img" height="120" image={workshop.image} alt={workshop.title[lang]} />
        <Chip
          label={isFull ? 'מלא' : `${availableSpots} מקומות`}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: isFull ? '#f44336' : mainColor,
            color: 'white',
            fontWeight: 600,
            minWidth: 60,
            zIndex: 2
          }}
        />
      </Box>
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, flex: 1, mr: 1 }}>{workshop.title[lang]}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CalendarTodayIcon sx={{ fontSize: 16, color: mainColor }} />
          <Typography variant="body2">{workshop.date} • {workshop.time}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LocationOnIcon sx={{ fontSize: 16, color: mainColor }} />
          <Typography variant="body2">{workshop.location[lang]}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
          <Chip 
            label={categories.find(c => c.id === workshop.category)?.label[lang]} 
            size="small" 
            variant="outlined" 
            sx={{ borderColor: mainColor, color: mainColor }}
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: mainColor }}>
            {workshop.price} Mama Coins
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          fullWidth 
          disabled={isFull}
          sx={{ mt: 1.5, bgcolor: mainColor, fontWeight: 600 }}
        >
          {isFull ? (lang === 'he' ? 'מלא' : 'Full') : (lang === 'he' ? 'הרשמה' : 'Register')}
        </Button>
      </CardContent>
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
        return new Date(Number(year.length === 2 ? '20'+year : year), Number(month)-1, Number(day));
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
      <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 2, borderBottom: '1px solid #eee' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={liuLogo} alt="LIU Logo" style={{ height: 36, marginRight: 8, borderRadius: 8, background: "#fff" }} />
            <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700 }}>חיפוש</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* חיפוש */}
      <TextField
        fullWidth
        placeholder={lang === 'he' ? 'חיפוש סדנאות...' : 'Search workshops...'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        inputProps={{ style: { textAlign: 'right' } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: mainColor }} />
            </InputAdornment>
          ),
        }}
      />

      {/* תגיות סינון */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: mainColor, fontWeight: 600 }}>
          {lang === 'he' ? 'סינון לפי קטגוריה:' : 'Filter by category:'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map(category => (
            <Chip
              key={category.id}
              label={`${category.emoji} ${category.label[lang]}`}
              onClick={() => setSelectedCategory(category.id)}
              sx={{
                bgcolor: selectedCategory === category.id ? mainColor : 'transparent',
                color: selectedCategory === category.id ? 'white' : mainColor,
                borderColor: mainColor,
                border: '1px solid',
                '&:hover': {
                  bgcolor: selectedCategory === category.id ? mainColor : '#f0f0f0'
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* שורת מיון בסגנון דינמי */}
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', minWidth: 0 }}
          onClick={e => setSortMenuAnchor(e.currentTarget)}>
          <Typography variant="subtitle2" sx={{ color: mainColor, fontWeight: 600, fontSize: 16, ml: 1 }}>
            מיינו לפי:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 16, color: '#222', ml: 0.5 }}>
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