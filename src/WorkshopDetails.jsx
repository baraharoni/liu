import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Divider, Stack, Container, AppBar, Toolbar,
  Card, CardContent, CardMedia, List, ListItem, ListItemAvatar, ListItemText, Avatar,
  IconButton, TextField, Chip, Fab, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MamaCoinsIcon } from './App';
import liaddorImg from './assets/liaddor.jpg';
import {
  initialMyWorkshops,
  attendedWorkshops,
  futureWorkshops,
  myUpcomingActivities,
  availableWorkshops
} from './workshopData';

const mainColor = "#b39ddb";
const accentColor = "#d4c1ec";

// טקסטים לשתי שפות
const texts = {
  he: {
    conflictTitle: "חפיפת זמנים",
    conflictMessage: "יש לך סדנה אחרת באותו זמן. מה את מעדיפה?",
    currentWorkshop: "הסדנה הנוכחית",
    existingWorkshop: "הסדנה הקיימת",
    cancel: "ביטול",
    confirm: "אישור"
  },
  en: {
    conflictTitle: "Time Conflict",
    conflictMessage: "You have another workshop at the same time. What do you prefer?",
    currentWorkshop: "Current Workshop",
    existingWorkshop: "Existing Workshop",
    cancel: "Cancel",
    confirm: "Confirm"
  }
};

