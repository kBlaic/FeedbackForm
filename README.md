# FeedbackForm

This is code for feedback form in React Native.

Two libraries that are used in this code can be installed with the following commands:

npm install @react-native-community/slider --save
npm i react-native-keyboard-aware-scroll-view --save



The 'KeyboardAwareScrollView' component is used in the code to handle the keyboard interactions and ensure that the content of the form remains visible and properly positioned when the keyboard is shown or hidden.
In 'TextInput' component for name, number and email, 'onSelectionChange' property is used instead of 'onBlur' so that the user has real-time feedback on his input. 
'step' property of 'Slider' is set to 0.1 in order to increase smoothness of slider. Because of that, 'Math.round()' is used to decide which emoji is going to be highlighted.
'Pressable' component is used instead of 'Button' because it has 'style' property and it can be easily manipulated.