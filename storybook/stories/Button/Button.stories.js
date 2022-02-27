import { action } from '@storybook/addon-actions';
import { text, color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, Button } from 'react-native';
import CustomButton from './Button';
import CenterView from '../CenterView';

storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => (
    <CustomButton
      onPress={action('Tapped Default Button')}
      size="small"
      backgroundColor={color('Background Color','#0099ff')}
      color={color('Color','white')}
    >{text('Button Text','Default')}</CustomButton>
  ))
  .add('Outline', () => (
    <CustomButton
      onPress={action('tapped-outline')}
      outline={true}
      color={color('Color','#0099ff')}
        >
        {text('Button Text','Outline')}
    </ CustomButton>
      ))