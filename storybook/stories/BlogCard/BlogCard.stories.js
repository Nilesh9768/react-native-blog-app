

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import BlogCard from './BlogCard'
import CenterView from '../CenterView';
import {text,color} from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-ondevice-knobs';

storiesOf('BlogCard', module)
    .addDecorator(withKnobs)
    .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
    .add('Default', () => (
        <BlogCard
            title={text('Blog Tilte','Default')}
        />
    ))
    .add('Varient-2',()=>(
        <BlogCard
            title={text('Blog Tilte','Varient-2')}
            varient='varient-2'
        />
    ))
    .add('Varient-3',()=>(
        <BlogCard
            title={text('Blog Tilte','Varient-3')}
            varient='varient-3'
        />
    ))