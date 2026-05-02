import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const LoadingScreen = () => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2196f3" />
      <Text style={styles.loadingText}>{t('common.loading')} NeerSetu...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
  },
});

export default LoadingScreen;

