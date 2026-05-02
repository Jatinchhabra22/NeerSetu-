import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const LanguageToggle = ({ style }) => {
  const { getCurrentLanguageInfo } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  const currentLanguage = getCurrentLanguageInfo();

  return (
    <>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={() => setShowLanguageSelector(true)}
      >
        <Text style={styles.flag}>{currentLanguage.flag}</Text>
        <Text style={styles.languageCode}>{currentLanguage.code.toUpperCase()}</Text>
      </TouchableOpacity>
      
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  flag: {
    fontSize: 16,
    marginRight: 6,
  },
  languageCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
});

export default LanguageToggle;

