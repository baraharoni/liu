import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Box, Typography, Button, Chip } from '@mui/material';
import { availableWorkshops } from './workshopData';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { MamaCoinsIcon } from './App';
import { useNavigate } from 'react-router-dom';

const mainColor = '#b39ddb';
const containerStyle = {
  width: '100%',
  height: '70vh',
  borderRadius: 16,
  overflow: 'hidden',
};

// מרכז תל אביב
const center = { lat: 32.0853, lng: 34.7818 };

// מיפוי קטגוריה לאימוג'י
const categoryEmojis = {
  babies: '👶',
  art: '🎨',
  movement: '💃',
  cooking: '👨‍🍳',
  yoga: '🧘‍♀️',
};

export default function WorkshopMap() {
  // יש להחליף את המפתח למפתח שלך!
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAkopZrq9BxgqBQW2KnxzYK0Ecoa-8lr14';

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleRegister = useCallback((workshop) => {
    // כאן אפשר להפעיל לוגיקה של הרשמה או מעבר לעמוד סדנה
    alert(`נרשמת לסדנה: ${workshop.title.he}`);
  }, []);

  if (!isLoaded) return <Box sx={{ p: 4, textAlign: 'center' }}>טוען מפה...</Box>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'greedy',
        styles: [
          { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        ],
      }}
    >
      {availableWorkshops.map((ws) => (
        <Marker
          key={ws.id}
          position={ws.coordinates}
          onClick={() => setSelected(ws)}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
            scaledSize: { width: 40, height: 40 },
          }}
        />
      ))}
      {selected && (
        <InfoWindow
          position={selected.coordinates}
          onCloseClick={() => setSelected(null)}
        >
          <Box
            sx={{ minWidth: 220, maxWidth: 260, p: 1, borderRadius: 2, boxShadow: 2, bgcolor: '#fff', cursor: 'pointer' }}
            onClick={() => navigate(`/workshop/${selected.id}`)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <img
                src={selected.image}
                alt={selected.title.he}
                style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', marginLeft: 8 }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: mainColor }}>
                  {selected.title.he}
                </Typography>
                <Chip
                  label={categoryEmojis[selected.category] + ' ' + selected.category}
                  size="small"
                  sx={{ bgcolor: mainColor, color: '#fff', fontWeight: 600, mt: 0.5 }}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: 18, color: mainColor }} />
              <Typography variant="body2">{selected.date} • {selected.time}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {selected.location.he}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <MamaCoinsIcon size={18} color={mainColor} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: mainColor }}>
                {selected.price} Mama Coins
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: mainColor, fontWeight: 700, borderRadius: 2 }}
              onClick={(e) => { e.stopPropagation(); handleRegister(selected); }}
            >
              הרשמה
            </Button>
          </Box>
        </InfoWindow>
      )}
    </GoogleMap>
  );
} 