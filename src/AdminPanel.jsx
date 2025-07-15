import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Tabs, Tab, AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import liuLogo from './assets/logonew.jpeg';
import { availableWorkshops, hosts } from './workshopData';
import dayjs from 'dayjs';

const mainColor = '#b39ddb';
const accentColor = '#d4c1ec';

// דמו משתמשות
const demoUsers = [
  { id: 1, name: 'ליעד דור', email: 'liad@liu.com', phone: '050-1234567', status: 'פעילה', avatar: liuLogo },
  { id: 2, name: 'נועה כהן', email: 'noa@liu.com', phone: '052-9876543', status: 'חסומה', avatar: '' },
];

function hash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

export default function AdminPanel() {
  const [step, setStep] = useState('login');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null); // סדנה/משתמשה נבחרת
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState('');
  const [showHost, setShowHost] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('asc');

  // דמו: סדנאות
  const [workshops, setWorkshops] = useState(availableWorkshops);
  const [users, setUsers] = useState(demoUsers);

  // Helper: get closest session date (future or soonest)
  function getClosestSessionDate(ws) {
    if (!ws.sessions || ws.sessions.length === 0) return ws.date;
    const now = dayjs();
    // Sort sessions by date ascending
    const sorted = [...ws.sessions].sort((a, b) => dayjs(a.date, 'DD.MM.YYYY') - dayjs(b.date, 'DD.MM.YYYY'));
    // Find first session in the future
    const future = sorted.find(s => dayjs(s.date, 'DD.MM.YYYY').isAfter(now));
    return (future || sorted[0]).date;
  }

  // חיפוש
  const filteredWorkshops = workshops.filter(ws => ws.title?.he?.includes(search) || ws.title?.en?.includes(search));
  const filteredUsers = users.filter(u => u.name.includes(search) || u.email.includes(search));

  // Sorting logic
  const sortedWorkshops = [...filteredWorkshops].sort((a, b) => {
    let aVal, bVal;
    switch (sortBy) {
      case 'title':
        aVal = a.title?.he || '';
        bVal = b.title?.he || '';
        break;
      case 'date':
        aVal = dayjs(getClosestSessionDate(a), 'DD.MM.YYYY').toDate();
        bVal = dayjs(getClosestSessionDate(b), 'DD.MM.YYYY').toDate();
        break;
      case 'host':
        aVal = a.hostName || a.host?.he || '';
        bVal = b.hostName || b.host?.he || '';
        break;
      case 'status':
        aVal = a.status || 'פעילה';
        bVal = b.status || 'פעילה';
        break;
      case 'participants':
        aVal = a.participants?.length || a.participants || 0;
        bVal = b.participants?.length || b.participants || 0;
        break;
      case 'sessions':
        aVal = a.sessions?.length || 0;
        bVal = b.sessions?.length || 0;
        break;
      default:
        aVal = '';
        bVal = '';
    }
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  function handleSort(col) {
    if (sortBy === col) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
  }

  // בדיקת סיסמא
  const handleLogin = (e) => {
    e.preventDefault();
    if (hash(password) === hash('LIAD123')) {
      setStep('panel');
      setError('');
    } else {
      setError('סיסמא שגויה');
    }
  };

  // מחיקה
  const handleDelete = () => {
    if (tab === 0) {
      setWorkshops(workshops.filter(ws => ws.id !== selected.id));
      setSnackbar('הסדנה נמחקה');
    } else {
      setUsers(users.filter(u => u.id !== selected.id));
      setSnackbar('המשתמשת נמחקה');
    }
    setDeleteDialog(false);
    setSelected(null);
  };

  if (step === 'login') {
    return (
      <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#faf7f2' }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2, width: '100%', maxWidth: 360, textAlign: 'center' }}>
          <img src={liuLogo} alt="LIU Logo" style={{ height: 48, marginBottom: 16 }} />
          <Typography variant="h5" sx={{ color: mainColor, fontWeight: 700, mb: 2 }}>כניסת מנהל</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="סיסמא"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              autoFocus
            />
            {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: mainColor, fontWeight: 700 }}>התחבר</Button>
          </form>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2, bgcolor: '#faf7f2', minHeight: '100vh' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 2, borderBottom: '1px solid #eee', bgcolor: '#fff' }}>
        <Toolbar>
          <img src={liuLogo} alt="LIU Logo" style={{ height: 36, marginRight: 8, borderRadius: 8, background: '#fff' }} />
          <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700, flexGrow: 1 }}>פאנל ניהול</Typography>
          <Tabs value={tab} onChange={(_, v) => { setTab(v); setSearch(''); setSelected(null); }} textColor="primary" indicatorColor="primary">
            <Tab label="סדנאות" />
            <Tab label="משתמשות" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: 400, mx: 'auto', mb: 2 }}>
        <TextField
          fullWidth
          placeholder={tab === 0 ? 'חיפוש סדנה...' : 'חיפוש משתמשת...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ bgcolor: '#fff', borderRadius: 2 }}
        />
      </Box>
      {tab === 0 && (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('title')} sx={{ cursor: 'pointer', fontWeight: 700 }}>שם סדנה</TableCell>
                <TableCell onClick={() => handleSort('date')} sx={{ cursor: 'pointer', fontWeight: 700 }}>תאריך</TableCell>
                <TableCell onClick={() => handleSort('host')} sx={{ cursor: 'pointer', fontWeight: 700 }}>מנחה</TableCell>
                <TableCell onClick={() => handleSort('status')} sx={{ cursor: 'pointer', fontWeight: 700 }}>סטטוס</TableCell>
                <TableCell onClick={() => handleSort('participants')} sx={{ cursor: 'pointer', fontWeight: 700 }}>משתתפות</TableCell>
                <TableCell onClick={() => handleSort('sessions')} sx={{ cursor: 'pointer', fontWeight: 700 }}>מפגשים</TableCell>
                <TableCell>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedWorkshops.map(ws => (
                <TableRow key={ws.id} hover onClick={() => setSelected(ws)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{ws.title?.he || ''}</TableCell>
                  <TableCell>{getClosestSessionDate(ws)}</TableCell>
                  <TableCell>{ws.hostName || ws.host?.he || '—'}</TableCell>
                  <TableCell>{ws.status || 'פעילה'}</TableCell>
                  <TableCell>{ws.participants?.length || ws.participants || 0}</TableCell>
                  <TableCell>{ws.sessions?.length || 0}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={e => { e.stopPropagation(); setSelected(ws); }}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={e => { e.stopPropagation(); setSelected(ws); setDeleteDialog(true); }}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tab === 1 && (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>שם</TableCell>
                <TableCell>אימייל</TableCell>
                <TableCell>טלפון</TableCell>
                <TableCell>סטטוס</TableCell>
                <TableCell>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map(u => (
                <TableRow key={u.id} hover onClick={() => setSelected(u)} sx={{ cursor: 'pointer' }}>
                  <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Avatar src={u.avatar} />{u.name}</Box></TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.phone}</TableCell>
                  <TableCell>{u.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={e => { e.stopPropagation(); setSelected(u); }}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={e => { e.stopPropagation(); setSelected(u); setDeleteDialog(true); }}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* דיאלוג פרטי סדנה משודרג: */}
      {tab === 0 && selected && selected.title && (
        <Dialog open={!!selected && !deleteDialog} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
          <DialogTitle>פרטי סדנה</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'flex-start' }}>
              {/* תמונה */}
              <Box sx={{ minWidth: 160, maxWidth: 220, flex: 1 }}>
                <img src={selected.image} alt={selected.title?.he} style={{ width: '100%', borderRadius: 12, marginBottom: 8 }} />
              </Box>
              {/* פרטים */}
              <Box sx={{ flex: 2 }}>
                <Typography variant="h6" sx={{ color: mainColor, fontWeight: 700 }}>{selected.title?.he}</Typography>
                <Typography sx={{ mb: 1 }}>{selected.desc?.he}</Typography>
                <Typography><b>תאריך:</b> {selected.date} <b>שעה:</b> {selected.time}</Typography>
                <Typography><b>מיקום:</b> {selected.location?.he}</Typography>
                <Typography><b>מחיר:</b> {selected.price} Mama Coins</Typography>
                <Typography><b>מנחה:</b> <Button variant="text" sx={{ color: mainColor, p: 0, minWidth: 0 }} onClick={() => setShowHost(v => !v)}>{hosts.find(h => h.id === selected.hostId)?.name}</Button></Typography>
                {showHost && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 2, bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
                    <Avatar src={hosts.find(h => h.id === selected.hostId)?.avatar} sx={{ width: 48, height: 48 }} />
                    <Box>
                      <Typography variant="subtitle1">{hosts.find(h => h.id === selected.hostId)?.name}</Typography>
                      <Typography variant="body2">{hosts.find(h => h.id === selected.hostId)?.email}</Typography>
                    </Box>
                  </Box>
                )}
                {/* אפשרות עריכה */}
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" sx={{ mr: 1 }}>ערוך פרטי סדנה</Button>
                </Box>
              </Box>
            </Box>
            {/* אנליטיקה */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ color: mainColor, fontWeight: 600 }}>אנליטיקה</Typography>
              <Typography>סה"כ מפגשים: {selected.sessions?.length || 0}</Typography>
              <TableContainer component={Paper} sx={{ mt: 1, mb: 2, borderRadius: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>תאריך</TableCell>
                      <TableCell>שעה</TableCell>
                      <TableCell>משתתפות</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selected.sessions?.map(s => (
                      <TableRow key={s.id}>
                        <TableCell>{s.date}</TableCell>
                        <TableCell>{s.time}</TableCell>
                        <TableCell>{s.participants?.length || 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* רשימת משתתפות לכל מפגש */}
              {selected.sessions?.map(s => (
                <Box key={s.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">מפגש {s.date} {s.time}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {s.participants?.map(p => (
                      <Box key={p.id} sx={{ bgcolor: '#eee', px: 1.5, py: 0.5, borderRadius: 2 }}>{p.name?.he}</Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelected(null)}>סגור</Button>
            <Button color="error" onClick={() => setDeleteDialog(true)}>מחק</Button>
          </DialogActions>
        </Dialog>
      )}
      {/* דיאלוג פרטים/עריכה */}
      {tab === 1 && (
        <Dialog open={!!selected && !deleteDialog} onClose={() => setSelected(null)} maxWidth="xs" fullWidth>
          <DialogTitle>פרטי משתמשת</DialogTitle>
          <DialogContent>
            {selected && (
              <Box>
                <Typography><b>שם:</b> {selected.name}</Typography>
                <Typography><b>אימייל:</b> {selected.email}</Typography>
                <Typography><b>טלפון:</b> {selected.phone}</Typography>
                <Typography><b>סטטוס:</b> {selected.status}</Typography>
                {/* כאן אפשר להוסיף עריכה */}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelected(null)}>סגור</Button>
            <Button color="error" onClick={() => setDeleteDialog(true)}>מחק</Button>
          </DialogActions>
        </Dialog>
      )}
      {/* דיאלוג אישור מחיקה */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>אישור מחיקה</DialogTitle>
        <DialogContent>
          <Typography>האם אתה בטוח שברצונך למחוק {tab === 0 ? 'את הסדנה' : 'את המשתמשת'}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>ביטול</Button>
          <Button color="error" onClick={handleDelete}>מחק</Button>
        </DialogActions>
      </Dialog>
      {/* דיאלוג פרטי מנחה: */}
      {/* הסר את הדיאלוג הנפרד של מנחה */}
      <Snackbar open={!!snackbar} autoHideDuration={2000} onClose={() => setSnackbar('')} message={snackbar} />
    </Container>
  );
} 