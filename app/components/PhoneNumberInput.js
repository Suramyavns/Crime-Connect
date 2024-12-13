import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-international-phone-number';
import { color, styles } from '../styles/common';

export default function PhoneNumberInput({handleInputValue,handleSelectedCountry,selectedCountry,inputValue}) {

  return (
    <View style={{ width: Dimensions.get('screen').width*.85,padding:14}}>
      <PhoneInput
        modalStyles={modalStyles}
        phoneInputStyles={inputStyles}
        placeholder='Your Phone Number'
        value={inputValue}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
      />
    </View>
  );
}

const inputStyles = StyleSheet.create({
  container: {
    alignSelf:'center',
    backgroundColor:color.black,
    ...styles.inputbox
  },
  flagContainer: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: color.black,
    justifyContent: 'center',
  },
  flag: {},
  caret: {
    color: color.fontlight,
    fontSize: 16,
  },
  divider: {
    backgroundColor: 'transparent',
  },
  callingCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.fontlight,
  },
  input: {
    
    color: color.fontlight,
  },
})

const modalStyles = StyleSheet.create({
  modal: {
    backgroundColor: color.black,
    borderWidth: 1,
  },
  backdrop: {},
  divider: {
    backgroundColor: 'transparent',
  },
  countriesList: {},
  searchInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: color.blue,
    color: color.fontlight,
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    height: 46,
  },
  countryButton: {
    borderWidth: 1,
    borderColor: `${color.white}66`,
    backgroundColor: 'transparent',
    marginVertical: 4,
    paddingVertical: 0,
  },
  noCountryText: {},
  noCountryContainer: {},
  flag: {
    color: color.fontlight,
    fontSize: 20,
  },
  callingCode: {
    color: color.fontlight,
  },
  countryName: {
    color: color.fontlight,
  },
})