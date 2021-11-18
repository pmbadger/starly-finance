import React from 'react'
import { Button, useWalletModal, IconButton, Text } from 'pancakeswap-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const CustomButton = styled(Button)<{
  disable?: boolean
}>`
  position: relative;
  background: ${({ disable }) => (disable ? '#1F3258' : 'linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%)')};
  font-family: 'Futura PT';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: ${({ disable }) => (disable ? '#82C8F4' : '#ffffff')};
  svg {
    path {
      fill: ${({ disable }) => (disable ? '#82C8F4' : 'inner')};
    }
  }
`

const SwgUnlockWrapper = styled.div`
  width: 30px;
  height: 16px;
`

const SwgStarWrapper = styled.div`
  position: absolute;
  width: 9px;
  height: 10.38px;
  top: 9px;
  left: 195.86px;

  filter: drop-shadow(0px 0px 12px rgba(240, 231, 3, 0.63));
  transform: matrix(0, -1, -1, 0, 0, 0);
`

const UnlockIcon: React.FC = () => {
  return (
    <SwgUnlockWrapper>
      <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.69995 4.50005C3.69986 3.95924 3.87513 3.43299 4.19948 3.00025C4.52382 2.5675 4.97975 2.2516 5.49885 2.09994C6.01795 1.94827 6.57224 1.96903 7.07854 2.15909C7.58485 2.34914 8.01588 2.69826 8.30695 3.15405C8.4141 3.32166 8.58344 3.43985 8.77773 3.48261C8.97202 3.52537 9.17533 3.48919 9.34295 3.38205C9.51057 3.2749 9.62876 3.10556 9.67151 2.91127C9.71427 2.71698 9.6781 2.51366 9.57095 2.34605C9.10518 1.61685 8.41551 1.05834 7.60542 0.754317C6.79533 0.450293 5.9085 0.417145 5.07797 0.659846C4.24745 0.902548 3.51801 1.40801 2.9991 2.10041C2.48019 2.7928 2.19978 3.63479 2.19995 4.50005V6.50005H1.69895C1.3013 6.50031 0.920026 6.65847 0.638937 6.93974C0.357849 7.22102 0.199951 7.6024 0.199951 8.00005V14C0.199951 14.3979 0.357986 14.7794 0.639291 15.0607C0.920596 15.342 1.30213 15.5 1.69995 15.5H10.7C11.0978 15.5 11.4793 15.342 11.7606 15.0607C12.0419 14.7794 12.2 14.3979 12.2 14V8.00005C12.2 7.60222 12.0419 7.22069 11.7606 6.93939C11.4793 6.65808 11.0978 6.50005 10.7 6.50005H3.69995V4.50005ZM2.94995 8.00005H1.69995V14H10.7V8.00005H2.94995Z"
          fill="white"
        />
      </svg>
    </SwgUnlockWrapper>
  )
}

const StarXS: React.FC = () => {
  return (
    <SwgStarWrapper>
      <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.2942 3.8425L0.863844 4.50364L4.43056 5.90394L6.04808 9L6.80737 5.1549L11.2407 4.49636L7.67401 3.09086L6.05648 -1.74704e-07L5.2942 3.8425Z"
          fill="#FFDF6D"
        />
      </svg>
    </SwgStarWrapper>
  )
}

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  // eslint-disable-next-line react/destructuring-assignment
  const { text, icon, iconPosition } = props

  const StyledText = styled(Text)`
    font-family: 'Futura PT';
  `

  return icon ? (
    <IconButton
      onClick={onPresentConnectModal}
      {...props}
      startIcon={iconPosition === 'start' ? icon : null}
      endIcon={iconPosition === 'end' ? icon : null}
    >
      <StyledText>{t(text || 'Connect Wallet')}</StyledText>
    </IconButton>
  ) : (
    <Button onClick={onPresentConnectModal} {...props}>
      <StyledText>{t(text || 'Connect Wallet')}</StyledText>
    </Button>
  )
}

const StyledConnectWalletButton = styled(ConnectWalletButton)`
  padding: 12px 7px;
  width: 158px;
  height: 45px;
  background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);
  border-radius: 12px;
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 21px;

  img {
    position: absolute;
    margin-left: 130px;
    margin-top: -15px;
  }
`

export const ConnectWalletButtonWithStar = () => {
  return (
    <StyledConnectWalletButton
      text="Connect wallet"
      icon={<img alt="star" src="/images/star.svg" />}
      iconPosition="end"
    />
  )
}

export const StyledConnectWalletButtonExchange = styled(ConnectWalletButton)`
  height: 74px;
  padding: 24px 32px;
  font-style: normal;
  font-weight: 450;
  font-size: 20px;
  line-height: 26px;
  width: 100%;
  background: linear-gradient(260.3deg, #058fca -29.78%, #2e4bb5 118.84%);

  img {
    margin-right: 26px;
  }
`

export const ConnectWalletBtnWithUnlockAndStar = () => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  return (
    <CustomButton onClick={onPresentConnectModal} startIcon={<UnlockIcon />}>
      Unlock Wallet
      <StarXS />
    </CustomButton>
  )
}

export default ConnectWalletButton
