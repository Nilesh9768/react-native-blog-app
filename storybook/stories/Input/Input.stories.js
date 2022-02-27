import { storiesOf } from '@storybook/react-native'
import Input from './Input'
import CenterView from '../CenterView/index'
import { text, select } from '@storybook/addon-knobs'

storiesOf('Input', module)
    .addDecorator(story => <CenterView>{story()}</CenterView>)
    .add('Default', () => (
        <Input
        // placeholder={text('Placeholder', 'Text input')}
        />
    ))
    .add('With Placeholder', () => (
        <Input
            placeholder={text('Placeholder', 'Placeholder')}
        />
    ))
    .add('Email', () => (
        <Input
            placeholder='Email'
            type='email-address'
        />
    ))
    .add('Password', () => (
        <Input
            placeholder='Password'
            isPassword={true}
        />
    ))