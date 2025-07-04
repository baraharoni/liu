// דמו של סדנאות עסקיות - Updated: 2025-01-01 13:00
export const initialMyWorkshops = [
  {
    id: 1,
    title: { he: "סדנת עיסוי תינוקות", en: "Baby Massage Workshop" },
    desc: { he: "לומדת להרגיע ולחזק את הקשר עם התינוקת/תינוק.", en: "Learn to relax and bond with your baby." },
    date: "10.7.2025",
    time: "10:00",
    location: { he: "סטודיו אמאמא, תל אביב", en: "Mama Studio, Tel Aviv" },
    price: 70,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
    ],
    participants: [
      { id: 1, name: { he: "נועה כהן", en: "Noa Cohen" }, avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
      { id: 2, name: { he: "דנה לוי", en: "Dana Levi" }, avatar: "https://randomuser.me/api/portraits/women/66.jpg" }
    ]
  },
  {
    id: 2,
    title: { he: "סדנת יצירה לאמהות וילדים", en: "Moms & Kids Art Workshop" },
    desc: { he: "יצירה חווייתית עם הילדים, חומרים טבעיים.", en: "Fun art with kids, natural materials." },
    date: "20.7.2025",
    time: "17:00",
    location: { he: "מרכז קהילתי, רמת גן", en: "Community Center, Ramat Gan" },
    price: 50,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
    ],
    participants: [
      { id: 3, name: { he: "רוני ישראלי", en: "Roni Israeli" }, avatar: "https://randomuser.me/api/portraits/women/67.jpg" },
      { id: 4, name: { he: "שירי בר", en: "Shiri Bar" }, avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
    ]
  }
];

// דמו של סדנאות שהשתתפתי בהן (6 סדנאות)
export const attendedWorkshops = [
  {
    id: 3,
    title: { he: "סדנת יוגה לאמהות", en: "Yoga for Moms" },
    desc: { he: "שחרור מתחים וחיזוק הגוף אחרי לידה.", en: "Release tension and strengthen after birth." },
    date: "1.6.2025",
    time: "09:00",
    location: { he: "סטודיו יוגה, תל אביב", en: "Yoga Studio, Tel Aviv" },
    price: 40,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    status: "עבר"
  },
  {
    id: 4,
    title: { he: "סדנת בישול בריא", en: "Healthy Cooking Workshop" },
    desc: { he: "מתכונים קלים ובריאים לכל המשפחה.", en: "Easy, healthy recipes for the family." },
    date: "5.6.2025",
    time: "18:00",
    location: { he: "מרכז קהילתי, חולון", en: "Community Center, Holon" },
    price: 60,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    status: "עבר"
  },
  {
    id: 5,
    title: { he: "סדנת תנועה לאמהות", en: "Movement for Moms" },
    desc: { he: "פעילות תנועה משותפת לאמהות.", en: "Movement activity for moms." },
    date: "10.5.2025",
    time: "11:00",
    location: { he: "סטודיו תנועה, פתח תקווה", en: "Movement Studio, Petah Tikva" },
    price: 55,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    status: "עבר"
  },
  {
    id: 6,
    title: { he: "סדנת עיסוי תינוקות", en: "Baby Massage Workshop" },
    desc: { he: "לומדת להרגיע ולחזק את הקשר עם התינוקת/תינוק.", en: "Learn to relax and bond with your baby." },
    date: "15.4.2025",
    time: "10:00",
    location: { he: "סטודיו אמאמא, תל אביב", en: "Mama Studio, Tel Aviv" },
    price: 70,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    status: "עבר"
  },
  {
    id: 7,
    title: { he: "סדנת יצירה לאמהות וילדים", en: "Moms & Kids Art Workshop" },
    desc: { he: "יצירה חווייתית עם הילדים, חומרים טבעיים.", en: "Fun art with kids, natural materials." },
    date: "20.3.2025",
    time: "17:00",
    location: { he: "מרכז קהילתי, רמת גן", en: "Community Center, Ramat Gan" },
    price: 50,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    status: "עבר"
  },
  {
    id: 8,
    title: { he: "סדנת בישול טבעוני", en: "Vegan Cooking Workshop" },
    desc: { he: "בישול טבעוני לכל המשפחה.", en: "Vegan cooking for the whole family." },
    date: "1.3.2025",
    time: "18:00",
    location: { he: "מרכז קהילתי, חולון", en: "Community Center, Holon" },
    price: 60,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    status: "עבר"
  }
];

