import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import LanguageSelector from '../components/LanguageSelector';

const SettingsScreen = () => {
  const { t } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const settingsItems = [
    {
      key: 'language',
      title: t('settings.language'),
      subtitle: t('settings.language'),
      icon: '🌐',
      onPress: () => setShowLanguageSelector(true),
      rightComponent: <LanguageToggle />,
    },
    {
      key: 'notifications',
      title: t('settings.notifications'),
      subtitle: 'Enable push notifications',
      icon: '🔔',
      rightComponent: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#e9ecef', true: '#2196f3' }}
          thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
        />
      ),
    },
    {
      key: 'theme',
      title: t('settings.theme'),
      subtitle: 'Dark mode',
      icon: '🌙',
      rightComponent: (
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: '#e9ecef', true: '#2196f3' }}
          thumbColor={darkModeEnabled ? '#fff' : '#f4f3f4'}
        />
      ),
    },
    {
      key: 'privacy',
      title: t('settings.privacy'),
      subtitle: 'Privacy settings',
      icon: '🔒',
      onPress: () => console.log('Privacy pressed'),
    },
    {
      key: 'about',
      title: t('settings.about'),
      subtitle: 'App version 1.0.0',
      icon: 'ℹ️',
      onPress: () => console.log('About pressed'),
    },
    {
      key: 'contact',
      title: t('settings.contact'),
      subtitle: 'Get help and support',
      icon: '📞',
      onPress: () => console.log('Contact pressed'),
    },
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.key}
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={!item.onPress}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{item.icon}</Text>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      {item.rightComponent && (
        <View style={styles.settingRight}>
          {item.rightComponent}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings.title')}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          {settingsItems.slice(0, 3).map(renderSettingItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {settingsItems.slice(3).map(renderSettingItem)}
        </View>
      </ScrollView>

      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 10,
    marginLeft: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  settingRight: {
    marginLeft: 10,
  },
});

export default SettingsScreen;

