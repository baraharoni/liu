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
              sx={{
                position: 'absolute',
                [dir === 'rtl' ? 'right' : 'left']: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.9)',
                '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
              }}
            >
              {dir === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            <IconButton
              onClick={nextImage}
              sx={{
                position: 'absolute',
                [dir === 'rtl' ? 'left' : 'right']: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.9)',
                '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
              }}
            >
              {dir === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </>
        )}
        {/* Image indicators */}
        {images.length > 1 && (
          <Box sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1
          }}>
            {images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: index === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </Box>
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
                icon={<MamaCoinsIcon size={18} color={mainColor} style={{ marginLeft: dir === 'rtl' ? 4 : 0, marginRight: dir === 'rtl' ? 0 : 4 }} />}
                label={`${price} Mama Coins`}
                variant="outlined"
                sx={{ borderColor: mainColor, color: mainColor, flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}
              />
            </Stack>
            {/* Location */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}>
              <LocationOnIcon sx={{ color: mainColor }} />
              <Typography variant="body2" sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{location}</Typography>
            </Box>
            {/* Participants info */}
            {maxParticipants > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}>
                <Typography variant="body2" sx={{ color: mainColor, fontWeight: 600, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                  משתתפות: {participants}/{maxParticipants}
                </Typography>
                <Box sx={{
                  flexGrow: 1,
                  height: 8,
                  bgcolor: '#f0f0f0',
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <Box sx={{
                    width: `${(participants / maxParticipants) * 100}%`,
                    height: '100%',
                    bgcolor: mainColor
                  }} />
                </Box>
              </Box>
            )}
            {/* Times held */}
            <Typography variant="body2" sx={{ color: mainColor, fontWeight: 600, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              בוצעה {timesHeld} פעמים
            </Typography>
          </Box>
          <Divider />
          {/* Comments section */}
          <Box sx={{ p: 3 }} dir={dir}>
            <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700, mb: 2, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              תגובות של משתתפות ({comments.length})
            </Typography>
            {comments.length === 0 ? (
              <Typography color="text.secondary" sx={{ mb: 2, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                עדיין אין תגובות לסדנה הזו. היי הראשונה להגיב!
              </Typography>
            ) : (
              <Stack spacing={2} sx={{ mb: 3 }}>
                {comments.map((c) => (
                  <Box key={c.id} sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    bgcolor: c.text ? '#f7f3fd' : '#f5f5f5',
                    p: 2,
                    borderRadius: 2,
                    flexDirection: dir === 'rtl' ? 'row-reverse' : 'row'
                  }}>
                    <Avatar src={c.user.avatar} sx={{ width: 40, height: 40, ml: dir === 'rtl' ? 0 : 2, mr: dir === 'rtl' ? 2 : 0 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, textAlign: dir === 'rtl' ? 'right' : 'left' }}>{c.user.name}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{c.date}</Typography>
                      {c.text ? (
                        <Typography variant="body2" sx={{ mt: 0.5, textAlign: dir === 'rtl' ? 'right' : 'left' }}>{c.text}</Typography>
                      ) : (
                        <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5, fontStyle: 'italic', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                          לא הוסיפה תגובה מילולית
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            )}
            {/* Add comment form - only for attended workshops */}
            {isAttended && (
              <>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" spacing={1} alignItems="flex-end" dir={dir}>
                  <Avatar src={liaddorImg} sx={{ width: 40, height: 40 }} />
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="הוסיפי תגובה..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { textAlign: dir === 'rtl' ? 'right' : 'left' } }}
                  />
                  <IconButton
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || submitting}
                    sx={{
                      bgcolor: mainColor,
                      color: 'white',
                      '&:hover': { bgcolor: mainColor },
                      '&:disabled': { bgcolor: '#ccc' }
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Stack>
              </>
            )}
          </Box>
        </Paper>
      </Container>
      {/* Floating Register Button */}
      <Fab
        variant="extended"
        color="primary"
        onClick={handleRegister}
        disabled={isRegistered}
        sx={{
          position: 'fixed',
          bottom: 80,
          left: dir === 'rtl' ? 16 : 'unset',
          right: dir === 'rtl' ? 'unset' : 16,
          bgcolor: isRegistered ? '#4caf50' : mainColor,
          '&:hover': { bgcolor: isRegistered ? '#4caf50' : mainColor }
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        {isRegistered ? 'נרשמת!' : 'הרשמה לסדנה'}
      </Fab>

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