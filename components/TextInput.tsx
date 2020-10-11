import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
// import { theme } from '../core/theme';

type Props = React.ComponentProps<typeof TextInput> & { errorText?: string };

// <View style={styles.container}>
const Input = ({ errorText, ...props }: Props) => (
    <TextInput
      style={styles.input}
      // selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="flat"
      {...props}
      
    />
    
);
{/* {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View> */}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    marginHorizontal: '10%',
    width: '90%',
    marginVertical: 30,
    maxWidth: 800
    // backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    // color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(Input);
