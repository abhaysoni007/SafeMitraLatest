import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SafeMitraLogo = ({ color = '#FFFFFF', size = 120 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="4">
        {/* Shield outline */}
        <Path
          d="M50 5 L15 20 L15 45 C15 65 30 85 50 95 C70 85 85 65 85 45 L85 20 L50 5"
          fill={color}
        />
        {/* Female symbol */}
        <Path
          d="M50 35 C43 35 37 41 37 48 C37 55 43 61 50 61 C57 61 63 55 63 48 C63 41 57 35 50 35 M50 61 L50 75 M42 68 L58 68"
          stroke="#FF3B30"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default SafeMitraLogo; 