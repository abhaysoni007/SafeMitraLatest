import { StyleSheet, Platform, StatusBar } from 'react-native';

/**
 * Styles for EvidenceSecureScreen
 * 
 * Design System:
 * - Primary Color: #FF3B30 (Red)
 * - Text Colors:
 *   - Primary: #111111
 *   - Secondary: #666666
 *   - Placeholder: #999999
 * - Border Colors:
 *   - Default: #E0E0E0
 *   - Active: #FF3B30
 * 
 * Future Customization:
 * 1. Theme Support:
 *    - Create a theme object with color variables
 *    - Replace hardcoded colors with theme variables
 *    - Add dark mode support
 * 
 * 2. Responsive Design:
 *    - Add responsive font sizes
 *    - Adjust spacing based on screen size
 *    - Handle different device orientations
 * 
 * 3. Accessibility:
 *    - Add minimum touch target sizes
 *    - Ensure sufficient color contrast
 *    - Support dynamic text sizes
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  shieldIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  shieldIcon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#111111',
  },
  blockchainInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  blockchainTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 8,
  },
  blockchainText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  viewLogsButton: {
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  viewLogsButtonText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  pinInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    color: '#111111',
    backgroundColor: '#FFFFFF',
  },
  activePinInput: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF3B30',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  optionsContainer: {
    width: '100%',
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    marginTop: 12,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  warningText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
  },
});

export default styles; 