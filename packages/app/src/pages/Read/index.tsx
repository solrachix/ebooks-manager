import React, { useEffect, useState } from 'react'
import {
  Platform,
  Text,
  PermissionsAndroid,
  BackHandler,
  NativeModules,
  Alert
} from 'react-native'

import { DocumentView, RNPdftron } from 'react-native-pdftron'

import { Container } from './styles'

const Read: React.FC = () => {
  const path = 'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf'
  const [permissionGranted, setPermissionGranted] = useState(Platform.OS === 'ios')

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestStoragePermission()
    }
  }, [])

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true)
        console.log('Storage permission granted')
      } else {
        setPermissionGranted(false)
        console.log('Storage permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const onLeadingNavButtonPressed = () => {
    console.log('leading nav button pressed')
    if (Platform.OS === 'ios') {
      Alert.alert(
        'App',
        'onLeadingNavButtonPressed',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: true }
      )
    } else {
      BackHandler.exitApp()
    }
  }

  if (!permissionGranted) {
    return (
      <Container>
        <Text>
          Storage permission required.
        </Text>
      </Container>
    )
  }

  return (
    <DocumentView
      document={path}
      // showLeadingNavButton={true}
      // leadingNavButtonIcon={Platform.OS === 'ios' ? 'ic_close_black_24px.png' : 'ic_arrow_back_white_24dp'}
      // onLeadingNavButtonPressed={onLeadingNavButtonPressed}
    />
  )
}

export default Read