// דמו של סדנאות עתידיות
export const futureWorkshops = [
  {
    id: 9,
    title: { he: "סדנת תנועה לאמהות ותינוקות", en: "Movement for Moms & Babies" },
    desc: { he: "פעילות תנועה משותפת, חיזוק קשר אם-ילדה.", en: "Movement activity for mom and baby." },
    date: "15.8.2025",
    time: "11:00",
    location: { he: "סטודיו תנועה, פתח תקווה", en: "Movement Studio, Petah Tikva" },
    price: 55,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    status: "עתידי"
  }
];

// דמו של פעילויות עתידיות שנרשמתי אליהן
export const myUpcomingActivities = [
  {
    id: 10,
    title: { he: "סדנת עיסוי תינוקות", en: "Baby Massage Workshop" },
    desc: { he: "לומדת להרגיע ולחזק את הקשר עם התינוקת/תינוק.", en: "Learn to relax and bond with your baby." },
    date: "10.7.2025",
    time: "10:00",
    location: { he: "סטודיו אמאמא, תל אביב", en: "Mama Studio, Tel Aviv" },
    price: 70,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    status: "נרשמתי",
    category: { he: "תינוקות", en: "Babies" }
  },
  {
    id: 11,
    title: { he: "סדנת יצירה לאמהות וילדים", en: "Moms & Kids Art Workshop" },
    desc: { he: "יצירה חווייתית עם הילדים, חומרים טבעיים.", en: "Fun art with kids, natural materials." },
    date: "20.7.2025",
    time: "17:00",
    location: { he: "מרכז קהילתי, רמת גן", en: "Community Center, Ramat Gan" },
    price: 50,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    status: "נרשמתי",
    category: { he: "יצירה", en: "Art" }
  },
  {
    id: 12,
    title: { he: "סדנת תנועה לאמהות ותינוקות", en: "Movement for Moms & Babies" },
    desc: { he: "פעילות תנועה משותפת, חיזוק קשר אם-ילדה.", en: "Movement activity for mom and baby." },
    date: "15.8.2025",
    time: "11:00",
    location: { he: "סטודיו תנועה, פתח תקווה", en: "Movement Studio, Petah Tikva" },
    price: 55,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    status: "נרשמתי",
    category: { he: "תנועה", en: "Movement" }
  }
];

