import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../config/languages';

const LanguageSelector = ({ visible, onClose }) => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageSelect = async (languageCode) => {
    setSelectedLanguage(languageCode);
    await changeLanguage(languageCode);
    onClose();
  };

  const renderLanguageItem = ({ item }) => {
    const isSelected = item.code === selectedLanguage;
    
    return (
      <TouchableOpacity
        style={[
          styles.languageItem,
          isSelected && styles.selectedLanguageItem
        ]}
        onPress={() => handleLanguageSelect(item.code)}
      >
        <Text style={styles.flag}>{item.flag}</Text>
        <View style={styles.languageInfo}>
          <Text style={[
            styles.languageName,
            isSelected && styles.selectedLanguageName
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.nativeName,
            isSelected && styles.selectedNativeName
          ]}>
            {item.nativeName}
          </Text>
        </View>
        {isSelected && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('settings.language')}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={Object.values(LANGUAGES)}
          keyExtractor={(item) => item.code}
          renderItem={renderLanguageItem}
          style={styles.languageList}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6c757d',
  },
  languageList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedLanguageItem: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  flag: {
    fontSize: 24,
    marginRight: 15,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 2,
  },
  selectedLanguageName: {
    color: '#1976d2',
  },
  nativeName: {
    fontSize: 14,
    color: '#6c757d',
  },
  selectedNativeName: {
    color: '#1565c0',
  },
  checkmark: {
    fontSize: 18,
    color: '#2196f3',
    fontWeight: 'bold',
  },
});

export default LanguageSelector;

