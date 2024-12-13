import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { color } from "../styles/common";
import DatePicker from 'react-native-date-picker'
export default function DateInput({showDatePicker,setShowDatePicker,changeDate}){
    const [selectedDate,setSelectedDate]=useState(new Date());
    return(
        <DatePicker title='Select Date of Birth' buttonColor={color.white} maximumDate={new Date()} theme="dark" mode="date" modal={true} open={showDatePicker} date={selectedDate}
        onConfirm={(date)=>{
            changeDate(date);
            setShowDatePicker(false)
        }} onCancel={()=>{setShowDatePicker(false)}} />
    )
}
