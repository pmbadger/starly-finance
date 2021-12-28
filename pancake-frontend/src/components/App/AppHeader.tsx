import React from 'react'
import styled from 'styled-components'
import { Text, Flex, IconButton, ArrowBackIcon, NotificationDot } from 'pancakeswap-uikit'
import { Link } from 'react-router-dom'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
  backId?: string | undefined
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const CardTitle = styled(Text)`
  font-family: 'Futura PT Bold';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 120%;
  margin-bottom: 20px;
`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false, backId }) => {
  const [expertMode] = useExpertModeManager()

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton id={backId} as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex flexDirection="column">
          <CardTitle>{title}</CardTitle>
          <Flex alignItems="center">
            {helper && <QuestionHelper text={helper} mr="4px" />}
            <Text color="textSubtle" fontSize="14px">
              {subtitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {!noConfig && (
        <Flex alignItems="center">
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
          {/* <Transactions /> */}
        </Flex>
      )}
    </AppHeaderContainer>
  )
}

export default AppHeader
