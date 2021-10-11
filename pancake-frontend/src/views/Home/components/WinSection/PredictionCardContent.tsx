import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Text, Skeleton, Link, Button, ArrowForwardIcon, Heading } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import useRefresh from 'hooks/useRefresh'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { getTotalWon } from 'state/predictions/helpers'
import { usePriceEthBusd } from 'state/farms/hooks'

const StyledLink = styled(Link)`
  width: 100%;
`

const PredictionCardContent = () => {
  const { t } = useTranslation()
  const { slowRefresh } = useRefresh()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [loadData, setLoadData] = useState(false)
  const ethBusdPrice = usePriceEthBusd()
  const [ethWon, setEthWon] = useState(0)
  const [ethWonInUsd, setEthWonInUsd] = useState(0)

  const localisedEthUsdString = formatLocalisedCompactNumber(ethWonInUsd)
  const ethWonText = t('$%ethWonInUsd% in ETH won so far', { ethWonInUsd: localisedEthUsdString })
  const [pretext, wonSoFar] = ethWonText.split(localisedEthUsdString)

  useEffect(() => {
    if (isIntersecting) {
      setLoadData(true)
    }
  }, [isIntersecting])

  useEffect(() => {
    const fetchMarketData = async () => {
      const totalWon = await getTotalWon()
      setEthWon(totalWon)
    }

    if (loadData) {
      fetchMarketData()
    }
  }, [slowRefresh, loadData])

  useEffect(() => {
    if (ethBusdPrice.gt(0) && ethWon > 0) {
      setEthWonInUsd(ethBusdPrice.times(ethWon).toNumber())
    }
  }, [ethBusdPrice, ethWon])

  return (
    <>
      <Flex flexDirection="column" mt="48px">
        <div ref={observerRef} />
        <Text color="#280D5F" bold fontSize="16px">
          {t('Prediction')}
        </Text>
        {ethWonInUsd ? (
          <Heading color="#280D5F" my="8px" scale="xl" bold>
            {pretext}
            {localisedEthUsdString}
          </Heading>
        ) : (
          <>
            <Skeleton width={230} height={40} my="8px" />
            <div ref={observerRef} />
          </>
        )}
        <Text color="#280D5F" mb="24px" bold fontSize="16px">
          {wonSoFar}
        </Text>
        <Text color="#280D5F" mb="40px">
          {t('Will ETH price rise or fall? guess correctly to win!')}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <StyledLink href="/prediction" id="homepage-prediction-cta">
          <Button width="100%">
            <Text bold color="invertedContrast">
              {t('Play')}
            </Text>
            <ArrowForwardIcon ml="4px" color="invertedContrast" />
          </Button>
        </StyledLink>
      </Flex>
    </>
  )
}

export default PredictionCardContent
