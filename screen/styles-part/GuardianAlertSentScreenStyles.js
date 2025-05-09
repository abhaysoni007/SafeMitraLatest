import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginLeft: 8,
  },
  headerRight: {
    width: 40,
  },
}); 