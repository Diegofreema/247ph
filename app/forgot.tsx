import { ScrollView, Text, View, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import React, { useState } from 'react';

import AuthHeader from '../components/AuthHeader';

import Container from '../components/Container';
import InputComponent from '../components/InputComponent';

import { colors } from '../constants/Colors';
import { useRouter } from 'expo-router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import { useStoreId } from '../lib/zustand/auth';
import { MyButton } from '../components/MyButton';
type Props = {};
const width = Dimensions.get('window').width;
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});
const Forgot = (props: Props) => {
  const { setId } = useStoreId();
  const router = useRouter();
  const toast = useToast();
  const { values, isSubmitting, errors, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: '',
      },
      validationSchema,
      onSubmit: async (values) => {
        const response = await axios.post(
          `https://247api.netpro.software/api.aspx?api=recoverpassword&emailaddress=${values.email}`
        );

        console.log(response.data);

        if (response.data === 'email does not exist') {
          toast.show('Email does not exist', {
            type: 'danger',
            placement: 'bottom',
            duration: 4000,

            animationType: 'slide-in',
          });
          return;
        }

        if (response.data === 'sent') {
          toast.show(
            'Please check your email, your previous password has been sent to your email',
            {
              type: 'success ',
              placement: 'bottom',
              duration: 4000,
              animationType: 'slide-in',
            }
          );
        }

        router.push('/');
      },
    });

  const { email } = values;

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <AuthHeader />

      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{ width: width - 40, height: 150 }}
        />
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            Reset Password
          </Text>
        </View>
      </View>
      <Container>
        <Text
          onPress={() => router.push('/signup')}
          style={{ alignSelf: 'flex-end', color: '#1A91FF', marginTop: 20 }}
        >
          Create an account
        </Text>
        <View style={{ gap: 15 }}>
          <>
            <InputComponent
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              value={email}
            />
            {touched.email && errors.email && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.email}
              </Text>
            )}
          </>

          <MyButton
            buttonColor={colors.lightGreen}
            disabled={isSubmitting}
            text="Submit"
            onPress={() => handleSubmit()}
            loading={isSubmitting}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

export default Forgot;
