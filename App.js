import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';
import Slider from '@react-native-community/slider';

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

  const validateName = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const validateNumber = () => {
    if (number.trim() === '') {
      setNumberError('Number is required');
    } else if (!/^\+?\d+$/.test(number)) {
      setNumberError('Invalid number');
    } else {
      setNumberError('');
    }
  };

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

  const isFormValid = () => {
    const isNameValid = name.trim() !== '';
    const isNumberValid = number.trim() !== '' && /^\+?[\d ]+$/.test(number);
    const isEmailValid = email.trim() !== '' && /^\S+@\S+\.\S+$/.test(email);

    return isNameValid && isNumberValid && isEmailValid;
  };

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
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={[styles.input, name !== '' && styles.filledInput, nameError && styles.inputError]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            onBlur={validateName}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
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
            onBlur={validateNumber}
          />
          {numberError ? <Text style={styles.errorText}>{numberError}</Text> : null}
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
            onBlur={validateEmail}
            />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>
        <View style={styles.spacing} />
      </View>
      <View>
        <Text style={styles.text}>Share your experience in scaling</Text>
        <View style={styles.emojisContainer}>
          {emojis.map((item, index) => (
            <View key={index} style={styles.emojiContainer}>
              <Text 
                style={[
                  styles.emoji, 
                  index === Math.floor(sliderValue - 1) ? styles.selectedEmoji : null,
                ]}
                >
                {item.emoji}
              </Text>
              <Text 
                style={[
                  styles.description, 
                  index === Math.floor(sliderValue - 1) ? styles.selectedDescription : null,
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
          step={1}
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
        style={styles.button}
        onPress={handleSubmit}
        disabled={!isFormValid() || isLoading}
        backgroundColor={isFormValid() ? '#105955' : '#20B2AA'}
      >
        <Text style={styles.textButton}>SUBMIT</Text>
      </Pressable>

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
    marginTop: StatusBar.currentHeight,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
  },

  column: {
    flex: 1,
  },

  text: {
    color: '#2071B2',
    fontWeight: 'bold',
    fontSize: 16,
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
    //marginTop: 5,
    marginBottom: 15,
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
  },

  errorText: {
    color: 'red',
    marginBottom: 15,
    marginTop: -17,
  },

  emojisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },

  emojiContainer: {
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
    fontSize: 13,
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
    marginBottom: 15,
  },

  commentInput: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingTop: 5,
    fontSize: 16,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#20B2AA',
    borderRadius: 7,
    height: 50,
  },

  textButton: {
    fontSize: 16,
    letterSpacing: 0.5,
    color: 'white',
  },

  loadingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default FeedbackForm;