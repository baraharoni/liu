import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function RegistrationAgreementDialog({ open, onClose, onConfirm }) {
    const [checks, setChecks] = useState([false, false, false, false]);
    const agreementTexts = [
        'אני מבינה שההשתתפות בסדנה היא באחריותי האישית.',
        'אם יש לי או לתינוק/ת מצב רפואי מיוחד – אעדכן את מנחת הסדנה מראש.',
        'אני מתחייבת לשמור על פרטיות וכבוד שאר האמהות בקבוצה.',
        'קראתי ואני מסכימה לתקנון ולמדיניות הפרטיות של האפליקציה.'
    ];
    const allChecked = checks.every(Boolean);

    useEffect(() => {
        if (!open) setChecks([false, false, false, false]);
    }, [open]);

    const handleCheck = idx => (e) => {
        const newChecks = [...checks];
        newChecks[idx] = e.target.checked;
        setChecks(newChecks);
    };

    const handleClose = () => {
        setChecks([false, false, false, false]);
        onClose();
    };

    const handleConfirm = () => {
        setChecks([false, false, false, false]);
        onConfirm();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ textAlign: 'right', fontWeight: 700 }}>אישור לפני הרשמה</DialogTitle>
            <DialogContent sx={{ direction: 'rtl', textAlign: 'right' }}>
                {agreementTexts.map((txt, i) => (
                    <FormControlLabel
                        key={i}
                        control={<Checkbox checked={checks[i]} onChange={handleCheck(i)} sx={{ ml: 1 }} />}
                        label={<span style={{ fontSize: '1rem' }}>{txt}</span>}
                        sx={{ display: 'block', textAlign: 'right', mb: 1, justifyContent: 'flex-end', mr: 0 }}
                        labelPlacement="start"
                    />
                ))}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
                <Button variant="contained" onClick={handleConfirm} disabled={!allChecked}>
                    אני מאשרת
                </Button>
            </DialogActions>
        </Dialog>
    );
} 