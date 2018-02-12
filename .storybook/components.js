import React from 'react'
import { storiesOf } from '@storybook/react'

import '+/global.sass'

import ImageTag from '~/components/ImageTag'

storiesOf('ImageTag')
  .add('with logo.svg', () => (
    <ImageTag src='logo.svg' />
  ))
