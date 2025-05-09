import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const PIN_BOX_SIZE = width * 0.12; // 12% of screen width
const PIN_BOX_MARGIN = width * 0.015; // 1.5% of screen width

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
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
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: '90%',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 20,
  },
  pinInput: {
    width: PIN_BOX_SIZE,
    height: PIN_BOX_SIZE,
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
  },
  activePinInput: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  hintContainer: {
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  hintLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  hintInput: {
    width: '100%',
    height: 45,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: '#FFF4F4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    color: '#444444',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#FF3B30',
    width: '100%',
    height: 45,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 20,
    shadowColor: '#FF3B30',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  securityTips: {
    color: '#666666',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  validationIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
}); 