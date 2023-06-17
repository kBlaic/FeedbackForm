import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sliderValue, setSliderValue] = useState(1);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validates name
  const validateName = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  // Validates number
  const validateNumber = () => {
    if (number.trim() === '') {
      setNumberError('Number is required');
    } else if (!/^\+?[\d\s]+$/.test(number)) {
      setNumberError('Invalid number');
    } else {
      setNumberError('');
    }
  };

  // Validates email
  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }
  };

  const emojis = [
    { emoji: '😖', description: 'Worst' },
    { emoji: '🙁', description: 'Not Good' },
    { emoji: '😐', description: 'Fine' },
    { emoji: '😃', description: 'Look Good' },
    { emoji: '😍', description: 'Very Good' },
  ];

  const handlesliderChange = (value) => {
    setSliderValue(value);
  };

  // Checks all input fields
  const isFormValid = 
    name.trim() !== '' && 
    number.trim() !== '' && /^\+?[\d ]+$/.test(number) 
    && email.trim() !== '' && /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = () => {
    setIsLoading(true);

    // Simulate form submission delay
    setTimeout(() => {
      // Handle form submission here
      console.log('Name:', name);
      console.log('Number:', number);
      console.log('Email:', email);
      console.log('Slider Value:', sliderValue);
      console.log('Comment:', comment);

      // Reset form fields
      setName('');
      setNumber('');
      setEmail('');
      setSliderValue(1);
      setComment('');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.rowContainer}>
          <View style={styles.column}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={[styles.input, name !== '' && styles.filledInput, nameError && styles.inputError]}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              onSelectionChange={validateName}
            />
            {nameError && <Text style={styles.errorText}>{nameError}</Text>}
          </View>
          <View style={styles.spacing} />
          <View style={styles.column}>
            <Text style={styles.text}>Contact Number</Text>
            <TextInput
              style={[styles.input, number !== '' && styles.filledInput, numberError && styles.inputError]}
              placeholder="+91 00000 00000"
              value={number}
              onChangeText={setNumber}
              keyboardType="phone-pad"
              onSelectionChange={validateNumber}
            />
            {numberError && <Text style={styles.errorText}>{numberError}</Text>}
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.column, styles.halfWidth]}>
            <Text style={styles.text}>Email Address</Text>
            <TextInput
              style={[styles.input, email !== '' && styles.filledInput, emailError && styles.inputError]}
              placeholder="xyz123@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              onSelectionChange={validateEmail}
              />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          </View>
          <View style={styles.spacing} />
        </View>
        <View>
          <Text style={styles.text}>Share your experience in scaling</Text>
          <View style={styles.emojisContainer}>
            {emojis.map((item, index) => (
              <View key={item.description} style={styles.emojiContainer}>
                <Text 
                  style={[
                    styles.emoji, 
                    index === Math.round(sliderValue - 1) && styles.selectedEmoji,
                  ]}
                  >
                  {item.emoji}
                </Text>
                <Text 
                  style={[
                    styles.description, 
                    index === Math.round(sliderValue - 1) && styles.selectedDescription,
                  ]}
                  >
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={0.1}
            value={sliderValue}
            onValueChange={handlesliderChange}
            minimumTrackTintColor='#105955'
            maximumTrackTintColor='#A5E0DD'
            thumbTintColor='#105955'
            />
        </View>
        <TextInput
          style={styles.commentInput}
          placeholder="Add your comments..."
          value={comment}
          onChangeText={setComment}
          textAlignVertical='top'
          multiline
        />
        <Pressable 
          style={[styles.button, { backgroundColor: isFormValid ? '#105955' : '#20B2AA' }]}
          onPress={handleSubmit}
          disabled={!isFormValid || isLoading}
        >
          <Text style={styles.textButton}>SUBMIT</Text>
        </Pressable>
      </KeyboardAwareScrollView>

      {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='blue' />
          </View>
        )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: StatusBar.currentHeight + 30,
  },
  
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
  },

  column: {
    flex: 1,
  },

  text: {
    color: '#2071B2',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 20,
  },

  spacing: {
    width: 16,
  },

  halfWidth: {
    flex: 0.5,
  },

  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 7,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  filledInput: {
    borderColor: '#105955',
    color: '#105955',
    fontWeight: 'bold',
    borderWidth: 2,
  },

  inputError: {
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 2,
  },

  errorText: {
    color: 'red',
    fontSize: 14,
  },

  emojisContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },

  emojiContainer: {
    flex: 1,
    alignItems: 'center',
  },

  emoji: {
    fontSize: 35,
    marginBottom: 8,
    opacity: 0.2,
  },

  selectedEmoji: {
    opacity: 1,
  },

  description: {
    fontSize: 15,
    color: '#A5E0DD',
    maxWidth: '90%',
    textAlign: 'center',
  },

  selectedDescription: {
    color: '#105955',
    fontWeight: 'bold'
  },

  slider: {
    width: '100%',
    height: 20,
    marginTop: 10,
    marginBottom: 40,
  },

  commentInput: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 50,
    paddingTop: 5,
    fontSize: 16,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    height: 50,
  },

  textButton: {
    fontSize: 16,
    letterSpacing: 0.5,
    color: 'white',
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default FeedbackForm;