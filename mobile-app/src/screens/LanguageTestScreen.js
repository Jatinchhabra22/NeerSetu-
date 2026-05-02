import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const LanguageTestScreen = () => {
  const { t, getCurrentLanguageInfo } = useLanguage();
  const currentLanguage = getCurrentLanguageInfo();

  const testSections = [
    {
      title: 'common',
      items: ['welcome', 'loading', 'error', 'success', 'cancel', 'save', 'edit', 'delete', 'submit', 'back', 'next', 'done', 'yes', 'no', 'ok']
    },
    {
      title: 'auth',
      items: ['login', 'register', 'logout', 'email', 'password', 'confirmPassword', 'forgotPassword', 'loginSuccess', 'loginError', 'registerSuccess', 'registerError']
    },
    {
      title: 'navigation',
      items: ['home', 'dashboard', 'reports', 'alerts', 'profile', 'settings', 'about']
    },
    {
      title: 'waterQuality',
      items: ['title', 'currentStatus', 'phLevel', 'turbidity', 'chlorine', 'bacteria', 'safe', 'unsafe', 'moderate', 'lastUpdated', 'village', 'location']
    },
    {
      title: 'reports',
      items: ['title', 'generateReport', 'downloadReport', 'shareReport', 'reportDate', 'reportPeriod', 'villageReport', 'districtReport']
    },
    {
      title: 'alerts',
      items: ['title', 'newAlert', 'alertType', 'alertLevel', 'high', 'medium', 'low', 'critical', 'waterContamination', 'maintenance', 'systemDown']
    },
    {
      title: 'profile',
      items: ['title', 'personalInfo', 'name', 'phone', 'address', 'village', 'district', 'state', 'updateProfile', 'changePassword']
    },
    {
      title: 'settings',
      items: ['title', 'language', 'notifications', 'theme', 'privacy', 'about', 'version', 'contact']
    },
    {
      title: 'dashboard',
      items: ['title', 'overview', 'waterQualityStatus', 'recentReports', 'alerts', 'villageStats', 'totalVillages', 'safeVillages', 'unsafeVillages', 'pendingReports']
    },
    {
      title: 'errors',
      items: ['networkError', 'serverError', 'notFound', 'unauthorized', 'forbidden', 'tryAgain', 'checkConnection']
    }
  ];

  const renderSection = (section) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
      {section.items.map((item) => (
        <View key={item} style={styles.translationItem}>
          <Text style={styles.translationKey}>{item}:</Text>
          <Text style={styles.translationValue}>{t(`${section.title}.${item}`)}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Multilingual Test</Text>
        <LanguageToggle />
      </View>

      <View style={styles.languageInfo}>
        <Text style={styles.currentLanguage}>
          Current Language: {currentLanguage.name} ({currentLanguage.nativeName}) {currentLanguage.flag}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {testSections.map(renderSection)}
      </ScrollView>
    </SafeAreaView>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  languageInfo: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  currentLanguage: {
    fontSize: 14,
    color: '#1976d2',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 10,
  },
  translationItem: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 2,
  },
  translationKey: {
    fontSize: 12,
    color: '#6c757d',
    width: 120,
    fontWeight: '500',
  },
  translationValue: {
    fontSize: 12,
    color: '#212529',
    flex: 1,
  },
});

export default LanguageTestScreen;

