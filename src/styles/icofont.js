// eslint-disable-next-line no-unused-vars
import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import icofontEot from '-/icons/icofont.eot'
import icofontWoff2 from '-/icons/icofont.woff2'
import icofontWoff from '-/icons/icofont.woff'
import icofontTtf from '-/icons/icofont.ttf'

export const icofontFace = css`
  @font-face {
    font-family: "icofont";
    src: url(${icofontEot}) format("embedded-opentype"),
    url(${icofontWoff2}) format("woff2"),
    url(${icofontWoff}) format("woff"),
    url(${icofontTtf}) format("truetype");
  }
`

const icoBase = css`
  font-family: 'icofont' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

export const IcoClosedIssue = styled.span`
  ${icoBase}
  &:before {
    content: "\f101";
  }
`
export const IcoGithub = styled.span`
  ${icoBase}
  &:before {
    content: "\f102";
  }
`
export const IcoOpenIssue = styled.span`
  ${icoBase}
  &:before {
    content: "\f103";
  }
`
export const IcoStar = styled.span`
  ${icoBase}
  &:before {
    content: "\f104";
  }
`
