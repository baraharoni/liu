import React from 'react';
import { Box, Avatar, Typography, IconButton, Stack, Paper, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import liaddorImg from './assets/liaddor.jpg';

const user = {
  firstName: 'ליעד',
  lastName: 'דור',
  avatar: liaddorImg,
  age: 31,
  children: 2,
  location: 'תל אביב',
  profession: 'מדריכת הורים, מנחת סדנאות'
};

export default function UserProfileHeader({ onEdit }) {
  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: '#fff', borderRadius: 3, border: '1px solid #f0f0f0' }}>
      <Stack spacing={2}>
        {/* Header with avatar and edit button */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user.avatar}
              sx={{ 
                width: 80, 
                height: 80, 
                border: '3px solid #f0f0f0',
                boxShadow: 2
              }}
            />
            <IconButton
              size="small"
              sx={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                p: 0.5, 
                bgcolor: 'white', 
                boxShadow: 2,
                border: '2px solid #f0f0f0',
                '&:hover': { bgcolor: '#f8f8f8' }
              }}
              onClick={onEdit}
            >
              <EditIcon fontSize="small" sx={{ color: '#666' }} />
            </IconButton>
          </Box>
          
          <Box sx={{ textAlign: 'right', flexGrow: 1, pr: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
              שלום {user.firstName}!
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
        </Box>

        {/* User details chips */}
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            icon={<PersonIcon />} 
            label={`גיל: ${user.age} | אמא ל-${user.children}`} 
            variant="outlined" 
            sx={{ 
              borderColor: '#b39ddb', 
              color: '#666',
              fontSize: '0.875rem'
            }}
          />
          <Chip 
            icon={<LocationOnIcon />} 
            label={`אזור: ${user.location}`} 
            variant="outlined" 
            sx={{ 
              borderColor: '#b39ddb', 
              color: '#666',
              fontSize: '0.875rem'
            }}
          />
        </Stack>

        {/* Profession */}
        <Typography variant="body2" sx={{ color: '#666', textAlign: 'right', lineHeight: 1.5 }}>
          {user.profession}
        </Typography>
      </Stack>
    </Paper>
  );
} 