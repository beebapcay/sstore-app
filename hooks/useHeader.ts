import { useTheme } from 'native-base';
import { StackNavigationOptions } from '@react-navigation/stack';

const useHeader = (title: string): StackNavigationOptions => {
  const { colors } = useTheme();

  const options: StackNavigationOptions = {
    title: title,
    headerStyle: {
      backgroundColor: colors.background,
      shadowColor: 'transparent',
      elevation: 0
    },
    headerTintColor: colors.red['800'],
    headerTitleAlign: 'center',
    headerTitleContainerStyle: {
      marginTop: 5
    },
    headerTitleStyle: {
      fontSize: 21
    }
  };
  return options;
};

export default useHeader;