export default function WorkshopDetails({ myUpcomingActivities, setMyUpcomingActivities }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lang] = useState('he');
  const [loading, setLoading] = useState(true);
  const [workshop, setWorkshop] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAttended, setIsAttended] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [conflictDialogOpen, setConflictDialogOpen] = useState(false);
  const [conflictingWorkshop, setConflictingWorkshop] = useState(null);

  // כיוון דף
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const allWorkshops = [
        ...initialMyWorkshops,
        ...attendedWorkshops,
        ...futureWorkshops,
        ...myUpcomingActivities,
        ...availableWorkshops
      ];

      const foundWorkshop = allWorkshops.find(ws => String(ws.id) === String(id));
      setWorkshop(foundWorkshop);

      // Check if user is registered
      const user = { attendedWorkshops: attendedWorkshops };
      setIsAttended(user.attendedWorkshops.some(ws => String(ws.id) === String(id)));

      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setComments(prev => [
        ...prev,
        {
          id: Date.now(),
          user: { name: 'ליעד דור', avatar: liaddorImg },
          text: newComment,
          date: new Date().toLocaleDateString('he-IL')
        }
      ]);
      setNewComment('');
      setSubmitting(false);
    }, 600);
  };

  // פונקציה לבדיקת חפיפת זמנים
  const checkTimeConflict = (newWorkshop) => {
    const newDate = newWorkshop.date;
    const newTime = newWorkshop.time;

    // בדיקה מול הסדנאות העתידיותשתמשת רשומה אליהן
    const conflict = myUpcomingActivities.find(existing => {
      return existing.date === newDate && existing.time === newTime;
    });

    return conflict;
  };

  // פונקציה לביטול הרשמה לסדנה
  const cancelWorkshopRegistration = (workshopId) => {
    setMyUpcomingActivities(prev => prev.filter(ws => ws.id !== workshopId));
  };

  const handleRegister = () => {
    // בדיקת חפיפת זמנים
    const conflict = checkTimeConflict(workshop);

    if (conflict) {
      setConflictingWorkshop(conflict);
      setConflictDialogOpen(true);
    } else {
      // אין חפיפה - הרשמה רגילה
      registerToWorkshop();
    }
  };

  const registerToWorkshop = () => {
    setIsRegistered(true);
    // הוספת הסדנה לרשימת הסדנאות העתידיות
    const workshopToAdd = {
      ...workshop,
      status: "נרשמתי"
    };
    setMyUpcomingActivities(prev => [workshopToAdd, ...prev]);

    setTimeout(() => {
      alert('נרשמת בהצלחה לסדנה!');
    }, 500);
  };

  const handleConflictChoice = (chooseCurrent) => {
    if (chooseCurrent) {
      // המשתמשת בוחרת בסדנה הנוכחית - לבטל את הקודמת
      if (conflictingWorkshop) {
        cancelWorkshopRegistration(conflictingWorkshop.id);
      }
      registerToWorkshop();
    }
    // אם לא בוחרת בסדנה הנוכחית, לא עושים כלום
    setConflictDialogOpen(false);
    setConflictingWorkshop(null);
  };

  const nextImage = () => {
    const images = workshop.images || (workshop.image ? [workshop.image] : []);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = workshop.images || (workshop.image ? [workshop.image] : []);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">טוען...</Typography>
      </Box>
    );
  }

  if (!workshop) {
    const allWorkshops = [
      ...initialMyWorkshops,
      ...attendedWorkshops,
      ...futureWorkshops,
      ...myUpcomingActivities,
      ...availableWorkshops
    ];
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">סדנה לא נמצאה</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          ID: {id} | Total workshops: {allWorkshops.length}
        </Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }} variant="outlined">חזרה</Button>
      </Box>
    );
  }

  const images = workshop.images || (workshop.image ? [workshop.image] : []);
  const title = workshop.title?.he || workshop.title || '';
  const desc = workshop.desc?.he || workshop.desc || '';
  const host = workshop.host?.he || workshop.host || '';
  const date = workshop.date;
  const time = workshop.time;
  const location = workshop.location?.he || workshop.location || '';
  const price = workshop.price;
  const timesHeld = workshop.timesHeld || 1;
  const participants = workshop.participants || 0;
  const maxParticipants = workshop.maxParticipants || 0;

  return (
    <Box sx={{ bgcolor: '#faf7f2', minHeight: '100vh', pb: 8 }} dir={dir}>
      {/* Cover Image */}
      <Box sx={{ position: 'relative', height: 250, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={images[currentImageIndex]}
          alt={title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Overlay with back button */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: dir === 'rtl' ? 0 : 'unset',
          left: dir === 'rtl' ? 'unset' : 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
          p: 2
        }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        {/* Image navigation arrows */}
        {images.length > 1 && (
          <>
            <IconButton
              onClick={prevImage}
              sx={{ position: 'absolute', top: '50%', right: 16, bgcolor: '#fff', transform: 'translateY(-50%)', zIndex: 10 }}
            >
              <ChevronRightIcon />
            </IconButton>
            <IconButton
              onClick={nextImage}
              sx={{ position: 'absolute', top: '50%', left: 16, bgcolor: '#fff', transform: 'translateY(-50%)', zIndex: 10 }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Container maxWidth="md" sx={{ mt: -4, position: 'relative', zIndex: 1 }}>
        {/* Main content card */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
          {/* Header section */}
          <Box sx={{ p: 3, pb: 2 }} dir={dir}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: mainColor, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              {desc}
            </Typography>
            {/* Quick info chips */}
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }} dir={dir}>
              <Chip
                icon={<PersonIcon sx={{ ml: dir === 'rtl' ? 0.5 : 0, mr: dir === 'rtl' ? 0 : 0.5 }} />}
                label={host}
                variant="outlined"
                sx={{ borderColor: mainColor, color: mainColor, flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}
              />
              <Chip
                icon={<CalendarTodayIcon sx={{ ml: dir === 'rtl' ? 0.5 : 0, mr: dir === 'rtl' ? 0 : 0.5 }} />}
                label={date}
                variant="outlined"
                sx={{ borderColor: mainColor, color: mainColor, flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}
              />
              <Chip
                icon={<AccessTimeIcon sx={{ ml: dir === 'rtl' ? 0.5 : 0, mr: dir === 'rtl' ? 0 : 0.5 }} />}
                label={time}
                variant="outlined"
                sx={{ borderColor: mainColor, color: mainColor, flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}
              />
              <Chip
                icon={<LocationOnIcon sx={{ ml: dir === 'rtl' ? 0.5 : 0, mr: dir === 'rtl' ? 0 : 0.5 }} />}
                label={location}
                variant="outlined"
                sx={{ borderColor: mainColor, color: mainColor, flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}
              />
              <Chip
                icon={<MamaCoinsIcon size={18} color={mainColor} />}
                label={`${price} Mama Coins`}
                variant="outlined"
                sx={{ borderColor: mainColor, color: mainColor, flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}
              />
            </Stack>
          </Box>
          <Divider />
          {/* Comments section */}
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: mainColor, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              תגובות
            </Typography>
            <List>
              {comments.map(comment => (
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={comment.user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.user.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {comment.text}
                        </Typography>
                        <br />
                        <Typography component="span" variant="caption" color="text.secondary">
                          {comment.date}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="הוסיפי תגובה..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                sx={{ mr: 2 }}
                onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ bgcolor: mainColor, minWidth: 48, minHeight: 48, borderRadius: '50%' }}
                onClick={handleAddComment}
                disabled={submitting || !newComment.trim()}
              >
                <SendIcon />
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      {/* Conflict Dialog */}
      <Dialog
        open={conflictDialogOpen}
        onClose={() => setConflictDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'right', fontWeight: 700, color: mainColor }}>
          {texts[lang].conflictTitle}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: 'right', mb: 3 }}>
            {texts[lang].conflictMessage}
          </Typography>

          {conflictingWorkshop && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right' }}>
                {texts[lang].existingWorkshop}:
              </Typography>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, textAlign: 'right', mb: 1 }}>
                  {conflictingWorkshop.title.he}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'right', mb: 1 }}>
                  {conflictingWorkshop.date} | {conflictingWorkshop.time}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'right' }}>
                  {conflictingWorkshop.location.he}
                </Typography>
              </Paper>
            </Box>
          )}

          <Typography variant="h6" sx={{ color: mainColor, mb: 2, textAlign: 'right' }}>
            {texts[lang].currentWorkshop}:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: '#f0f8ff' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, textAlign: 'right', mb: 1 }}>
              {workshop.title.he}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'right', mb: 1 }}>
              {workshop.date} | {workshop.time}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>
              {workshop.location.he}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
          <Button
            onClick={() => setConflictDialogOpen(false)}
            variant="outlined"
            sx={{ color: mainColor, borderColor: mainColor }}
          >
            {texts[lang].cancel}
          </Button>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => handleConflictChoice(false)}
              variant="outlined"
              sx={{ color: mainColor, borderColor: mainColor }}
            >
              {texts[lang].existingWorkshop}
            </Button>
            <Button
              onClick={() => handleConflictChoice(true)}
              variant="contained"
              sx={{ bgcolor: mainColor }}
            >
              {texts[lang].currentWorkshop}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 