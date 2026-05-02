import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const HomeScreen = () => {
  const { t } = useLanguage();

  const menuItems = [
    { key: 'dashboard', icon: '📊', screen: 'Dashboard' },
    { key: 'reports', icon: '📋', screen: 'Reports' },
    { key: 'alerts', icon: '🚨', screen: 'Alerts' },
    { key: 'profile', icon: '👤', screen: 'Profile' },
    { key: 'settings', icon: '⚙️', screen: 'Settings' },
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity key={item.key} style={styles.menuItem}>
      <Text style={styles.menuIcon}>{item.icon}</Text>
      <Text style={styles.menuText}>{t(`navigation.${item.key}`)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>{t('common.welcome')}</Text>
          <Text style={styles.appName}>NeerSetu</Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.waterQualityCard}>
          <Text style={styles.cardTitle}>{t('waterQuality.title')}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, styles.safeStatus]} />
            <Text style={styles.statusText}>{t('waterQuality.safe')}</Text>
          </View>
          <Text style={styles.lastUpdated}>
            {t('waterQuality.lastUpdated')}: 2 hours ago
          </Text>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map(renderMenuItem)}
        </View>

        <View style={styles.quickStats}>
          <Text style={styles.statsTitle}>{t('dashboard.villageStats')}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>{t('dashboard.totalVillages')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>{t('dashboard.safeVillages')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>{t('dashboard.unsafeVillages')}</Text>
            </View>
          </View>
        </View>
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
  welcomeText: {
    fontSize: 16,
    color: '#6c757d',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  waterQualityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  safeStatus: {
    backgroundColor: '#28a745',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#28a745',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#6c757d',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    textAlign: 'center',
  },
  quickStats: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default HomeScreen;

