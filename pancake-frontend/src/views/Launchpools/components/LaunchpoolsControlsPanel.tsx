import React from 'react'
import { Text, Button, Toggle } from 'pancakeswap-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { usePollFarmsData } from 'state/farms/hooks'
import LaunchpoolsTabButtons from './LaunchpoolsTabButtons'

interface Props {
  isArchived: boolean
  stakedOnly: boolean
  setStakedOnly: (stakedOnly: boolean) => void
  setQuery: (value: string) => void
  setSortOption: (value: string) => void
}

const HarvestButton = styled(Button)`
  background: #255aba33;
  width: 140px;
  height: 54px;
  border-radius: 12px;
  font-family: 'Futura PT';
  color: #82c8f4;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  margin-bottom: 20px;
`
const ViewControls = styled.div`
  flex-wrap: wrap;
  display: flex;
  width: 80%;
  justify-content: space-between;
  max-width: 1193px;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    > div {
      padding: 0;
    }
  }
`
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 6.5vw;
  margin-top: 5px;
  margin-right: 7vw;
  margin-bottom: 20px;

  ${Text} {
    margin-left: 13px;
    font-family: 'Futura PT';
    color: #82c8f4;
    font-size: 14px;
    line-height: 18px;
  }
`

const ViewsControlsPanel: React.FC<Props> = ({ isArchived, stakedOnly, setStakedOnly, setQuery, setSortOption }) => {
  const { t } = useTranslation()

  usePollFarmsData(isArchived)

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <ViewControls>
      <LaunchpoolsTabButtons />
      <ToggleWrapper>
        <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="lg" />
        <Text>{t('Staked Only')}</Text>
      </ToggleWrapper>
      <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
      <Select
        options={[
          {
            label: t('All'),
            value: 'all',
          },
          {
            label: t('Hot'),
            value: 'hot',
          },
          {
            label: t('APR'),
            value: 'apr',
          },
          {
            label: t('Multiplier'),
            value: 'multiplier',
          },
          {
            label: t('Earned'),
            value: 'earned',
          },
          {
            label: t('Liquidity'),
            value: 'liquidity',
          },
        ]}
        onChange={handleSortOptionChange}
      />
      <HarvestButton>Harvest All</HarvestButton>
    </ViewControls>
  )
}

export default ViewsControlsPanel
