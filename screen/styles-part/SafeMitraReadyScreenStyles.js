import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#d32f2f',
    marginLeft: 8,
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkmark: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 22,
  },
  featureList: {
    width: '100%',
    marginVertical: 20,
  },
  featureItem: {
    marginVertical: 5,
  },
  featureText: {
    fontSize: 16,
    color: '#111111',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#FF3B30',
    marginBottom: 5,
  },
  toggleContainer: {
    width: '100%',
    marginVertical: 20,
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '600',
  },
  toggleStatus: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  toggleTip: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
  dashboardButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationTip: {
    fontSize: 14,
    color: '#666666',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default styles; 