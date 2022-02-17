import React from 'react'
import { SafeAreaView, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from "react-native-safe-area-context";
//
import {atomColors} from "@theme/useThems";
import {useRecoilValue} from 'recoil';

const withKeyboardAwareScrollView =
    (Component, option) =>
        (props) =>
        {
            const { top, bottom } = useSafeAreaInsets();
            const {useSafeTop , useSafeBottom} =option;
            const useColor = useRecoilValue(atomColors)
            return (
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps={'handled'}
                    // enableResetScrollToCoords={false}
                    extraScrollHeight={0}
                    contentContainerStyle={{
                        flexGrow: 1,
                        backgroundColor: useColor.primary,
                        paddingTop: useSafeTop? top :0,
                        paddingBottom:useSafeBottom? bottom:0
                    }}
                >
                    <Component {...props} />
                </KeyboardAwareScrollView>
            )
        }

export default withKeyboardAwareScrollView