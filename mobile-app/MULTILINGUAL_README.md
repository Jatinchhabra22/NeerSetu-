# 🌐 NeerSetu Multilingual Support

## Overview
NeerSetu mobile app now supports multiple languages for the Northeast region of India, making it accessible to diverse communities with different linguistic backgrounds.

## Supported Languages

### 🇬🇧 English (en)
- **Native Name**: English
- **Direction**: LTR
- **Status**: Complete

### 🇮🇳 Hindi (hi)
- **Native Name**: हिन्दी
- **Direction**: LTR
- **Status**: Complete

### 🇮🇳 Assamese (as)
- **Native Name**: অসমীয়া
- **Direction**: LTR
- **Status**: Complete

### 🇮🇳 Bengali (bn)
- **Native Name**: বাংলা
- **Direction**: LTR
- **Status**: Complete

### 🇮🇳 Manipuri (mni)
- **Native Name**: মৈতৈলোন্
- **Direction**: LTR
- **Status**: Complete

### 🇮🇳 Mizo (miz)
- **Native Name**: Mizo ṭawng
- **Direction**: LTR
- **Status**: Complete

### 🇮🇳 Kokborok (kok)
- **Native Name**: ককবরক
- **Direction**: LTR
- **Status**: Complete

### 🇮🇳 Nepali (ne)
- **Native Name**: नेपाली
- **Direction**: LTR
- **Status**: Complete

## Features

### 🔄 Language Switching
- **Language Toggle Button**: Quick access to language selection
- **Language Selector Modal**: Full language selection interface
- **Persistent Storage**: Language preference saved across app sessions
- **Fallback Support**: Falls back to English if translation is missing

### 📱 User Interface
- **Dynamic Text**: All UI text updates based on selected language
- **Native Scripts**: Support for native scripts of regional languages
- **RTL Support**: Ready for right-to-left languages (future enhancement)
- **Cultural Adaptation**: Language-specific formatting and expressions

### 🎯 Translation Coverage
- **Common Elements**: Welcome, loading, error messages, buttons
- **Authentication**: Login, register, password management
- **Navigation**: Menu items, screen titles
- **Water Quality**: Technical terms, status indicators
- **Reports**: Report generation, download, sharing
- **Alerts**: Notification types, severity levels
- **Profile**: User information, settings
- **Dashboard**: Statistics, overview data
- **Error Handling**: Network, server, validation errors

## Technical Implementation

### 📁 File Structure
```
src/
├── config/
│   └── languages.js          # Language configuration
├── contexts/
│   └── LanguageContext.js    # Language context provider
├── components/
│   ├── LanguageSelector.js   # Language selection modal
│   └── LanguageToggle.js     # Quick language toggle
├── translations/
│   ├── en.json              # English translations
│   ├── hi.json              # Hindi translations
│   ├── as.json              # Assamese translations
│   ├── bn.json              # Bengali translations
│   ├── mni.json             # Manipuri translations
│   ├── miz.json             # Mizo translations
│   ├── kok.json             # Kokborok translations
│   └── ne.json              # Nepali translations
└── screens/
    ├── HomeScreen.js         # Multilingual home screen
    ├── SettingsScreen.js     # Multilingual settings
    └── LanguageTestScreen.js # Translation testing
```

### 🔧 Usage Examples

#### Using Translations in Components
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();
  
  return (
    <Text>{t('common.welcome')}</Text>
  );
};
```

#### Language Switching
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const LanguageButton = () => {
  const { changeLanguage, getCurrentLanguageInfo } = useLanguage();
  const currentLang = getCurrentLanguageInfo();
  
  return (
    <TouchableOpacity onPress={() => changeLanguage('hi')}>
      <Text>{currentLang.nativeName}</Text>
    </TouchableOpacity>
  );
};
```

#### Adding New Translations
```javascript
// In translations/en.json
{
  "newSection": {
    "newKey": "New Translation"
  }
}

// Usage
const { t } = useLanguage();
const text = t('newSection.newKey');
```

### 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

2. **Import Language Provider**
   ```javascript
   import { LanguageProvider } from './src/contexts/LanguageContext';
   
   // Wrap your app
   <LanguageProvider>
     <YourApp />
   </LanguageProvider>
   ```

3. **Use Translations**
   ```javascript
   import { useLanguage } from './src/contexts/LanguageContext';
   
   const { t } = useLanguage();
   ```

## Testing

### 🧪 Language Test Screen
The app includes a comprehensive test screen (`LanguageTestScreen.js`) that displays all translations for the currently selected language. This helps verify:

- Translation completeness
- Text rendering in different scripts
- UI layout with various text lengths
- Language switching functionality

### 🔍 Testing Checklist
- [ ] All languages load without errors
- [ ] Language switching works smoothly
- [ ] Translations display correctly in native scripts
- [ ] Language preference persists across app restarts
- [ ] Fallback to English works for missing translations
- [ ] UI layout adapts to different text lengths

## Future Enhancements

### 🔮 Planned Features
- **Voice Support**: Text-to-speech in regional languages
- **Offline Translations**: Download language packs for offline use
- **RTL Support**: Full right-to-left language support
- **Auto-Detection**: Detect device language on first launch
- **More Languages**: Add additional Northeast region languages
- **Cultural Customization**: Region-specific UI adaptations

### 🌍 Additional Languages (Future)
- Bodo (brx)
- Garo (grt)
- Khasi (kha)
- Mishing (mrg)
- Tiwa (lax)
- And more...

## Contributing

### 📝 Adding New Languages
1. Create new translation file: `src/translations/[code].json`
2. Add language config to `src/config/languages.js`
3. Test with `LanguageTestScreen`
4. Update documentation

### 🔧 Adding New Translations
1. Add key-value pairs to all language files
2. Use nested objects for organization
3. Test with `LanguageTestScreen`
4. Update this README

## Support

For issues or questions about multilingual support:
- Check the `LanguageTestScreen` for translation status
- Verify all language files are properly formatted
- Ensure `LanguageProvider` is properly wrapped around your app
- Check console for translation loading errors

---

**NeerSetu** - Bridging language barriers for water quality monitoring in Northeast India 🌊

