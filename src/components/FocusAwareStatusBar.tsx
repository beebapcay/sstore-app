import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Factory } from 'native-base';

const FocusAwareStatusBar: React.FC = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

const NBFocusAwareStatusBar = Factory(FocusAwareStatusBar);

export default NBFocusAwareStatusBar;
