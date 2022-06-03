import { StyleProp } from 'react-native';
import { BaseTheme, RNStyle, Dimensions } from '../types';
declare const useRestyle: <Theme extends BaseTheme, TRestyleProps extends Record<string, any>, TProps extends TRestyleProps & {
    style?: StyleProp<RNStyle>;
}>(composedRestyleFunction: {
    buildStyle: <TInputProps extends TProps>(props: TInputProps, { theme, dimensions, }: {
        theme: Theme;
        dimensions: Dimensions;
    }) => RNStyle;
    properties: (keyof TProps)[];
    propertiesMap: Record<keyof TProps, boolean>;
}, props: TProps) => TProps & {
    style: ((...args: any[]) => (false | import("react-native").ViewStyle | import("react-native").ImageStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").RegisteredStyle<import("react-native").ViewStyle> | null | undefined> | ((...args: any[]) => StyleProp<import("react-native").ViewStyle>) | null | undefined)[]) | (false | import("react-native").ViewStyle | import("react-native").ImageStyle | ((...args: any[]) => StyleProp<import("react-native").ViewStyle>) | import("react-native").RegisteredStyle<RNStyle> | import("react-native").RecursiveArray<false | import("react-native").ViewStyle | import("react-native").TextStyle | import("react-native").ImageStyle | ((...args: any[]) => StyleProp<import("react-native").ViewStyle>) | import("react-native").RegisteredStyle<RNStyle> | null | undefined> | null | undefined)[];
};
export default useRestyle;
