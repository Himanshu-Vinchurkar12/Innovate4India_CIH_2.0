
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr';

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Auth
    welcomeBack: 'Welcome Back!',
    signInToDashboard: 'Sign in to access your personalized wellness dashboard.',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    dontHaveAccount: "Don't have an account?",
    signUp: 'Sign up',
    createYourAccount: 'Create Your Account',
    joinHealthFriend: 'Join HealthFriend today for personalized wellness.',
    fullName: 'Full Name',
    age: 'Age',
    optionalHealthData: 'Optional Health Data',
    bloodPressure: 'Blood Pressure (e.g., 120/80)',
    bloodSugar: 'Blood Sugar (e.g., 90 mg/dL)',
    allergies: 'Allergies',
    existingConditions: 'Existing Conditions',
    uploadMedicalDataOptional: 'Upload Medical Data (Optional)',
    alreadyHaveAccount: 'Already have an account?',
    logIn: 'Log in',
    footerText: '© {year} HealthFriend. Your health, our priority.',

    // Dashboard Layout
    home: 'Home',
    healthVideos: 'Health Videos',
    wearables: 'Wearables',
    wellnessJournal: 'Wellness Journal',
    stressAI: 'Stress AI',
    findDoctors: 'Find Doctors',
    profile: 'Profile',
    myAccount: 'My Account',
    settings: 'Settings',
    logout: 'Logout',
    language: 'Language',
    theme: 'Theme',
    
    // Dashboard Home
    welcome: 'Welcome',
    user: 'User',
    welcomeDescription: "Here's your health snapshot and personalized insights for today.",
    todaysMealTip: "Today's Meal Tip",
    mealTipDescription: 'Discover healthy and delicious meal ideas. This salmon recipe is great for heart health.',
    lifestyleHack: 'Lifestyle Hack',
    lifestyleHackDescription: 'Improve sleep quality with these simple sleep hygiene tips.',
    trackYourVitals: 'Track Your Vitals',
    trackVitalsDescription: 'Connect your wearables to monitor your health in real-time.',
    learnMore: 'Learn More →',
    activityOverview: 'Your Activity Overview',
    activityOverviewDescription: 'A quick look at your (mocked) recent activity levels.',
    stepsToday: 'Steps Today',
    restingHeartRate: 'Resting Heart Rate',
    sleepLastNight: 'Sleep Last Night',
    importantReminder: 'Important Reminder',
    reminderText: 'This app provides suggestions and tracks data for informational purposes only. Always consult with a healthcare professional for medical advice and treatment. Mock data is used for demonstration.',

    // Videos Page
    videoLibraryTitle: 'Health Video Library',
    videoLibraryDescription: 'Explore curated videos to support your health and wellness journey.',
    filterByCondition: 'Filter by condition',
    allConditions: 'All Conditions',
    noVideosFound: 'No Videos Found',
    noVideosFoundDescription: 'Sorry, no videos match your selected filter. Try a different condition.',
    watchVideo: 'Watch Video →',
    videoPlayer: 'Video Player',

    // Devices Page
    wearableDevicesTitle: 'Wearable Devices',
    wearableDevicesDescription: 'Monitor your real-time health data from connected wearables.',
    disconnectDevice: 'Disconnect Device',
    connectDevice: 'Connect Device',
    addNewDevice: 'Add New Device',
    connectNewWearable: 'Connect New Wearable',
    scanDescription: 'Scan for nearby Bluetooth or Wi-Fi enabled wearables. Ensure your device is in pairing mode.',
    scanForDevices: 'Scan for Devices',
    scanning: 'Scanning for devices...',
    scanComplete: 'Scan Complete',
    discoveredDevices: 'Discovered Devices:',
    pairing: 'Pairing...',
    paired: 'Paired',
    pair: 'Pair',
    scanAgain: 'Scan Again',
    noDevicesFoundHelp: 'If no devices are found, ensure your wearable is powered on, nearby, and in pairing mode.',
    close: 'Close',
    deviceDisconnected: 'Device Disconnected',
    noRealTimeData: 'No real-time data is being received. Please connect a wearable device to see live updates.',
    heartRate: 'Heart Rate',
    sleepLastNightMetric: 'Sleep Last Night', // Renamed to avoid conflict with dashboard home
    deviceConnectionStatus: 'Device Connection Status',
    connectedTo: 'Connected to:',
    noDeviceConnected: 'No device connected. Please pair a device to sync live data.',
    simulationNote: 'Note: This is a simulation. No actual Bluetooth/Wi-Fi connection is established. In a real app, this data would be synced with a secure backend like Firebase.',
    
    // Doctors Page
    findDoctorsTitle: 'Find Nearby Doctors',
    showingDoctorsNear: 'Showing doctors near "{location}". Use "My Location" or search for more accuracy.',
    showingDoctorsCurrentLocation: 'Showing doctors near your current location (Lat: {lat}, Lon: {lon}). Distances are illustrative.',
    locationDenied: 'Location access denied. Showing doctors based on manual input: "{location}". Grant permission for local results.',
    gettingLocation: 'Attempting to get your current location...',
    searchLocation: 'Search Location',
    doctorSpecialty: 'Doctor Specialty',
    selectSpecialtyPlaceholder: 'Select a specialty',
    useMyLocation: 'Use My Location',
    locationActive: 'Location Active',
    searchDoctors: 'Search Doctors',
    doctorMap: 'Google Map Simulated',
    noDoctorsFound: 'No Doctors Found',
    viewProfile: 'View Profile',
    usingLocation: 'Using your current location. Doctor distances are mock data.',
    locationDeniedMessage: 'Location denied. Search by manual location entry or enable location access.',
    accessingLocation: 'Accessing location...',
    mapCentered: 'Map centered on your location (simulated)',
    enterLocation: 'Enter a location or click "Use My Location".',
    loadingMap: 'Loading map with current location...',
    aboutDoctor: 'About Dr. {name}',
    officeHours: 'Office Hours',
    contact: 'Contact Information',
    bookAppointment: 'Book Appointment',
    
    // Journal Page
    journalTitle: 'Wellness Journal & AI Tips',
    journalDescription: 'Get personalized food and lifestyle suggestions powered by AI.',
    yourInformation: 'Your Information',
    yourInformationDescription: 'Provide your health details for personalized tips.',
    healthConditions: 'Health Conditions',
    uploadMedicalData: 'Upload Medical Data',
    clickToUpload: 'Click to upload',
    generateTips: 'Generate Tips',
    foodSuggestion: 'Personalized Food Suggestion',
    lifestyleSuggestion: 'Personalized Lifestyle Suggestion',
    generateNewTips: 'Generate New Tips',
    tipsPlaceholderTitle: 'Your AI Wellness Tips Will Appear Here',
    tipsPlaceholderDescription: 'Fill in your health conditions and upload relevant medical data to receive personalized food and lifestyle suggestions tailored just for you.',
    
    // Profile Page
    myProfile: 'My Profile',
    myProfileDescription: 'View and manage your personal information and health data.',
    editProfile: 'Edit Profile',
    appTheme: 'App Theme',
    dataPrivacy: 'Data Privacy:',
    dataPrivacyDescription: 'Your health data is sensitive. We are committed to protecting it. This app uses mock data and local storage for demonstration.',
    editYourInformation: 'Edit Your Information',
    healthPersonalDetails: 'Health & Personal Details',
    profilePicture: 'Profile Picture',
    healthData: 'Health Data',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',

    // Stress AI Page
    stressDashboardTitle: 'AI Stress Dashboard',
    stressDashboardDescription: 'Analyze your stress by combining your mood, activity, and real-time biometric data.',
    yourCurrentState: 'Your Current State',
    yourCurrentStateDescription: "Tell us how you're feeling right now.",
    currentMood: 'Current Mood',
    recentActivity: 'Recent Activity',
    analyzeMyStress: 'Analyze My Stress',
    liveBiometrics: 'Live Biometrics (Simulated)',
    liveBiometricsDescription: 'Data from your connected devices.',
    stressAnalysisResults: 'Your Stress Analysis Results',
    currentStressLevel: 'Current Stress Level',
    doctorsOpinion: "Doctor's Opinion",
    doctorOpinionDescription: 'Based on our analysis, we recommend a consultation.',
    aiPoweredSuggestions: 'AI-Powered Suggestions',
    personalizedTipsDescription: 'Here are some personalized tips for you.',
    yourAIStressAnalysis: 'Your AI Stress Analysis',
    yourAIStressAnalysisDescription: 'Select your mood and activity, then click "Analyze My Stress" to get personalized insights and recommendations.',

    // Feedback Page
    feedback: 'Feedback',
    feedbackTitle: 'Submit Your Feedback',
    feedbackDescription: "We value your opinion. Help us improve HealthFriend.",
    shareYourThoughts: 'Share Your Thoughts',
    yourFeedbackIsImportant: "Your feedback is important for us to improve your experience.",
    accuracyRating: "How accurate are our suggestions?",
    ratingPoor: 'Poor',
    ratingAverage: 'Average',
    ratingGood: 'Good',
    ratingVeryGood: 'Very Good',
    ratingExcellent: 'Excellent',
    improvementSuggestions: "What can we improve?",
    improvementPlaceholder: "Tell us what we can do better...",
    submitFeedback: "Submit Feedback",
    feedbackSubmitted: "Feedback Submitted!",
    thankYouForFeedback: "Thank you for helping us improve!",
  },
  hi: {
    // Auth
    welcomeBack: 'वापस स्वागत है!',
    signInToDashboard: 'अपने व्यक्तिगत कल्याण डैशबोर्ड तक पहुंचने के लिए साइन इन करें।',
    email: 'ईमेल',
    password: 'पासवर्ड',
    login: 'लॉग इन करें',
    dontHaveAccount: 'खाता नहीं है?',
    signUp: 'साइन अप करें',
    createYourAccount: 'अपना खाता बनाएं',
    joinHealthFriend: 'व्यक्तिगत कल्याण के लिए आज ही हेल्थफ्रेंड से जुड़ें।',
    fullName: 'पूरा नाम',
    age: 'आयु',
    optionalHealthData: 'वैकल्पिक स्वास्थ्य डेटा',
    bloodPressure: 'रक्तचाप (उदा. 120/80)',
    bloodSugar: 'रक्त शर्करा (उदा. 90 mg/dL)',
    allergies: 'एलर्जी',
    existingConditions: 'मौजूदा स्थितियाँ',
    uploadMedicalDataOptional: 'मेडिकल डेटा अपलोड करें (वैकल्पिक)',
    alreadyHaveAccount: 'पहले से ही एक खाता है?',
    logIn: 'लॉग इन करें',
    footerText: '© {year} हेल्थफ्रेंड। आपका स्वास्थ्य, हमारी प्राथमिकता।',

    // Dashboard Layout
    home: 'होम',
    healthVideos: 'स्वास्थ्य वीडियो',
    wearables: 'पहनने योग्य',
    wellnessJournal: 'वेलनेस जर्नल',
    stressAI: 'स्ट्रेस AI',
    findDoctors: 'डॉक्टर खोजें',
    profile: 'प्रोफ़ाइल',
    myAccount: 'मेरा खाता',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    language: 'भाषा',
    theme: 'थीम',
    
    // Dashboard Home
    welcome: 'स्वागत है',
    user: 'उपयोगकर्ता',
    welcomeDescription: 'यहां आज के लिए आपका स्वास्थ्य स्नैपशॉट और व्यक्तिगत अंतर्दृष्टि है।',
    todaysMealTip: "आज का भोजन टिप",
    mealTipDescription: 'स्वस्थ और स्वादिष्ट भोजन विचारों की खोज करें। यह सैल्मन रेसिपी हृदय स्वास्थ्य के लिए बहुत अच्छी है।',
    lifestyleHack: 'लाइफस्टाइल हैक',
    lifestyleHackDescription: 'इन सरल नींद स्वच्छता युक्तियों के साथ नींद की गुणवत्ता में सुधार करें।',
    trackYourVitals: 'अपने विटल्स को ट्रैक करें',
    trackVitalsDescription: 'वास्तविक समय में अपने स्वास्थ्य की निगरानी के लिए अपने पहनने योग्य उपकरणों को कनेक्ट करें।',
    learnMore: 'और जानें →',
    activityOverview: 'आपकी गतिविधि का अवलोकन',
    activityOverviewDescription: 'आपकी (नकली) हाल की गतिविधि स्तरों पर एक त्वरित नज़र।',
    stepsToday: 'आज के कदम',
    restingHeartRate: 'दिल की धड़कन',
    sleepLastNight: 'कल रात की नींद',
    importantReminder: 'महत्वपूर्ण अनुस्मारक',
    reminderText: 'यह ऐप केवल सूचनात्मक उद्देश्यों के लिए सुझाव और डेटा ट्रैक करता है। चिकित्सा सलाह और उपचार के लिए हमेशा एक स्वास्थ्य पेशेवर से परामर्श करें। प्रदर्शन के लिए मॉक डेटा का उपयोग किया जाता है।',

    // Videos Page
    videoLibraryTitle: 'स्वास्थ्य वीडियो लाइब्रेरी',
    videoLibraryDescription: 'आपके स्वास्थ्य और कल्याण यात्रा का समर्थन करने के लिए क्यूरेट किए गए वीडियो देखें।',
    filterByCondition: 'स्थिति के अनुसार फ़िल्टर करें',
    allConditions: 'सभी स्थितियाँ',
    noVideosFound: 'कोई वीडियो नहीं मिला',
    noVideosFoundDescription: 'क्षमा करें, आपके चयनित फ़िल्टर से कोई वीडियो मेल नहीं खाता। एक अलग स्थिति का प्रयास करें।',
    watchVideo: 'वीडियो देखें →',
    videoPlayer: 'वीडियो प्लेयर',

    // Devices Page
    wearableDevicesTitle: 'पहनने योग्य उपकरण',
    wearableDevicesDescription: 'कनेक्टेड वियरेबल्स से अपने रियल-टाइम स्वास्थ्य डेटा की निगरानी करें।',
    disconnectDevice: 'डिवाइस डिस्कनेक्ट करें',
    connectDevice: 'डिवाइस कनेक्ट करें',
    addNewDevice: 'नया डिवाइस जोड़ें',
    connectNewWearable: 'नया वेयरेबल कनेक्ट करें',
    scanDescription: 'आस-पास के ब्लूटूथ या वाई-फाई सक्षम वेयरेबल्स के लिए स्कैन करें। सुनिश्चित करें कि आपका डिवाइस पेयरिंग मोड में है।',
    scanForDevices: 'डिवाइसों के लिए स्कैन करें',
    scanning: 'डिवाइसों के लिए स्कैन हो रहा है...',
    scanComplete: 'स्कैन पूरा हुआ',
    discoveredDevices: 'खोजे गए डिवाइस:',
    pairing: 'पेयर हो रहा है...',
    paired: 'पेयर किया गया',
    pair: 'पेयर करें',
    scanAgain: 'फिर से स्कैन करें',
    noDevicesFoundHelp: 'यदि कोई डिवाइस नहीं मिलता है, तो सुनिश्चित करें कि आपका वेयरेबल चालू है, पास में है, और पेयरिंग मोड में है।',
    close: 'बंद करें',
    deviceDisconnected: 'डिवाइस डिस्कनेक्ट हो गया',
    noRealTimeData: 'कोई रियल-टाइम डेटा प्राप्त नहीं हो रहा है। लाइव अपडेट देखने के लिए कृपया एक वेयरेबल डिवाइस कनेक्ट करें।',
    heartRate: 'हृदय गति',
    sleepLastNightMetric: 'पिछली रात की नींद',
    deviceConnectionStatus: 'डिवाइस कनेक्शन स्थिति',
    connectedTo: 'इससे जुड़ा है:',
    noDeviceConnected: 'कोई डिवाइस कनेक्ट नहीं है। लाइव डेटा सिंक करने के लिए कृपया एक डिवाइस पेयर करें।',
    simulationNote: 'नोट: यह एक सिमुलेशन है। कोई वास्तविक ब्लूटूथ/वाई-फाई कनेक्शन स्थापित नहीं है। एक वास्तविक ऐप में, यह डेटा फायरबेस जैसे सुरक्षित बैकएंड के साथ सिंक किया जाएगा।',

    // Doctors Page
    findDoctorsTitle: 'आस-पास के डॉक्टर खोजें',
    showingDoctorsNear: '"{location}" के पास के डॉक्टर दिखा रहा है। अधिक सटीकता के लिए "मेरा स्थान" का उपयोग करें या खोजें।',
    showingDoctorsCurrentLocation: 'आपके वर्तमान स्थान के पास डॉक्टर दिखा रहा है (अक्षांश: {lat}, देशांतर: {lon})। दूरियां उदाहरण के लिए हैं।',
    locationDenied: 'स्थान की अनुमति अस्वीकार कर दी गई है। मैनुअल इनपुट के आधार पर डॉक्टर दिखा रहा है: "{location}"। स्थानीय परिणामों के लिए अनुमति दें।',
    gettingLocation: 'आपका वर्तमान स्थान प्राप्त करने का प्रयास किया जा रहा है...',
    searchLocation: 'स्थान खोजें',
    doctorSpecialty: 'डॉक्टर विशेषज्ञता',
    selectSpecialtyPlaceholder: 'एक विशेषज्ञता चुनें',
    useMyLocation: 'मेरा स्थान उपयोग करें',
    locationActive: 'स्थान सक्रिय',
    searchDoctors: 'डॉक्टर खोजें',
    doctorMap: 'गूगल मैप सिम्युलेटेड',
    noDoctorsFound: 'कोई डॉक्टर नहीं मिला',
    viewProfile: 'प्रोफ़ाइल देखें',
    usingLocation: 'आपके वर्तमान स्थान का उपयोग कर रहा है। डॉक्टर की दूरियां मॉक डेटा हैं।',
    locationDeniedMessage: 'स्थान अस्वीकृत। मैनुअल स्थान प्रविष्टि द्वारा खोजें या स्थान पहुंच सक्षम करें।',
    accessingLocation: 'स्थान तक पहुंच रहा है...',
    mapCentered: 'नक्शा आपके स्थान पर केंद्रित है (नकली)',
    enterLocation: 'एक स्थान दर्ज करें या "मेरा स्थान उपयोग करें" पर क्लिक करें।',
    loadingMap: 'वर्तमान स्थान के साथ नक्शा लोड हो रहा है...',
    aboutDoctor: 'डॉ. {name} के बारे में',
    officeHours: 'कार्यालय का समय',
    contact: 'संपर्क जानकारी',
    bookAppointment: 'अपॉइंटमेंट बुक करें',

    // Journal Page
    journalTitle: 'वेलनेस जर्नल और AI टिप्स',
    journalDescription: 'AI द्वारा संचालित व्यक्तिगत भोजन और जीवन शैली के सुझाव प्राप्त करें।',
    yourInformation: 'आपकी जानकारी',
    yourInformationDescription: 'व्यक्तिगत सुझावों के लिए अपने स्वास्थ्य का विवरण प्रदान करें।',
    healthConditions: 'स्वास्थ्य की स्थिति',
    uploadMedicalData: 'मेडिकल डेटा अपलोड करें',
    clickToUpload: 'अपलोड करने के लिए क्लिक करें',
    generateTips: 'टिप्स उत्पन्न करें',
    foodSuggestion: 'व्यक्तिगत भोजन सुझाव',
    lifestyleSuggestion: 'व्यक्तिगत जीवनशैली सुझाव',
    generateNewTips: 'नए टिप्स उत्पन्न करें',
    tipsPlaceholderTitle: 'आपके AI वेलनेस टिप्स यहां दिखाई देंगे',
    tipsPlaceholderDescription: 'केवल आपके लिए तैयार किए गए व्यक्तिगत भोजन और जीवनशैली सुझाव प्राप्त करने के लिए अपनी स्वास्थ्य स्थितियों को भरें और प्रासंगिक मेडिकल डेटा अपलोड करें।',

    // Profile Page
    myProfile: 'मेरी प्रोफाइल',
    myProfileDescription: 'अपनी व्यक्तिगत जानकारी और स्वास्थ्य डेटा देखें और प्रबंधित करें।',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    appTheme: 'ऐप थीम',
    dataPrivacy: 'डेटा गोपनीयता:',
    dataPrivacyDescription: 'आपका स्वास्थ्य डेटा संवेदनशील है। हम इसे सुरक्षित रखने के लिए प्रतिबद्ध हैं। यह ऐप प्रदर्शन के लिए मॉक डेटा और स्थानीय भंडारण का उपयोग करता है।',
    editYourInformation: 'अपनी जानकारी संपादित करें',
    healthPersonalDetails: 'स्वास्थ्य और व्यक्तिगत विवरण',
    profilePicture: 'प्रोफ़ाइल चित्र',
    healthData: 'स्वास्थ्य डेटा',
    cancel: 'रद्द करें',
    saveChanges: 'बदलाव सहेजें',

    // Stress AI Page
    stressDashboardTitle: 'AI तनाव डैशबोर्ड',
    stressDashboardDescription: 'अपने मूड, गतिविधि और रीयल-टाइम बायोमेट्रिक डेटा को मिलाकर अपने तनाव का विश्लेषण करें।',
    yourCurrentState: 'आपकी वर्तमान स्थिति',
    yourCurrentStateDescription: 'हमें बताएं कि आप अभी कैसा महसूस कर रहे हैं।',
    currentMood: 'वर्तमान मूड',
    recentActivity: 'हाल की गतिविधि',
    analyzeMyStress: 'मेरे तनाव का विश्लेषण करें',
    liveBiometrics: 'लाइव बायोमेट्रिक्स (नकली)',
    liveBiometricsDescription: 'आपके कनेक्टेड डिवाइस से डेटा।',
    stressAnalysisResults: 'आपके तनाव विश्लेषण के परिणाम',
    currentStressLevel: 'वर्तमान तनाव स्तर',
    doctorsOpinion: 'डॉक्टर की राय',
    doctorOpinionDescription: 'हमारे विश्लेषण के आधार पर, हम एक परामर्श की सलाह देते हैं।',
    aiPoweredSuggestions: 'AI-संचालित सुझाव',
    personalizedTipsDescription: 'यहाँ आपके लिए कुछ व्यक्तिगत सुझाव दिए गए हैं।',
    yourAIStressAnalysis: 'आपका AI तनाव विश्लेषण',
    yourAIStressAnalysisDescription: 'व्यक्तिगत अंतर्दृष्टि और सिफारिशें प्राप्त करने के लिए अपना मूड और गतिविधि चुनें, फिर "मेरे तनाव का विश्लेषण करें" पर क्लिक करें।',

    // Feedback Page
    feedback: 'प्रतिक्रिया',
    feedbackTitle: 'अपनी प्रतिक्रिया सबमिट करें',
    feedbackDescription: "हम आपकी राय को महत्व देते हैं। हेल्थफ्रेंड को बेहतर बनाने में हमारी मदद करें।",
    shareYourThoughts: 'अपने विचार साझा करें',
    yourFeedbackIsImportant: "आपके अनुभव को बेहतर बनाने के लिए आपकी प्रतिक्रिया हमारे लिए महत्वपूर्ण है।",
    accuracyRating: "हमारे सुझाव कितने सटीक हैं?",
    ratingPoor: 'खराब',
    ratingAverage: 'औसत',
    ratingGood: 'अच्छा',
    ratingVeryGood: 'बहुत अच्छा',
    ratingExcellent: 'उत्कृष्ट',
    improvementSuggestions: "हम क्या सुधार सकते हैं?",
    improvementPlaceholder: "हमें बताएं कि हम क्या बेहतर कर सकते हैं...",
    submitFeedback: "प्रतिक्रिया सबमिट करें",
    feedbackSubmitted: "प्रतिक्रिया सबमिट की गई!",
    thankYouForFeedback: "हमें बेहतर बनाने में मदद करने के लिए धन्यवाद!",
  },
  mr: {
    // Auth
    welcomeBack: 'परत स्वागत आहे!',
    signInToDashboard: 'आपल्या वैयक्तिक आरोग्य डॅशबोर्डवर प्रवेश करण्यासाठी साइन इन करा.',
    email: 'ईमेल',
    password: 'पासवर्ड',
    login: 'लॉग इन करा',
    dontHaveAccount: 'खाते नाही?',
    signUp: 'साइन अप करा',
    createYourAccount: 'आपले खाते तयार करा',
    joinHealthFriend: 'वैयक्तिक आरोग्यासाठी आजच हेल्थफ्रेंडमध्ये सामील व्हा.',
    fullName: 'पूर्ण नाव',
    age: 'वय',
    optionalHealthData: 'ऐच्छिक आरोग्य डेटा',
    bloodPressure: 'रक्तदाब (उदा. 120/80)',
    bloodSugar: 'रक्त शर्करा (उदा. 90 mg/dL)',
    allergies: 'ऍलर्जी',
    existingConditions: 'विद्यमान परिस्थिती',
    uploadMedicalDataOptional: 'वैद्यकीय डेटा अपलोड करा (ऐच्छिक)',
    alreadyHaveAccount: 'आधीपासूनच खाते आहे?',
    logIn: 'लॉग इन करा',
    footerText: '© {year} हेल्थफ्रेंड. तुमचे आरोग्य, आमची प्राथमिकता.',

    // Dashboard Layout
    home: 'मुख्यपृष्ठ',
    healthVideos: 'आरोग्य व्हिडिओ',
    wearables: 'वेअरेबल्स',
    wellnessJournal: 'वेलनेस जर्नल',
    stressAI: 'तणाव AI',
    findDoctors: 'डॉक्टर शोधा',
    profile: 'प्रोफाइल',
    myAccount: 'माझे खाते',
    settings: 'सेटिंग्ज',
    logout: 'लॉग आउट',
    language: 'भाषा',
    theme: 'थीम',

    // Dashboard Home
    welcome: 'स्वागत आहे',
    user: 'वापरकर्ता',
    welcomeDescription: 'येथे आपले आजचे आरोग्य स्नॅपशॉट आणि वैयक्तिकृत अंतर्दृष्टी आहे.',
    todaysMealTip: "आजची जेवण टीप",
    mealTipDescription: 'निरोगी आणि स्वादिष्ट जेवणाच्या कल्पना शोधा. ही सॅल्मन रेसिपी हृदयाच्या आरोग्यासाठी उत्तम आहे.',
    lifestyleHack: 'जीवनशैली हॅक',
    lifestyleHackDescription: 'या सोप्या झोपेच्या स्वच्छतेच्या टिप्सने झोपेची गुणवत्ता सुधारा.',
    trackYourVitals: 'तुमचे विटल्स ट्रॅक करा',
    trackVitalsDescription: 'तुमच्या आरोग्यावर रिअल-टाइममध्ये लक्ष ठेवण्यासाठी तुमचे वेअरेबल्स कनेक्ट करा.',
    learnMore: 'अधिक जाणून घ्या →',
    activityOverview: 'तुमच्या कार्याचा आढावा',
    activityOverviewDescription: 'तुमच्या (मॉक) अलीकडील क्रियाकलाप पातळीवर एक द्रुत नजर.',
    stepsToday: 'आजची पाऊले',
    restingHeartRate: 'विश्रांती हृदय गती',
    sleepLastNight: 'काल रात्रीची झोप',
    importantReminder: 'महत्त्वाची आठवण',
    reminderText: 'हे ॲप केवळ माहितीच्या उद्देशाने सूचना आणि डेटा ट्रॅक करते. वैद्यकीय सल्ला आणि उपचारांसाठी नेहमी आरोग्यसेवा व्यावसायिकांचा सल्ला घ्या. प्रात्यक्षिकांसाठी मॉक डेटा वापरला जातो.',

    // Videos Page
    videoLibraryTitle: 'आरोग्य व्हिडिओ लायब्ररी',
    videoLibraryDescription: 'तुमच्या आरोग्य आणि निरोगीपणाच्या प्रवासाला पाठिंबा देण्यासाठी क्युरेट केलेले व्हिडिओ एक्सप्लोर करा.',
    filterByCondition: 'स्थितीनुसार फिल्टर करा',
    allConditions: 'सर्व परिस्थिती',
    noVideosFound: 'कोणतेही व्हिडिओ आढळले नाहीत',
    noVideosFoundDescription: 'क्षमस्व, तुमच्या निवडलेल्या फिल्टरशी जुळणारे कोणतेही व्हिडिओ नाहीत. वेगळी स्थिती वापरून पहा.',
    watchVideo: 'व्हिडिओ पहा →',
    videoPlayer: 'व्हिडिओ प्लेयर',

    // Devices Page
    wearableDevicesTitle: 'वेअरेबल उपकरणे',
    wearableDevicesDescription: 'कनेक्ट केलेल्या वेअरेबल्समधून तुमचा रिअल-टाइम आरोग्य डेटा मॉनिटर करा.',
    disconnectDevice: 'डिव्हाइस डिस्कनेक्ट करा',
    connectDevice: 'डिव्हाइस कनेक्ट करा',
    addNewDevice: 'नवीन डिव्हाइस जोडा',
    connectNewWearable: 'नवीन वेअरेबल कनेक्ट करा',
    scanDescription: 'जवळपासच्या ब्लूटूथ किंवा वाय-फाय सक्षम वेअरेबल्ससाठी स्कॅन करा. तुमचे डिव्हाइस पेअरिंग मोडमध्ये असल्याची खात्री करा.',
    scanForDevices: 'डिव्हाइसेससाठी स्कॅन करा',
    scanning: 'डिव्हाइसेससाठी स्कॅन करत आहे...',
    scanComplete: 'स्कॅन पूर्ण झाले',
    discoveredDevices: 'शोधलेली उपकरणे:',
    pairing: 'पेअरिंग...',
    paired: 'पेअर केले',
    pair: 'पेअर करा',
    scanAgain: 'पुन्हा स्कॅन करा',
    noDevicesFoundHelp: 'कोणतेही डिव्हाइस न आढळल्यास, तुमचे वेअरेबल चालू, जवळ आणि पेअरिंग मोडमध्ये असल्याची खात्री करा.',
    close: 'बंद करा',
    deviceDisconnected: 'डिव्हाइस डिस्कनेक्ट झाले',
    noRealTimeData: 'रिअल-टाइम डेटा प्राप्त होत नाहीये. लाइव्ह अपडेट्स पाहण्यासाठी कृपया वेअरेबल डिव्हाइस कनेक्ट करा.',
    heartRate: 'हृदय गती',
    sleepLastNightMetric: 'काल रात्रीची झोप',
    deviceConnectionStatus: 'डिव्हाइस कनेक्शन स्थिती',
    connectedTo: 'याशी कनेक्ट केलेले:',
    noDeviceConnected: 'कोणतेही डिव्हाइस कनेक्ट केलेले नाही. लाइव्ह डेटा सिंक करण्यासाठी कृपया डिव्हाइस पेअर करा.',
    simulationNote: 'टीप: हे एक सिम्युलेशन आहे. कोणतेही वास्तविक ब्लूटूथ/वाय-फाय कनेक्शन स्थापित केलेले नाही. एका वास्तविक ॲपमध्ये, हा डेटा फायरबेससारख्या सुरक्षित बॅकएंडसह सिंक केला जाईल.',

    // Doctors Page
    findDoctorsTitle: 'जवळपासचे डॉक्टर शोधा',
    showingDoctorsNear: '"{location}" जवळील डॉक्टर दाखवत आहे. अधिक अचूकतेसाठी "माझे स्थान" वापरा किंवा शोधा.',
    showingDoctorsCurrentLocation: 'तुमच्या वर्तमान स्थानाजवळील डॉक्टर दाखवत आहे (अक्षांश: {lat}, रेखांश: {lon}). अंतरे उदाहरणादाखल आहेत.',
    locationDenied: 'स्थान परवानगी नाकारली. मॅन्युअल इनपुटवर आधारित डॉक्टर दाखवत आहे: "{location}". स्थानिक परिणामांसाठी परवानगी द्या.',
    gettingLocation: 'तुमचे वर्तमान स्थान मिळवण्याचा प्रयत्न करत आहे...',
    searchLocation: 'स्थान शोधा',
    doctorSpecialty: 'डॉक्टर विशेषज्ञता',
    selectSpecialtyPlaceholder: 'एक विशेषज्ञता निवडा',
    useMyLocation: 'माझे स्थान वापरा',
    locationActive: 'स्थान सक्रिय',
    searchDoctors: 'डॉक्टर शोधा',
    doctorMap: 'गूगल नकाशा सिम्युलेटेड',
    noDoctorsFound: 'कोणतेही डॉक्टर आढळले नाहीत',
    viewProfile: 'प्रोफाइल पहा',
    usingLocation: 'तुमचे वर्तमान स्थान वापरत आहे. डॉक्टरांची अंतरे मॉक डेटा आहेत.',
    locationDeniedMessage: 'स्थान नाकारले. मॅन्युअल स्थान एंट्रीद्वारे शोधा किंवा स्थान प्रवेश सक्षम करा.',
    accessingLocation: 'स्थानावर प्रवेश करत आहे...',
    mapCentered: 'नकाशा तुमच्या स्थानावर केंद्रित आहे (सिम्युलेटेड)',
    enterLocation: 'एक स्थान प्रविष्ट करा किंवा "माझे स्थान वापरा" वर क्लिक करा.',
    loadingMap: 'वर्तमान स्थानासह नकाशा लोड करत आहे...',
    aboutDoctor: 'डॉ. {name} यांच्याबद्दल',
    officeHours: 'कार्यालयीन वेळ',
    contact: 'संपर्क माहिती',
    bookAppointment: 'अपॉइंटमेंट बुक करा',

    // Journal Page
    journalTitle: 'वेलनेस जर्नल आणि AI टिप्स',
    journalDescription: 'AI द्वारे समर्थित वैयक्तिकृत अन्न आणि जीवनशैली सूचना मिळवा.',
    yourInformation: 'तुमची माहिती',
    yourInformationDescription: 'वैयक्तिकृत टिप्ससाठी तुमच्या आरोग्याचे तपशील द्या.',
    healthConditions: 'आरोग्याच्या स्थिती',
    uploadMedicalData: 'वैद्यकीय डेटा अपलोड करा',
    clickToUpload: 'अपलोड करण्यासाठी क्लिक करा',
    generateTips: 'टिप्स तयार करा',
    foodSuggestion: 'वैयक्तिकृत अन्न सूचना',
    lifestyleSuggestion: 'वैयक्तिकृत जीवनशैली सूचना',
    generateNewTips: 'नवीन टिप्स तयार करा',
    tipsPlaceholderTitle: 'तुमच्या AI वेलनेस टिप्स येथे दिसतील',
    tipsPlaceholderDescription: 'तुमच्यासाठी तयार केलेल्या वैयक्तिकृत अन्न आणि जीवनशैली सूचना मिळविण्यासाठी तुमच्या आरोग्याच्या स्थिती भरा आणि संबंधित वैद्यकीय डेटा अपलोड करा.',

    // Profile Page
    myProfile: 'माझी प्रोफाइल',
    myProfileDescription: 'तुमची वैयक्तिक माहिती आणि आरोग्य डेटा पहा आणि व्यवस्थापित करा.',
    editProfile: 'प्रोफाइल संपादित करा',
    appTheme: 'ॲप थीम',
    dataPrivacy: 'डेटा गोपनीयता:',
    dataPrivacyDescription: 'तुमचा आरोग्य डेटा संवेदनशील आहे. आम्ही त्याचे संरक्षण करण्यास वचनबद्ध आहोत. हे ॲप प्रात्यक्षिकांसाठी मॉक डेटा आणि स्थानिक स्टोरेज वापरते.',
    editYourInformation: 'तुमची माहिती संपादित करा',
    healthPersonalDetails: 'आरोग्य आणि वैयक्तिक तपशील',
    profilePicture: 'प्रोफाइल चित्र',
    healthData: 'आरोग्य डेटा',
    cancel: 'रद्द करा',
    saveChanges: 'बदल जतन करा',

    // Stress AI Page
    stressDashboardTitle: 'AI तणाव डॅशबोर्ड',
    stressDashboardDescription: 'तुमचा मूड, क्रियाकलाप आणि रिअल-टाइम बायोमेट्रिक डेटा एकत्र करून तुमच्या तणावाचे विश्लेषण करा.',
    yourCurrentState: 'तुमची सद्यस्थिती',
    yourCurrentStateDescription: 'तुम्हाला आता कसे वाटते ते आम्हाला सांगा.',
    currentMood: 'सध्याचा मूड',
    recentActivity: 'अलीकडील क्रियाकलाप',
    analyzeMyStress: 'माझ्या तणावाचे विश्लेषण करा',
    liveBiometrics: 'लाइव्ह बायोमेट्रिक्स (सिम्युलेटेड)',
    liveBiometricsDescription: 'तुमच्या कनेक्ट केलेल्या डिव्हाइसेसमधून डेटा.',
    stressAnalysisResults: 'तुमच्या तणाव विश्लेषणाचे परिणाम',
    currentStressLevel: 'सध्याची तणाव पातळी',
    doctorsOpinion: 'डॉक्टरांचे मत',
    doctorOpinionDescription: 'आमच्या विश्लेषणाच्या आधारे, आम्ही सल्लामसलत करण्याची शिफारस करतो.',
    aiPoweredSuggestions: 'AI-समर्थित सूचना',
    personalizedTipsDescription: 'तुमच्यासाठी काही वैयक्तिकृत टिप्स येथे आहेत.',
    yourAIStressAnalysis: 'तुमचे AI तणाव विश्लेषण',
    yourAIStressAnalysisDescription: 'वैयक्तिकृत अंतर्दृष्टी आणि शिफारसी मिळविण्यासाठी तुमचा मूड आणि क्रियाकलाप निवडा, नंतर "माझ्या तणावाचे विश्लेषण करा" वर क्लिक करा.',

    // Feedback Page
    feedback: 'अभिप्राय',
    feedbackTitle: 'तुमचा अभिप्राय सबमिट करा',
    feedbackDescription: "आम्ही तुमच्या मताला महत्त्व देतो. हेल्थफ्रेंड सुधारण्यात आम्हाला मदत करा.",
    shareYourThoughts: 'तुमचे विचार सांगा',
    yourFeedbackIsImportant: "तुमचा अनुभव सुधारण्यासाठी तुमचा अभिप्राय आमच्यासाठी महत्त्वाचा आहे.",
    accuracyRating: "आमचे सल्ले किती अचूक आहेत?",
    ratingPoor: 'खराब',
    ratingAverage: 'सरासरी',
    ratingGood: 'चांगले',
    ratingVeryGood: 'खूप चांगले',
    ratingExcellent: 'उत्कृष्ट',
    improvementSuggestions: "आम्ही काय सुधारू शकतो?",
    improvementPlaceholder: "आम्ही काय चांगले करू शकतो ते आम्हाला सांगा...",
    submitFeedback: "अभिप्राय सबमिट करा",
    feedbackSubmitted: "अभिप्राय सबमिट केला!",
    thankYouForFeedback: "आम्हाला सुधारण्यास मदत केल्याबद्दल धन्यवाद!",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'healthfriend-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem(LANGUAGE_KEY) as Language | null;
      if (storedLang && ['en', 'hi', 'mr'].includes(storedLang)) {
        setLanguage(storedLang);
      }
    } catch (error) {
      console.error("Failed to parse language from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    try {
      localStorage.setItem(LANGUAGE_KEY, newLanguage);
    } catch (error) {
      console.error("Failed to save language to localStorage", error);
    }
  };
  
  const t = translations[language];
  const value = { language, setLanguage: handleSetLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {isLoaded ? children : null}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
