import React from "react";
import { 
  Platform,
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";


const CustomButton = (props) => {
 
  return (
    <View
      style={[{
          shadowColor: props.style?.shadowColor || COLORS.primary,
          shadowOffset: {
              width: 5,
              height: 5,
          },
          shadowOpacity: props.style?.shadowOpacity || (props.btnLight ? 0 : props.disabled ? 0 : .3),
          shadowRadius: 5,
      }, Platform.OS === 'ios' && {
        backgroundColor: props.color || COLORS.primary,
        borderRadius: SIZES.radius,
      }]}
    >
      <TouchableOpacity
          disabled={props.disabled}
          activeOpacity={.75}
          style={[
            {...styles.button},
            props.btnSm && {height: 40},
            props.color && {backgroundColor: props.color},
            props.btnLight && {backgroundColor: props.color || '#E6E6E6', elevation:0},
            props.disabled && {backgroundColor:'#C9C9C9',elevation:0}]}
          onPress={()=> props.onPress ? props.onPress() : ""}
      >
          <Text style={[
            {...FONTS.fontLg},
            props.btnLight ? {color: '#646464'} : {color: COLORS.white},
            props.textColor && {color: props.textColor}
          ]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button:{
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        alignItems:'center',
        justifyContent:'center',
        elevation: 5,
    }
})

export default CustomButton;
