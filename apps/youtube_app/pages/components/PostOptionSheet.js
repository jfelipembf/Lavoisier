import React from 'react';
import { Share, ToastAndroid, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { List } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const PostOptionSheet = ({postOption}) => {

    const { colors } = useTheme();
    const [postSaved, setPostSaved] = React.useState(false);

    const handlePostSave = () => {
        setPostSaved(!postSaved);
        if(postSaved){
            ToastAndroid.show({
                text : "Post unsaved successfully.",
                backgroundColor:'#000',
            })
        }else{
            ToastAndroid.show({
                text : "Post saved successfully.",
                backgroundColor:'#000',
            })
        }
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
                message:
                'Multipurpose react native application.\nDownload : https://play.google.com/store/apps/details?id=com.AppZilla \n Best application for every developer.',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };


    return (
        <View style={[GlobalStyleSheet.container]}>
            <List.Item
                onPress={() => {handlePostSave()}}
                left={() => <FontAwesome style={{width:35,left:12}} size={20} color={colors.title} name={postSaved ? 'bookmark' : 'bookmark-o'}/>}
                titleStyle={{
                    ...FONTS.font,
                    fontSize:15,
                    color:colors.title,
                }}
                title={postSaved ? "Unsave this post" : "Save this post"}
            />
            <List.Item
                onPress={() => {onShare()}}
                left={() => <FeatherIcon style={{width:35,left:10}} size={20} color={colors.title} name='share-2'/>}
                titleStyle={{
                    ...FONTS.font,
                    fontSize:15,
                    color:colors.title,
                }}
                title="Share the post"
            />
            <List.Item
                onPress={() => {postOption.current.close()}}
                left={() => <FeatherIcon style={{width:35,left:10}} size={20} color={colors.title} name='download'/>}
                titleStyle={{
                    ...FONTS.font,
                    fontSize:15,
                    color:colors.title,
                }}
                title="Download Video"
            />
            <List.Item
                onPress={() => {postOption.current.close()}}
                left={() => <FeatherIcon style={{width:35,left:10}} size={20} color={COLORS.danger} name='alert-triangle'/>}
                titleStyle={{
                    ...FONTS.font,
                    fontSize:15,
                    color:COLORS.danger,
                }}
                title="Report the post"
            />
        </View>
    );
};

export default PostOptionSheet;