import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  // Screen styles
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
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
  content: {
    flex: 1,
    padding: 16,
  },

  // Card styles
  hotwordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  mainContent: {
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  waveform: {
    width: 4,
    backgroundColor: '#FF3B30',
    marginHorizontal: 2,
  },
  waveform1: {
    height: 8,
  },
  waveform2: {
    height: 16,
  },
  waveform3: {
    height: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  hotwordDisplay: {
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  hotwordLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  hotwordText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
  },
});

export default styles; 