// דמו של סדנאות זמינות
export const availableWorkshops = [
  {
    id: 20,
    title: { he: "סדנת עיסוי תינוקות", en: "Baby Massage Workshop" },
    desc: { he: "לומדת להרגיע ולחזק את הקשר עם התינוקת/תינוק.", en: "Learn to relax and bond with your baby." },
    date: "10.7.2025",
    time: "10:00",
    location: { he: "סטודיו אמאמא, תל אביב", en: "Mama Studio, Tel Aviv" },
    price: 70,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
    ],
    category: "babies",
    coordinates: { lat: 32.0853, lng: 34.7818 },
    host: { he: "שרה כהן", en: "Sarah Cohen" },
    participants: 8,
    maxParticipants: 12
  },
  {
    id: 21,
    title: { he: "סדנת יצירה לאמהות וילדים", en: "Moms & Kids Art Workshop" },
    desc: { he: "יצירה חווייתית עם הילדים, חומרים טבעיים.", en: "Fun art with kids, natural materials." },
    date: "20.7.2025",
    time: "17:00",
    location: { he: "מרכז קהילתי, רמת גן", en: "Community Center, Ramat Gan" },
    price: 50,
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    category: "art",
    coordinates: { lat: 32.0684, lng: 34.8248 },
    host: { he: "דנה לוי", en: "Dana Levi" },
    participants: 10,
    maxParticipants: 15
  },
  {
    id: 22,
    title: { he: "סדנת יוגה לאמהות", en: "Yoga for Moms" },
    desc: { he: "שחרור מתחים וחיזוק הגוף אחרי לידה.", en: "Release tension and strengthen after birth." },
    date: "25.7.2025",
    time: "09:00",
    location: { he: "סטודיו יוגה, תל אביב", en: "Yoga Studio, Tel Aviv" },
    price: 40,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    category: "yoga",
    coordinates: { lat: 32.0961, lng: 34.7748 },
    host: { he: "רוני ישראלי", en: "Roni Israeli" },
    participants: 8,
    maxParticipants: 10
  },
  {
    id: 23,
    title: { he: "סדנת בישול בריא", en: "Healthy Cooking Workshop" },
    desc: { he: "מתכונים קלים ובריאים לכל המשפחה.", en: "Easy, healthy recipes for the family." },
    date: "5.8.2025",
    time: "18:00",
    location: { he: "מרכז קהילתי, חולון", en: "Community Center, Holon" },
    price: 60,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    category: "cooking",
    coordinates: { lat: 32.0114, lng: 34.7748 },
    host: { he: "שירי בר", en: "Shiri Bar" },
    participants: 12,
    maxParticipants: 15
  },
  {
    id: 24,
    title: { he: "סדנת תנועה לאמהות", en: "Movement for Moms" },
    desc: { he: "פעילות תנועה משותפת לאמהות.", en: "Movement activity for moms." },
    date: "10.8.2025",
    time: "11:00",
    location: { he: "סטודיו תנועה, פתח תקווה", en: "Movement Studio, Petah Tikva" },
    price: 55,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "movement",
    coordinates: { lat: 32.0912, lng: 34.8866 },
    host: { he: "נועה כהן", en: "Noa Cohen" },
    participants: 6,
    maxParticipants: 10
  }
];

// עדכון תמונות לסדנאות קיימות
availableWorkshops[0].image = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"; // עיסוי תינוקות
availableWorkshops[1].image = "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"; // יצירה
availableWorkshops[2].image = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"; // יוגה
availableWorkshops[3].image = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"; // בישול
availableWorkshops[4].image = "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"; // תנועה

