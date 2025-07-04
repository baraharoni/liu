import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Stack, RadioGroup, FormControlLabel, Radio, Slider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Box } from '@mui/material';

const questions = [
  {
    key: 'interests',
    label: 'מה את אוהבת לעשות או מתעניינת בו?',
    placeholder: 'תחביבים, נושאים מסקרנים, דברים שממלאים אותך',
    multiline: true
  },
  {
    key: 'background',
    label: 'מה עשית לפני הלידה?',
    placeholder: 'עבודה, לימודים, התנדבות, פרויקטים',
    multiline: true
  },
  {
    key: 'education',
    label: 'האם למדת או הוסמכת למשהו שיכול להיות רלוונטי?',
    placeholder: 'תואר, קורס, הכשרה מקצועית כלשהי',
    multiline: true
  },
  {
    key: 'place',
    label: 'מה מרגיש לך נעים כמקום למפגש?',
    type: 'radio',
    options: ['בבית', 'בחוץ (פארק / חוף)', 'בזום', 'לא בטוחה עדיין']
  },
  {
    key: 'participants',
    label: 'כמה משתתפות היית רוצה שיהיו במפגש כזה?',
    placeholder: 'למשל: 3–6 או עד 10'
  },
  {
    key: 'lead',
    label: 'עד כמה נוח לך להוביל שיחה או פעילות?',
    type: 'slider',
    min: 1,
    max: 5
  },
  {
    key: 'activityType',
    label: 'איזה סוג של פעילות מדברת אלייך כרגע?',
    type: 'radio',
    options: ['פעילות פרקטית (הדגמה, התנסות)', 'שיתוף והקשבה הדדית', 'תרגול פיזי (תנועה, יציבה)', 'שילוב של כמה אלמנטים']
  },
  {
    key: 'notes',
    label: 'האם יש משהו שחשוב לנו לדעת כדי להתאים לך את ההצעה?',
    placeholder: "למשל: אין לי ביטוח / אין לי עוסק מורשה, חשוב שהמפגש יהיה פשוט, וכו'"
  }
];

function getSuggestion(answers) {
  // דמו: הצעה קבועה, אפשר להחליף ללוגיקה חכמה
  return {
    name: 'הים כמגרש משחק – מפגש הכרות עם עולם הגלישה',
    desc: 'מפגש בוקר קליל לאמהות עם תינוקות, על חוף נעים ונגיש. נכיר יחד את מבנה הגלשן, חוקי בטיחות בסיסיים בים, ודגשים כשמגיעים לחוף עם תינוק. לאחר מכן – כל משתתפת תוכל להתנסות בגלשן קצר בזמן ששאר האמהות ישמרו יחד על התינוקות. חוויה פיזית, מגבשת ועם ערך מוסף. אין צורך בניסיון קודם – רק לבוא כמו שאת.',
    format: 'חוף ים, פעילות חווייתית',
    length: '60 דקות',
    participants: '4–6',
    needs: 'בגדי ים, מגבת, מים, מחצלת',
    tip: 'את לא צריכה ללמד כמו מדריכה – רק לחלוק מה שאת כבר מכירה, בקצב שנוח לך.'
  };
}

export default function HelpWizardDialog({ open, onClose, onSuggestWorkshop }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSuggestion, setShowSuggestion] = useState(false);
  const suggestion = getSuggestion(answers);

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else setShowSuggestion(true);
  };
  const handleBack = () => {
    if (showSuggestion) setShowSuggestion(false);
    else if (step > 0) setStep(step - 1);
    else handleClose();
  };
  const handleChange = (key, value) => setAnswers({ ...answers, [key]: value });
  const handleClose = () => {
    setStep(0);
    setAnswers({});
    setShowSuggestion(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      {!showSuggestion ? (
        <>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>שאלון התאמת סדנה</span>
              <IconButton onClick={handleClose} size="small" sx={{ ml: 1 }}>
                <CloseIcon sx={{ color: '#b39ddb' }} />
              </IconButton>
            </Box>
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle2" sx={{ color: '#b39ddb', fontWeight: 500 }}>
                {`שאלה ${step + 1} מתוך ${questions.length}`}
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ minHeight: 120, maxHeight: 320 }}>
            <Typography sx={{ mb: 2 }}>{questions[step].label}</Typography>
            {questions[step].type === 'radio' ? (
              <RadioGroup
                value={answers[questions[step].key] || ''}
                onChange={e => handleChange(questions[step].key, e.target.value)}
              >
                {questions[step].options.map(opt => (
                  <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                ))}
              </RadioGroup>
            ) : questions[step].type === 'slider' ? (
              <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 2 }}>
                <Typography>1</Typography>
                <Slider
                  min={questions[step].min}
                  max={questions[step].max}
                  step={1}
                  value={answers[questions[step].key] || 3}
                  onChange={(_, v) => handleChange(questions[step].key, v)}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ flex: 1 }}
                />
                <Typography>5</Typography>
              </Stack>
            ) : (
              <TextField
                autoFocus
                fullWidth
                multiline={!!questions[step].multiline}
                minRows={questions[step].multiline ? 2 : 1}
                placeholder={questions[step].placeholder}
                value={answers[questions[step].key] || ''}
                onChange={e => handleChange(questions[step].key, e.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBack}>{step === 0 ? 'אולי בפעם אחרת' : 'הקודם'}</Button>
            <Button onClick={handleNext} variant="contained">{step === questions.length - 1 ? 'סיים' : 'הבא'}</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>ההצעה שלי עבורך</span>
              <IconButton onClick={handleClose} size="small" sx={{ ml: 1 }}>
                <CloseIcon sx={{ color: '#b39ddb' }} />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" sx={{ mb: 1 }}>{suggestion.name}</Typography>
            <Typography sx={{ mb: 1 }}>{suggestion.desc}</Typography>
            <Typography><b>פורמט:</b> {suggestion.format}</Typography>
            <Typography><b>אורך:</b> {suggestion.length}</Typography>
            <Typography><b>משתתפות:</b> {suggestion.participants}</Typography>
            <Typography><b>מה צריך:</b> {suggestion.needs}</Typography>
            <Typography sx={{ mt: 1, fontStyle: 'italic', color: '#b39ddb' }}>{suggestion.tip}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setShowSuggestion(false); setAnswers({}); setStep(0); }}>תציעי לי סדנה אחרת</Button>
            <Button variant="contained" onClick={() => onSuggestWorkshop(suggestion)}>בא לי להעביר את זה!</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
} 