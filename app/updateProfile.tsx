import { Text, View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';

import AuthHeader from '../components/AuthHeader';

import Container from '../components/Container';
import InputComponent from '../components/InputComponent';
import { Button } from 'react-native-paper';
import { colors } from '../constants/Colors';
import { useRouter } from 'expo-router';

import { useCommunities, useStates } from '../lib/queries';
import RNPickerSelect from 'react-native-picker-select';

import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useStoreId } from '../lib/zustand/auth';
import { useToast } from 'react-native-toast-notifications';
import { MyButton } from '../components/MyButton';
import { getProfile } from '../lib/helpers';
import { useQueryClient } from '@tanstack/react-query';

type Props = {};
const width = Dimensions.get('window').width;

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),

  phoneNumber: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  state: yup.string().required('State is required'),

  communityId: yup.string().required('Community is required'),
});
const Update = (props: Props) => {
  const { setId, id, getId, getUser, removeUser } = useStoreId();
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const toast = useToast();
  // console.log(data);
  // console.log('error', error);

  const {
    values,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues: {
      email: '',

      name: '',
      state: 'abuja',
      address: '',
      phoneNumber: '',

      communityId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await axios.post(
        `https://247api.netpro.software/api.aspx?api=accountupdate&statename=${values.state}&fullname=${values.name}&phone=${values.phoneNumber}&addres=${values.address}&emailaddress=${values.email}&communityId=${values.communityId}&myuserid=${id}`
      );

      console.log(response.data);

      if (response.data === 'saved') {
        toast.show('Your profile has been updated successfully,', {
          type: 'success ',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });

        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.back();
      } else if (
        response.data ===
        'you may not change infor while a delivery is en route'
      ) {
        toast.show('You may not change info while a delivery is en route', {
          type: 'danger ',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });

        return;
      }
    },
  });
  useEffect(() => {
    const getUser = async () => {
      getId();
      const { data } = await axios.get(
        `https://247api.netpro.software/api.aspx?api=userinfo&myuserid=${id}`
      );
      setValues({
        address: data?.addres,
        state: data?.statename,
        email: data?.email,
        name: data?.customername,
        phoneNumber: data?.phone,
        communityId: data?.communityId,
      });
    };
    getUser();
  }, []);

  const { address, email, name, phoneNumber, state } = values;
  const router = useRouter();
  const {
    data: states,
    isFetching: stateIsFetching,
    isPending: stateIsPending,
    isLoading: stateIsLoading,
    error: stateError,
  } = useStates();

  const mainState = states?.map((state) => {
    return {
      label: state?.statename,
      value: state?.statename.toLowerCase(),
    };
  });

  const {
    data: communities,
    isLoading,
    isFetching,
    isPending,
  } = useCommunities(state);

  const mainCommunities = communities?.map((community) => {
    return {
      label: community?.communityname,
      value: community?.id,
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <AuthHeader />

        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{ width: width, height: 150 }}
          />
          <View style={{ marginVertical: 30 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              Profile Update
            </Text>
          </View>
        </View>
        <Container>
          <View style={{ gap: 10 }}>
            <>
              <InputComponent
                label="Your Name"
                placeholder="Your name"
                keyboardType="default"
                onChangeText={handleChange('name')}
                value={name}
              />
              {touched.name && errors.name && (
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                  {errors.name}
                </Text>
              )}
            </>
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
            <>
              <InputComponent
                label="Mobile Number"
                placeholder="Mobile Number"
                keyboardType="numeric"
                onChangeText={handleChange('phoneNumber')}
                value={phoneNumber}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                  {errors.phoneNumber}
                </Text>
              )}
            </>
            <>
              <View style={styles2.border}>
                {stateIsLoading || stateIsFetching || stateIsPending ? (
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text>Loading...</Text>
                  </View>
                ) : (
                  <RNPickerSelect
                    value={state}
                    onValueChange={handleChange('state')}
                    // @ts-ignore
                    items={mainState}
                    style={styles}
                  />
                )}
              </View>
              {touched.state && errors.state && (
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                  {errors.state}
                </Text>
              )}
            </>
            <>
              <View style={styles2.border}>
                {isLoading || isFetching || isPending ? (
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text>Loading...</Text>
                  </View>
                ) : (
                  <RNPickerSelect
                    value={values.communityId}
                    onValueChange={handleChange('communityId')}
                    // @ts-ignore

                    items={mainCommunities}
                  />
                )}
              </View>
              {touched.communityId && errors.communityId && (
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                  {errors.communityId}
                </Text>
              )}
            </>
            <>
              <InputComponent
                label="Street"
                placeholder="Address"
                keyboardType="default"
                onChangeText={handleChange('address')}
                value={address}
              />
              {touched.address && errors.address && (
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                  {errors.address}
                </Text>
              )}
            </>

            <MyButton
              loading={isSubmitting}
              style={{ marginTop: 20, borderRadius: 5 }}
              disabled={isSubmitting}
              buttonColor={colors.lightGreen}
              onPress={() => handleSubmit()}
              text=" Update"
            />
          </View>
        </Container>
      </ScrollView>
    </View>
  );
};

export default Update;
const styles2 = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
