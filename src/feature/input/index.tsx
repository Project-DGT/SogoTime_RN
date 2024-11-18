import { View } from "react-native";
import { DodamTextField } from "../../component/textfield";
import { useState } from "react";

const InputScreen = () => {

  const [value, setValue] = useState<string>('');

  return <View style={{
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  }}>
    <DodamTextField value={value} label="test" onValueChange={(value) => {
      setValue(value);
    }} supportText="에러남!!" isError={false}></DodamTextField>
  </View>
}


export default InputScreen;