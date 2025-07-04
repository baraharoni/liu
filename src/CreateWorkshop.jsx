import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack, MenuItem, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HelpWizardDialog from './HelpWizardDialog';

const mainColor = "#b39ddb";
const accentColor = "#d4c1ec";

const texts = {
  he: {
    title: "יצירת סדנה חדשה",
    name: "שם הסדנה",
    desc: "תיאור הסדנה",
    date: "תאריך",
    time: "שעה",
    location: "מיקום",
    price: "מחיר ב-Mama Coins",
    image: "קישור לתמונה (אופציונלי)",
    submit: "צור סדנה",
    required: "שדה חובה",
    cancel: "ביטול"
  },
  en: {
    title: "Create New Workshop",
    name: "Workshop Name",
    desc: "Description",
    date: "Date",
    time: "Time",
    location: "Location",
    price: "Price (Mama Coins)",
    image: "Image URL (optional)",
    submit: "Create Workshop",
    required: "Required",
    cancel: "Cancel"
  }
};

export default function CreateWorkshop({ myWorkshops, setMyWorkshops, prefill }) {
  const [lang, setLang] = useState('he');
  const [fields, setFields] = useState({
    name: '',
    desc: '',
    date: '',
    time: '',
    location: '',
    price: '',
    image: ''
  });
  useEffect(() => {
    if (prefill) {
      setFields(f => ({
        ...f,
        name: prefill.name || '',
        desc: prefill.desc || '',
        date: prefill.date || '',
        time: prefill.time || '',
        location: prefill.location || '',
        price: prefill.price || ''
      }));
    }
  }, [prefill]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = useState(false);

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validate = () => {
    const newErrors = {};
    if (!fields.name) newErrors.name = texts[lang].required;
    if (!fields.desc) newErrors.desc = texts[lang].required;
    if (!fields.date) newErrors.date = texts[lang].required;
    if (!fields.time) newErrors.time = texts[lang].required;
    if (!fields.location) newErrors.location = texts[lang].required;
    if (!fields.price || isNaN(fields.price)) newErrors.price = texts[lang].required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    let imageUrl = imagePreview;
    if (!imageUrl) {
      imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';
    }
    const newWorkshop = {
      id: Date.now(),
      title: { he: fields.name, en: fields.name },
      desc: { he: fields.desc, en: fields.desc },
      date: fields.date,
      time: fields.time,
      location: { he: fields.location, en: fields.location },
      price: Number(fields.price),
      image: imageUrl,
      participants: []
    };
    setMyWorkshops([newWorkshop, ...myWorkshops]);
    navigate('/');
  };

  return (
    <Box sx={{ bgcolor: "#faf7f2", minHeight: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper sx={{ p: 4, borderRadius: 3, minWidth: 340, maxWidth: 400, boxShadow: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ color: mainColor, fontWeight: 700 }}>{texts[lang].title}</Typography>
          <Button size="small" onClick={() => setLang(lang === 'he' ? 'en' : 'he')}>{lang === 'he' ? 'English' : 'עברית'}</Button>
        </Stack>
        <Button variant="outlined" sx={{ mb: 2, color: mainColor, borderColor: mainColor }} onClick={() => setHelpOpen(true)}>
          צריכה עזרה ברעיון לסדנה?
        </Button>
        <HelpWizardDialog
          open={helpOpen}
          onClose={() => setHelpOpen(false)}
          onSuggestWorkshop={suggestion => {
            setHelpOpen(false);
            setFields(f => ({
              ...f,
              name: suggestion.name || '',
              desc: suggestion.desc || '',
              location: suggestion.format || '',
              price: '',
              date: '',
              time: ''
            }));
          }}
        />
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label={texts[lang].name}
            name="name"
            value={fields.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label={texts[lang].desc}
            name="desc"
            value={fields.desc}
            onChange={handleChange}
            error={!!errors.desc}
            helperText={errors.desc}
            fullWidth
            multiline
            minRows={2}
            sx={{ mb: 2 }}
            required
          />
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              label={texts[lang].date}
              name="date"
              type="date"
              value={fields.date}
              onChange={handleChange}
              error={!!errors.date}
              helperText={errors.date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <TextField
              label={texts[lang].time}
              name="time"
              type="time"
              value={fields.time}
              onChange={handleChange}
              error={!!errors.time}
              helperText={errors.time}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Stack>
          <TextField
            label={texts[lang].location}
            name="location"
            value={fields.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label={texts[lang].price}
            name="price"
            value={fields.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            fullWidth
            sx={{ mb: 2 }}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">💰</InputAdornment>,
              inputProps: { min: 0, inputMode: 'numeric', pattern: '[0-9]*' }
            }}
          />
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{ mb: 2, p: 2, border: '2px dashed #b39ddb', borderRadius: 2, textAlign: 'center', bgcolor: '#f5f3fa', cursor: 'pointer' }}
            onClick={() => fileInputRef.current.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="preview" style={{ maxWidth: '100%', maxHeight: 120, marginBottom: 8, borderRadius: 8 }} />
            ) : (
              <Typography sx={{ color: '#888' }}>{lang === 'he' ? 'גרור תמונה לכאן או לחץ לבחירה' : 'Drag & drop an image here or click to select'}</Typography>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" sx={{ bgcolor: mainColor, fontWeight: 600 }} fullWidth>{texts[lang].submit}</Button>
            <Button variant="outlined" sx={{ color: mainColor, borderColor: mainColor }} fullWidth onClick={() => navigate('/')}>{texts[lang].cancel}</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
} 