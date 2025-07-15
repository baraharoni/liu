import React, { useState } from 'react';
import {
    Box, Typography, Button, Container, Paper, TextField, FormControl, InputLabel, Select, MenuItem,
    Stepper, Step, StepLabel, RadioGroup, FormControlLabel, Radio, Chip, Stack, Checkbox, Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import liuLogo from './assets/logonew.jpeg';
import liaddorImg from './assets/liaddor.jpg';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import img111 from './assets/111.png';
import img222 from './assets/222.png';
import img333 from './assets/333.png';
import img444 from './assets/444.png';
import img555 from './assets/555.png';

const mainColor = "#b39ddb";
const accentColor = "#d4c1ec";

// טקסטים לשתי שפות
const texts = {
    he: {
        // מסכי אונבורדינג
        welcome: "ברוכות הבאות ל-LIU",
        welcomeSubtitle: "המקום שלך ליצור ולהשתתף בסדנאות",
        createWorkshops: "יצירת סדנאות",
        createSubtitle: "שתפי את הידע שלך עם אמהות אחרות",
        joinWorkshops: "השתתפות בסדנאות",
        joinSubtitle: "למדי מאמהות אחרות וצברי ניסיון",
        community: "קהילה תומכת",
        communitySubtitle: "בני קשרים חדשים עם אמהות כמוך",
        letsStart: "בואי נתחיל!",
        startSubtitle: "הצטרפי לקהילה שלנו",

        // הרשמה
        registration: "הרשמה ראשונית",
        personalInfo: "פרטים אישיים",
        name: "שם מלא",
        age: "גיל",
        children: "מספר ילדים",
        location: "אזור מגורים",
        interests: "תחומי עניין",
        experience: "ניסיון",
        beginner: "מתחילה",
        intermediate: "מתקדמת",
        expert: "מומחית",
        next: "הבא",
        back: "חזור",
        finish: "סיימי",
        skip: "דלגי",

        // תחומי עניין
        babies: "תינוקות",
        toddlers: "פעוטות",
        preschoolers: "גיל הרך",
        schoolAge: "גיל בית ספר",
        teens: "נוער",
        cooking: "בישול",
        art: "יצירה",
        fitness: "כושר",
        yoga: "יוגה",
        parenting: "הורות",
        education: "חינוך",
        business: "עסקים",
        health: "בריאות",
        spirituality: "רוחניות"
    },
    en: {
        welcome: "Welcome to LIU",
        welcomeSubtitle: "Your place to create and participate in workshops",
        createWorkshops: "Create Workshops",
        createSubtitle: "Share your knowledge with other mothers",
        joinWorkshops: "Join Workshops",
        joinSubtitle: "Learn from other mothers and gain experience",
        community: "Supportive Community",
        communitySubtitle: "Build new connections with mothers like you",
        letsStart: "Let's Start!",
        startSubtitle: "Join our community",

        registration: "Initial Registration",
        personalInfo: "Personal Information",
        name: "Full Name",
        age: "Age",
        children: "Number of Children",
        location: "Residence Area",
        interests: "Areas of Interest",
        experience: "Experience Level",
        beginner: "Beginner",
        intermediate: "Intermediate",
        expert: "Expert",
        next: "Next",
        back: "Back",
        finish: "Finish",
        skip: "Skip",

        babies: "Babies",
        toddlers: "Toddlers",
        preschoolers: "Preschoolers",
        schoolAge: "School Age",
        teens: "Teens",
        cooking: "Cooking",
        art: "Art",
        fitness: "Fitness",
        yoga: "Yoga",
        parenting: "Parenting",
        education: "Education",
        business: "Business",
        health: "Health",
        spirituality: "Spirituality"
    }
};

const onboardingSteps = [
    {
        title: 'welcome',
        subtitle: 'welcomeSubtitle',
        image: img111
    },
    {
        title: 'createWorkshops',
        subtitle: 'createSubtitle',
        image: img222
    },
    {
        title: 'joinWorkshops',
        subtitle: 'joinSubtitle',
        image: img333
    },
    {
        title: 'community',
        subtitle: 'communitySubtitle',
        image: img444
    },
    {
        title: 'letsStart',
        subtitle: 'startSubtitle',
        image: img555
    }
];

const interestOptions = [
    'babies', 'toddlers', 'preschoolers', 'schoolAge', 'teens',
    'cooking', 'art', 'fitness', 'yoga', 'parenting', 'education',
    'business', 'health', 'spirituality'
];

// מסך התחברות חברתית
function SocialAuthScreen({ onEmailSignUp, onSocialSuccess, onSkip }) {
    return (
        <Container maxWidth="sm" sx={{ bgcolor: "#faf7f2", minHeight: "100vh", py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <img src={liuLogo} alt="LIU Logo" style={{ height: 40, marginBottom: 8 }} />
                <Typography variant="h5" sx={{ color: mainColor, fontWeight: 700, mb: 2, fontSize: '1.3rem' }}>
                    התחברות או הרשמה
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <Button variant="outlined" sx={{ bgcolor: '#fff', color: '#444', borderColor: '#ccc' }} startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: 20 }} />} onClick={onSocialSuccess}>
                    התחברי עם Google
                </Button>
                <Button variant="outlined" sx={{ bgcolor: '#fff', color: '#1877f3', borderColor: '#ccc' }} startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" style={{ width: 20 }} />} onClick={onSocialSuccess}>
                    התחברי עם Facebook
                </Button>
            </Box>
            <Typography sx={{ textAlign: 'center', mb: 2, color: '#888' }}>או</Typography>
            <Button variant="contained" color="primary" fullWidth onClick={onEmailSignUp}>
                הרשמה עם מייל וסיסמה
            </Button>
            <Button variant="outlined" color="primary" fullWidth onClick={onSkip} sx={{ mt: 2 }}>
                דלגי
            </Button>
        </Container>
    );
}

