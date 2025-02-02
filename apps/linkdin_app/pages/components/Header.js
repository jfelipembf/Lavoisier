import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constants/theme';

const Header = ({title,leftIcon,rightIcon,postOptionSheet}) => {

    const navigation = useNavigation();

    return (
        <View
            style={{
                backgroundColor: COLORS.primary6,
                flexDirection:'row',
                alignItems:'center',
                height:48,
            }}
        >
            {leftIcon == "back" &&
                <IconButton
                    icon={(props) => <FeatherIcon name='arrow-left' {...props}/>}
                    size={24}
                    iconColor={COLORS.white}
                    onPress={() => navigation.goBack()}
                />
            }
            {leftIcon == "close" &&
                <IconButton
                    icon={(props) => <FeatherIcon name='x' {...props}/>}
                    size={24}
                    iconColor={COLORS.white}
                    onPress={() => navigation.goBack()}
                />
            }
            <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white,marginBottom:1,flex:1,marginLeft:5}}>{title}</Text>
            {rightIcon == "chat" &&
                <IconButton
                    icon={(props) => <MaterialCommunityIcons name='chat-processing-outline' {...props}/>}
                    size={24}
                    iconColor={COLORS.white}
                    onPress={() => navigation.navigate('ChatList')}
                />
            }
            {rightIcon == "next" &&
                <IconButton
                    icon={(props) => <FeatherIcon name='arrow-right' {...props}/>}
                    size={24}
                    iconColor={COLORS.white}
                    onPress={() => {}}
                />
            }
            {rightIcon == "more" &&
                <IconButton
                    icon={(props) => <FeatherIcon name='more-vertical' {...props}/>}
                    size={24}
                    iconColor={COLORS.white}
                    onPress={() => {postOptionSheet.current.open()}}
                />
            }
        </View>
    );
};

export default Header;