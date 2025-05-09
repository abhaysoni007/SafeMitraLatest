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
    marginRight: 40, // To balance the back button on the left
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
  locationStatusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
    marginLeft: 8,
  },
  statusContent: {
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  mapContainer: {
    marginBottom: 20,
  },
  mapPlaceholder: {
    height: 250,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginTop: 12,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusIndicatorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
});

export default styles; 