// מסך פתיחה (Splash)
function SplashScreen({ onStart }) {
    return (
        <Container maxWidth="sm" sx={{ bgcolor: "#faf7f2", minHeight: "100vh", py: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={liuLogo} alt="LIU Logo" style={{ height: 64, marginBottom: 16 }} />
            <Typography variant="h4" sx={{ color: mainColor, fontWeight: 700, mb: 1, fontSize: '2rem', textAlign: 'center' }}>
                LIU
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#666', mb: 4, fontSize: '1.1rem', textAlign: 'center' }}>
                הבית לאמהות
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 3, px: 5, fontSize: '1.1rem' }} onClick={onStart}>
                התחילי
            </Button>
        </Container>
    );
}

export default function OnboardingScreen() {
    const [lang] = useState('he');
    const [currentStep, setCurrentStep] = useState(0);
    const [showRegistration, setShowRegistration] = useState(false);
    const [registrationStep, setRegistrationStep] = useState(0);
    const navigate = useNavigate();
    // 1. Set showSocialAuth to false by default
    const [showSocialAuth, setShowSocialAuth] = useState(false);
    // 1. הסר את SplashScreen ואת כל השימושים ב-showSplash
    // 2. ודא שה-onboarding מתחיל ישר מהמסך הראשון (onboardingSteps)

    // נתוני הרשמה
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthDateUser: '',
        children: '',
        city: '',
        street: '',
        status: '',
        pregnancyWeekDay: '',
        birthDate: '',
        experience: 'beginner',
        interests: [],
        termsAccepted: false,
        profileImage: null
    });

    const dir = lang === 'he' ? 'rtl' : 'ltr';

    // עדכן את handleNext כך שאחרי המסך האחרון של האון-בורדינג תוצג SocialAuthScreen
    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowSocialAuth(true);
            // 2. ודא שה-onboarding מתחיל ישר מהמסך הראשון (onboardingSteps)
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // 2. Update handleSkip to only show SocialAuthScreen
    const handleSkip = () => {
        setShowSocialAuth(true);
        // 2. ודא שה-onboarding מתחיל ישר מהמסך הראשון (onboardingSteps)
    };

    const handleRegistrationNext = () => {
        if (registrationStep < 2) {
            setRegistrationStep(registrationStep + 1);
        } else {
            // שמירת הנתונים והמעבר לאפליקציה
            localStorage.setItem('onboardingCompleted', 'true');
            localStorage.setItem('userData', JSON.stringify(formData));
            navigate('/');
        }
    };

    const handleRegistrationBack = () => {
        if (registrationStep > 0) {
            setRegistrationStep(registrationStep - 1);
        } else {
            setShowRegistration(false);
        }
    };

    const handleInterestToggle = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 1. Center onboarding images and button, and ensure skip is always visible
    // 2. After onboarding, show SocialAuthScreen with Facebook/Google buttons
    // 3. If user skips, set guestMode in localStorage and navigate home
    // 4. Add guestMode logic to registration and onboarding

    // --- עריכה עיקרית: ---
    // 1. Center onboarding button even if no back button
    // במקום תנאי showSplash, פשוט המשך ל-onboarding
    const step = onboardingSteps[currentStep];
    if (showRegistration) {
        return (
            <Container maxWidth="sm" sx={{ bgcolor: "#faf7f2", minHeight: "100vh", py: 1 }} dir={dir}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <img src={liuLogo} alt="LIU Logo" style={{ height: 40, marginBottom: 8 }} />
                    <Typography variant="h5" sx={{ color: mainColor, fontWeight: 700, mb: 1, fontSize: '1.3rem' }}>
                        {texts[lang].registration}
                    </Typography>
                </Box>
                <Stepper activeStep={registrationStep} sx={{ mb: 2 }} size="small">
                    <Step><StepLabel>{texts[lang].personalInfo}</StepLabel></Step>
                    <Step><StepLabel>{texts[lang].interests}</StepLabel></Step>
                    <Step><StepLabel>{texts[lang].experience}</StepLabel></Step>
                </Stepper>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                    {registrationStep === 0 && (
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: mainColor, mb: 1, textAlign: 'right', fontSize: '1.1rem' }}>
                                {texts[lang].personalInfo}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                                <Avatar src={formData.profileImage} sx={{ width: 64, height: 64, mb: 1 }} />
                                <Button variant="outlined" component="label" startIcon={<PhotoCamera />} size="small">
                                    העלי תמונת פרופיל
                                    <input type="file" accept="image/*" hidden onChange={e => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = ev => handleInputChange('profileImage', ev.target.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }} />
                                </Button>
                            </Box>
                            <TextField
                                fullWidth
                                label={texts[lang].name}
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                sx={{ mb: 1, textAlign: 'right' }}
                                inputProps={{ style: { textAlign: 'right', fontSize: '0.95rem', height: 32, padding: 6 } }}
                                InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                            />
                            <TextField
                                fullWidth
                                label={"אימייל"}
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                sx={{ mb: 1 }}
                                inputProps={{ style: { textAlign: 'right', fontSize: '0.95rem', height: 32, padding: 6 } }}
                                InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                            />
                            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                <TextField
                                    fullWidth
                                    label="תאריך הלידה שלך (האמא)"
                                    placeholder="למשל 15/07/1990"
                                    value={formData.birthDateUser}
                                    onChange={e => handleInputChange('birthDateUser', e.target.value)}
                                    sx={{ mb: 1 }}
                                    inputProps={{ style: { textAlign: 'right', fontSize: '0.95rem', height: 32, padding: 6 } }}
                                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                                />
                                <TextField
                                    fullWidth
                                    label={texts[lang].children}
                                    type="number"
                                    value={formData.children}
                                    onChange={(e) => handleInputChange('children', e.target.value)}
                                    sx={{ flex: 1 }}
                                    inputProps={{ style: { textAlign: 'right', fontSize: '0.95rem', height: 32, padding: 6 } }}
                                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                                />
                            </Stack>
                            <TextField
                                fullWidth
                                label="עיר מגורים"
                                placeholder="למשל תל אביב"
                                value={formData.city}
                                onChange={e => handleInputChange('city', e.target.value)}
                                sx={{ mb: 1 }}
                                inputProps={{ style: { textAlign: 'right', fontSize: '0.95rem', height: 32, padding: 6 } }}
                                InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                            />
                            <TextField
                                fullWidth
                                label="רחוב"
                                placeholder="למשל דיזנגוף"
                                value={formData.street}
                                onChange={e => handleInputChange('street', e.target.value)}
                                sx={{ mb: 1 }}
                                inputProps={{ style: { textAlign: 'right', fontSize: '0.95rem', height: 32, padding: 6 } }}
                                InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                            />
                            <FormControl component="fieldset" sx={{ width: '100%', mb: 1 }}>
                                <RadioGroup
                                    value={formData.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                    row
                                >
                                    <FormControlLabel value="pregnant" control={<Radio size="small" />} label={<span style={{ fontSize: '0.95rem' }}>בהריון</span>} />
                                    <FormControlLabel value="maternity" control={<Radio size="small" />} label={<span style={{ fontSize: '0.95rem' }}>בחופשת לידה</span>} />
                                    <FormControlLabel value="none" control={<Radio size="small" />} label={<span style={{ fontSize: '0.95rem' }}>לא זה ולא זה</span>} />
                                </RadioGroup>
                            </FormControl>
                            {formData.status === 'pregnant' && (
                                <TextField
                                    fullWidth
                                    label="שבוע ויום ההריון"
                                    placeholder="למשל 32/4"
                                    value={formData.pregnancyWeekDay}
                                    onChange={e => handleInputChange('pregnancyWeekDay', e.target.value)}
                                    sx={{ mb: 1 }}
                                    inputProps={{ style: { textAlign: 'right', fontSize: '0.95rem', height: 32, padding: 6 } }}
                                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                                />
                            )}
                            {formData.status === 'maternity' && (
                                <TextField
                                    fullWidth
                                    label="תאריך הלידה של התינוק/ת"
                                    placeholder="למשל 15/07/2024"
                                    value={formData.birthDate}
                                    onChange={e => handleInputChange('birthDate', e.target.value)}
                                    sx={{ mb: 1 }}
                                    inputProps={{ style: { textAlign: 'right', fontSize: '0.95rem', height: 32, padding: 6 } }}
                                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                                />
                            )}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.termsAccepted}
                                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={
                                    <span style={{ fontSize: '0.95rem' }}>
                                        אני מאשרת שקראתי ואני מסכימה ל
                                        <a href='/terms' target='_blank' rel='noopener noreferrer'>תקנון האתר</a>
                                    </span>
                                }
                                sx={{ mb: 1, mt: 0, alignItems: 'flex-start' }}
                            />
                        </Box>
                    )}
                    {registrationStep === 1 && (
                        <Box>
                            <Typography variant="h6" sx={{ color: mainColor, mb: 3, textAlign: 'right' }}>
                                {texts[lang].interests}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, textAlign: 'right', color: '#666' }}>
                                בחרי את תחומי העניין שלך (אפשר לבחור כמה)
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                {interestOptions.map((interest) => (
                                    <Chip
                                        key={interest}
                                        label={texts[lang][interest]}
                                        onClick={() => handleInterestToggle(interest)}
                                        color={formData.interests.includes(interest) ? "primary" : "default"}
                                        sx={{ mb: 1 }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}
                    {registrationStep === 2 && (
                        <Box>
                            <Typography variant="h6" sx={{ color: mainColor, mb: 3, textAlign: 'right' }}>
                                {texts[lang].experience}
                            </Typography>
                            <FormControl component="fieldset" sx={{ width: '100%' }}>
                                <RadioGroup
                                    value={formData.experience}
                                    onChange={(e) => handleInputChange('experience', e.target.value)}
                                >
                                    <FormControlLabel
                                        value="beginner"
                                        control={<Radio />}
                                        label={texts[lang].beginner}
                                        sx={{ textAlign: 'right' }}
                                    />
                                    <FormControlLabel
                                        value="intermediate"
                                        control={<Radio />}
                                        label={texts[lang].intermediate}
                                        sx={{ textAlign: 'right' }}
                                    />
                                    <FormControlLabel
                                        value="expert"
                                        control={<Radio />}
                                        label={texts[lang].expert}
                                        sx={{ textAlign: 'right' }}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            onClick={handleRegistrationBack}
                            variant="outlined"
                            sx={{ color: mainColor, borderColor: mainColor, fontSize: '0.95rem', minWidth: 70, py: 0.5, px: 1 }}
                        >
                            {texts[lang].back}
                        </Button>
                        <Button
                            onClick={handleRegistrationNext}
                            variant="contained"
                            sx={{ bgcolor: mainColor, fontSize: '0.95rem', minWidth: 70, py: 0.5, px: 1 }}
                            disabled={
                                registrationStep === 0 && (
                                    !formData.termsAccepted ||
                                    (formData.status === 'pregnant' && !formData.pregnancyWeekDay) ||
                                    (formData.status === 'maternity' && !formData.birthDate)
                                )
                            }
                        >
                            {registrationStep === 2 ? texts[lang].finish : texts[lang].next}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }
    if (showSocialAuth) {
        return <SocialAuthScreen 
            onEmailSignUp={() => setShowSocialAuth(false)} 
            onSocialSuccess={() => {
                setShowSocialAuth(false);
                setShowRegistration(true);
            }} 
            onSkip={() => {
                localStorage.setItem('onboardingCompleted', 'true');
                localStorage.setItem('guestMode', 'true');
                navigate('/');
            }} 
        />;
    }
    return (
        <Container maxWidth="sm" disableGutters sx={{ minHeight: '100vh', bgcolor: '#faf7f2', p: 0 }}>
            <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                    <img src={step.image} alt="onboarding" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
                </Box>
                <Box sx={{ position: 'relative', zIndex: 2, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                        {onboardingSteps.map((_, idx) => (
                            <Box key={idx} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: idx === currentStep ? mainColor : '#fff', opacity: idx === currentStep ? 1 : 0.5, border: '1.5px solid #fff' }} />
                        ))}
                    </Box>
                    {/* העלה את הטקסטים מעט למעלה */}
                    <Box sx={{ mb: 2, mt: { xs: 2, sm: 4 } }}>
                        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 1, textShadow: '0 2px 8px #0006', textAlign: 'center' }}>
                            {texts[lang][step.title]}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2, fontSize: '1.1rem', textAlign: 'center', textShadow: '0 1px 6px #0007' }}>
                            {texts[lang][step.subtitle]}
                        </Typography>
                    </Box>
                    {/* כפתור הבא ממורכז לבד במסך הראשון */}
                    <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: currentStep === 0 ? 'center' : 'center', mb: 2 }}>
                        {currentStep !== 0 && (
                            <Button onClick={handleBack} variant="outlined" sx={{ color: '#fff', borderColor: '#fff', minWidth: 80, fontWeight: 500 }}>חזור</Button>
                        )}
                        <Button onClick={handleNext} variant="contained" sx={{ bgcolor: mainColor, minWidth: 80, fontWeight: 500 }}>{currentStep === onboardingSteps.length - 1 ? 'המשיכי' : 'הבא'}</Button>
                    </Box>
                    <Button onClick={handleSkip} variant="text" sx={{ color: '#fff', opacity: 0.8, fontSize: '1rem' }}>דלגי</Button>
                </Box>
            </Box>
        </Container>
    );
} 