// הוספת 10 סדנאות חדשות
availableWorkshops.push(
  {
    id: 25,
    title: { he: "מעגל אמהות", en: "Mothers' Circle" },
    desc: { he: "מפגש תמיכה ושיתוף לאמהות טריות.", en: "Support and sharing circle for new moms." },
    date: "12.8.2025",
    time: "10:30",
    location: { he: "מרכז קהילתי, תל אביב", en: "Community Center, Tel Aviv" },
    price: 30,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    category: "parenting",
    coordinates: { lat: 32.0855, lng: 34.7822 },
    host: { he: "אורית לוי", en: "Orit Levi" },
    participants: 7,
    maxParticipants: 15
  },
  {
    id: 26,
    title: { he: "הרצאת שינה לתינוקות", en: "Baby Sleep Lecture" },
    desc: { he: "כלים לשיפור שינת התינוקות וההורים.", en: "Tools for improving baby and parent sleep." },
    date: "15.8.2025",
    time: "19:00",
    location: { he: "ספריה עירונית, תל אביב", en: "City Library, Tel Aviv" },
    price: 40,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    category: "babies",
    coordinates: { lat: 32.0872, lng: 34.7891 },
    host: { he: "מיכל בר" },
    participants: 12,
    maxParticipants: 30
  },
  {
    id: 27,
    title: { he: "סדנת מוזיקה לאמהות ותינוקות", en: "Music for Moms & Babies" },
    desc: { he: "חוויה מוזיקלית משותפת לאמהות ותינוקות.", en: "Musical experience for moms and babies." },
    date: "18.8.2025",
    time: "11:00",
    location: { he: "סטודיו למוזיקה, תל אביב", en: "Music Studio, Tel Aviv" },
    price: 45,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    category: "babies",
    coordinates: { lat: 32.0901, lng: 34.7812 },
    host: { he: "דנה רוזן", en: "Dana Rosen" },
    participants: 10,
    maxParticipants: 18
  },
  {
    id: 28,
    title: { he: "סדנת העצמה נשית", en: "Women's Empowerment" },
    desc: { he: "כלים להעצמה אישית לאמהות.", en: "Personal empowerment tools for mothers." },
    date: "20.8.2025",
    time: "20:00",
    location: { he: "מרכז העצמה, תל אביב", en: "Empowerment Center, Tel Aviv" },
    price: 60,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    category: "parenting",
    coordinates: { lat: 32.0833, lng: 34.7799 },
    host: { he: "גלית כהן", en: "Galit Cohen" },
    participants: 15,
    maxParticipants: 25
  },
  {
    id: 29,
    title: { he: "סדנת ספורט לאמהות", en: "Fitness for Moms" },
    desc: { he: "אימון כושר קבוצתי לאמהות.", en: "Group fitness for moms." },
    date: "22.8.2025",
    time: "09:00",
    location: { he: "פארק הירקון, תל אביב", en: "Yarkon Park, Tel Aviv" },
    price: 35,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    category: "movement",
    coordinates: { lat: 32.0951, lng: 34.8122 },
    host: { he: "ליאת בן דוד", en: "Liat Ben David" },
    participants: 9,
    maxParticipants: 20
  },
  {
    id: 30,
    title: { he: "סדנת בישול לאמהות", en: "Cooking for Moms" },
    desc: { he: "בישול בריא ומהיר לאמהות עסוקות.", en: "Healthy and quick cooking for busy moms." },
    date: "25.8.2025",
    time: "18:30",
    location: { he: "מרכז קהילתי, תל אביב", en: "Community Center, Tel Aviv" },
    price: 55,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    category: "cooking",
    coordinates: { lat: 32.0847, lng: 34.7829 },
    host: { he: "אנה קפלן", en: "Anna Kaplan" },
    participants: 11,
    maxParticipants: 16
  },
  {
    id: 31,
    title: { he: "סדנת יוגה בפארק", en: "Yoga in the Park" },
    desc: { he: "שיעור יוגה פתוח לאמהות בפארק.", en: "Open yoga class for moms in the park." },
    date: "28.8.2025",
    time: "08:00",
    location: { he: "פארק דרום, תל אביב", en: "South Park, Tel Aviv" },
    price: 30,
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80",
    category: "yoga",
    coordinates: { lat: 32.0522, lng: 34.7654 },
    host: { he: "מיכל ישראלי", en: "Michal Israeli" },
    participants: 13,
    maxParticipants: 20
  },
  {
    id: 32,
    title: { he: "סדנת יצירה לאמהות", en: "Moms' Art Workshop" },
    desc: { he: "יצירה אישית לאמהות – ציור, פיסול ועוד.", en: "Personal art for moms – painting, sculpture, more." },
    date: "30.8.2025",
    time: "19:00",
    location: { he: "סטודיו לאמנות, תל אביב", en: "Art Studio, Tel Aviv" },
    price: 50,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    category: "art",
    coordinates: { lat: 32.0701, lng: 34.7833 },
    host: { he: "רוני ישראלי", en: "Roni Israeli" },
    participants: 8,
    maxParticipants: 14
  },
  {
    id: 33,
    title: { he: "סדנת תנועה לאמהות ותינוקות", en: "Movement for Moms & Babies" },
    desc: { he: "פעילות תנועה חווייתית לאמהות ותינוקות.", en: "Fun movement for moms and babies." },
    date: "2.9.2025",
    time: "10:00",
    location: { he: "סטודיו תנועה, תל אביב", en: "Movement Studio, Tel Aviv" },
    price: 40,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    category: "movement",
    coordinates: { lat: 32.0867, lng: 34.7899 },
    host: { he: "דנה לוי", en: "Dana Levi" },
    participants: 10,
    maxParticipants: 18
  },
  {
    id: 34,
    title: { he: "סדנת הרצאה להורות מודעת", en: "Conscious Parenting Lecture" },
    desc: { he: "הרצאה על הורות מודעת וכלים מעשיים.", en: "Lecture on conscious parenting and practical tools." },
    date: "5.9.2025",
    time: "20:00",
    location: { he: "ספריה עירונית, תל אביב", en: "City Library, Tel Aviv" },
    price: 35,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    category: "parenting",
    coordinates: { lat: 32.0877, lng: 34.7801 },
    host: { he: "אורית לוי", en: "Orit Levi" },
    participants: 14,
    maxParticipants: 30
  }
); 