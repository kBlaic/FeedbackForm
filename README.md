# FeedbackForm

A mobile application built with React Native that allows users to provide feedback.

### Prerequisites

- Node.js and npm installed


## Installing

1. Navigate to the project folder
   
2. Install dependencies:

```sh
npm install
```

3. Start the development server:
   
```sh
npm start
```
or
```sh
npx expo start
```

### Notes

- The 'KeyboardAwareScrollView' component is used in the code to handle the keyboard interactions and ensure that the content of the form remains visible and properly positioned when the keyboard is shown or hidden.

- In 'TextInput' component for name, number and email, 'onSelectionChange' property is used instead of 'onBlur' so that the user has real-time feedback on his input.

- 'step' property of 'Slider' is set to 0.1 in order to increase smoothness of slider. Because of that, 'Math.round()' is used to decide which emoji is going to be highlighted.

- 'Pressable' component is used instead of 'Button' because it has 'style' property and it can be easily manipulated.
