import React from "react";
import {Box, Button, Text} from "native-base";
import tw from "twrnc";
import {useNavigation} from "@react-navigation/native";
//HOCS
import {WithKeyBoardAwareScrollView} from "@HOC";
//
import {BaseTemplate} from "@components/TemplateType";
//Components
import Products from "@components/Products";

//-------MAIN
function Explore() {
    const navigation = useNavigation();
  return (
      <BaseTemplate
          useSafeTop={false}
      >
          {/*--list-Products--*/}
          <Box flex={'1'} >
              <Products/>
          </Box>

      </BaseTemplate>
  );
}

export default Explore

