import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, CardMedia, AppBar, Toolbar,
  Avatar, Paper, Chip, Stack, Container, ButtonGroup, Button, ToggleButtonGroup, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemAvatar, ToggleButton
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import liuLogo from './assets/liu-logo.png';
import liaddorImg from './assets/liaddor.jpg';
import { Link } from 'react-router-dom';
// ייבוא מערך הדמו
import { myUpcomingActivities } from './workshopData';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import heLocale from '@fullcalendar/core/locales/he';

const mainColor = "#b39ddb";

// סימולציה של פעילויות נוספות
const additionalActivities = [
  {
    id: 101,
    title: { he: "סדנת יוגה בפארק", en: "Yoga in the Park" },
    desc: { he: "יוגה בטבע עם אמהות אחרות", en: "Yoga in nature with other moms" },
    date: "15.8.2025",
    time: "08:00",
    location: { he: "פארק הירקון, תל אביב", en: "Yarkon Park, Tel Aviv" },
    price: 30,
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80",
    status: "נרשמתי",
    category: { he: "יוגה", en: "Yoga" }
  },
  {
    id: 102,
    title: { he: "סדנת בישול בריא", en: "Healthy Cooking Workshop" },
    desc: { he: "מתכונים בריאים לכל המשפחה", en: "Healthy recipes for the whole family" },
    date: "22.8.2025",
    time: "18:30",
    location: { he: "מרכז קהילתי, תל אביב", en: "Community Center, Tel Aviv" },
    price: 55,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    status: "נרשמתי",
    category: { he: "בישול", en: "Cooking" }
  },
  {
    id: 103,
    title: { he: "מעגל אמהות", en: "Mothers' Circle" },
    desc: { he: "מפגש תמיכה ושיתוף", en: "Support and sharing circle" },
    date: "25.8.2025",
    time: "10:30",
    location: { he: "מרכז קהילתי, תל אביב", en: "Community Center, Tel Aviv" },
    price: 30,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    status: "נרשמתי",
    category: { he: "הורות", en: "Parenting" }
  },
  {
    id: 104,
    title: { he: "סדנת יצירה לאמהות", en: "Moms' Art Workshop" },
    desc: { he: "יצירה אישית לאמהות", en: "Personal art for moms" },
    date: "28.8.2025",
    time: "19:00",
    location: { he: "סטודיו לאמנות, תל אביב", en: "Art Studio, Tel Aviv" },
    price: 50,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    status: "נרשמתי",
    category: { he: "יצירה", en: "Art" }
  }
];

// פונקציה להמרת תאריך עברי DD.MM.YYYY ל-YYYY-MM-DD
function toISODate(dateStr, timeStr) {
  const [d, m, y] = dateStr.split('.');
  // הוספת אפסים מובילים
  const mm = m.padStart(2, '0');
  const dd = d.padStart(2, '0');
  return `${y}-${mm}-${dd}T${timeStr}`;
}

// אירוע בדיקה להיום
const today = new Date();
const todayISO = today.toISOString().slice(0, 10);
const testEvent = {
  id: 999,
  title: { he: "בדיקת אירוע", en: "Test Event" },
  desc: { he: "אירוע בדיקה להיום", en: "Test event for today" },
  date: `${dd(today.getDate())}.${dd(today.getMonth() + 1)}.${today.getFullYear()}`,
  time: "12:00",
  location: { he: "תל אביב", en: "Tel Aviv" },
  price: 0,
  image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  status: "נרשמתי",
  category: { he: "בדיקה", en: "Test" }
};
function dd(n) { return n < 10 ? '0' + n : '' + n; }

// שילוב כל הפעילויות
const allActivities = [...myUpcomingActivities, ...additionalActivities, testEvent];

