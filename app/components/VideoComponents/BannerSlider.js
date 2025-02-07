import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { IMAGES } from '../../constants/theme';

const BannerSlider = (props) => {
    return (
        <>
            <ScrollView
                horizontal
                contentContainerStyle={{paddingLeft:15,marginBottom: 5}}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    activeOpacity={.8}
                    style={{
                        marginRight:12,
                    }}
                    >
                    <Image
                        style={{
                            width:260,
                            height:130,
                            borderRadius:10,
                        }}
                        source={IMAGES.foodBanner1}
                        />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={{
                        marginRight:12,
                    }}
                >
                    <Image
                        style={{
                            width:260,
                            height:130,
                            borderRadius:10,
                        }}
                        source={IMAGES.foodBanner2}
                    />
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};


export default BannerSlider;