function ActivityCard({ activity, lang }) {
  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardMedia component="img" height="140" image={activity.image} alt={activity.title[lang]} />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>{activity.title[lang]}</Typography>
          <Chip
            label={activity.status}
            size="small"
            sx={{ bgcolor: mainColor, color: 'white', fontWeight: 600 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {activity.desc[lang]}
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon sx={{ fontSize: 16, color: mainColor }} />
            <Typography variant="body2">{activity.date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: mainColor }} />
            <Typography variant="body2">{activity.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: mainColor }} />
            <Typography variant="body2">{activity.location[lang]}</Typography>
          </Box>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Chip
            label={activity.category[lang]}
            size="small"
            variant="outlined"
            sx={{ borderColor: mainColor, color: mainColor }}
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: mainColor }}>
            {activity.price} Mama Coins
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function CalendarScreen() {
  const [lang] = useState('he');
  const [view, setView] = useState('calendar'); // calendar | list
  const [calendarView, setCalendarView] = useState('dayGridMonth'); // dayGridMonth | timeGridWeek
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // הפוך את הפעילויות לאירועים ליומן
  const events = allActivities.map(activity => ({
    id: activity.id,
    title: activity.title[lang],
    start: toISODate(activity.date, activity.time),
    extendedProps: { ...activity },
    url: `/workshop/${activity.id}`
  }));

  console.log('CalendarScreen - allActivities:', allActivities);
  console.log('CalendarScreen - events:', events);

  const handleDateClick = (arg) => {
    console.log('Date clicked:', arg.dateStr);
    const clickedDate = arg.dateStr;
    const activitiesOnDate = allActivities.filter(activity => {
      const activityDate = activity.date.split('.').reverse().join('-');
      console.log('Comparing:', activityDate, 'with', clickedDate);
      return activityDate === clickedDate;
    });

    console.log('Activities on date:', activitiesOnDate);

    if (activitiesOnDate.length > 0) {
      setSelectedDate(clickedDate);
      setSelectedActivities(activitiesOnDate);
      setDialogOpen(true);
    }
  };

  const handleViewChange = (event, newView) => {
    console.log('View change:', newView);
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleCalendarViewChange = (newView) => {
    console.log('Calendar view change:', newView);
    setCalendarView(newView);
  };

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "#faf7f2", minHeight: "100vh", pb: 8, px: 2, py: 3 }} dir="rtl">
      <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 2, borderBottom: '1px solid #eee' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={liuLogo} alt="LIU Logo" style={{ height: 36, marginRight: 8, borderRadius: 8, background: "#fff" }} />
            <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700 }}>יומן</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
          sx={{ bgcolor: '#ede7f6', borderRadius: 2 }}
        >
          <ToggleButton value="calendar" sx={{ fontWeight: view === 'calendar' ? 700 : 400, color: mainColor }}>יומן</ToggleButton>
          <ToggleButton value="list" sx={{ fontWeight: view === 'list' ? 700 : 400, color: mainColor }}>רשימה</ToggleButton>
        </ToggleButtonGroup>
        {view === 'calendar' && (
          <ButtonGroup size="small" sx={{ bgcolor: '#ede7f6', borderRadius: 2 }}>
            <ToggleButton
              value="dayGridMonth"
              selected={calendarView === 'dayGridMonth'}
              sx={{ fontWeight: 600, color: mainColor, bgcolor: calendarView === 'dayGridMonth' ? mainColor : undefined, color: calendarView === 'dayGridMonth' ? '#fff' : mainColor }}
              onClick={() => handleCalendarViewChange('dayGridMonth')}
            >
              חודש
            </ToggleButton>
            <ToggleButton
              value="timeGridWeek"
              selected={calendarView === 'timeGridWeek'}
              sx={{ fontWeight: 600, color: mainColor, bgcolor: calendarView === 'timeGridWeek' ? mainColor : undefined, color: calendarView === 'timeGridWeek' ? '#fff' : mainColor }}
              onClick={() => handleCalendarViewChange('timeGridWeek')}
            >
              שבוע
            </ToggleButton>
          </ButtonGroup>
        )}
      </Box>

      {view === 'calendar' ? (
        <Paper sx={{ p: 1, borderRadius: 2, boxShadow: 2, bgcolor: '#fff' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView={calendarView}
            initialDate="2025-07-01"
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: ''
            }}
            height="auto"
            locale={heLocale}
            events={events}
            dateClick={handleDateClick}
            eventClick={(info) => {
              info.jsEvent.preventDefault();
              if (info.event.url) {
                window.location.href = info.event.url;
              }
            }}
            datesSet={(arg) => handleCalendarViewChange(arg.view.type)}
            dayMaxEvents={true}
            eventContent={calendarView === 'dayGridMonth' ? renderMonthEventDot : renderEventContent}
            dayCellContent={renderDayCell}
          />
        </Paper>
      ) : (
        <Box sx={{ px: 2 }}>
          {allActivities.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <CalendarTodayIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                אין פעילויות קרובות
              </Typography>
              <Typography variant="body2" color="text.secondary">
                הירשמי לסדנאות כדי לראות אותן כאן
              </Typography>
            </Paper>
          ) : (
            allActivities.map(activity => (
              <Link key={activity.id} to={`/workshop/${activity.id}`} style={{ textDecoration: 'none' }}>
                <ActivityCard activity={activity} lang={lang} />
              </Link>
            ))
          )}
        </Box>
      )}

      {/* דיאלוג להצגת פעילויות ביום מסוים */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', color: mainColor, fontWeight: 700 }}>
          פעילויות ביום {selectedDate}
        </DialogTitle>
        <DialogContent>
          <List>
            {selectedActivities.map((activity) => (
              <ListItem key={activity.id} component={Link} to={`/workshop/${activity.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemAvatar>
                  <Avatar src={activity.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={activity.title[lang]}
                  secondary={`${activity.time} • ${activity.location[lang]}`}
                />
                <Chip
                  label={activity.category[lang]}
                  size="small"
                  sx={{ bgcolor: mainColor, color: 'white' }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

// הצגת אירוע ביומן
function renderEventContent(eventInfo) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Avatar src={eventInfo.event.extendedProps.image} sx={{ width: 20, height: 20 }} />
      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>{eventInfo.event.title}</Typography>
    </Box>
  );
}

// Minimal event dot for month view
function renderMonthEventDot(eventInfo) {
  return (
    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: '#b39ddb', margin: 1 }} title={eventInfo.event.title}></span>
  );
}

// הצגת מספר פעילויות על גבי היום
function renderDayCell(arg) {
  const dateStr = arg.date.toISOString().split('T')[0];
  const activitiesOnDay = allActivities.filter(activity => {
    const activityDate = activity.date.split('.').reverse().join('-');
    return activityDate === dateStr;
  });

  if (activitiesOnDay.length > 0) {
    return (
      <Box sx={{ position: 'relative', height: '100%' }}>
        <div>{arg.dayNumberText}</div>
        <Box
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            bgcolor: mainColor,
            color: 'white',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700
          }}
        >
          {activitiesOnDay.length}
        </Box>
      </Box>
    );
  }

  return arg.dayNumberText;
}

export default CalendarScreen; 