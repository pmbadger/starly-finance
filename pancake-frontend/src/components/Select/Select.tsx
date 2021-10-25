import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { ChevronDownIcon, Text } from 'pancakeswap-uikit'

const DropDownHeader = styled.div`
  width: 84px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 25px 0 17px;
  border-radius: 12px;
  background: #131c32;
  transition: border-radius 0.15s;

  ${Text} {
    font-family: 'FuturaPT-Medium';
    font-size: 14px;
    line-height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const DropDownListContainer = styled.div`
  min-width: 84px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: #131c32;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 84px;
  }
`

const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number }>`
  cursor: pointer;
  width: 90px;
  position: relative;
  border-radius: 12px;
  height: 54px;
  user-select: none;
  margin-bottom: 20px;

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        border-bottom: 1px solid #131c32;
        box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
        border-radius: 12px 12px 0 0;
        font-family: 'FuturaPT-Medium';
      }

      ${DropDownListContainer} {
        height: auto;
        width: 100%;
        transform: scaleY(1);
        opacity: 1;
        border-top-width: 0;
        border-radius: 0 0 12px 12px;
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 12px;

  ${Text} {
    font-family: 'FuturaPT-Medium';
    font-size: 14px;
    line-height: 18px;
  }

  &:hover {
    background: #255aba33;
  }
`

export interface SelectProps {
  options: OptionProps[]
  onChange?: (option: OptionProps) => void
}

export interface OptionProps {
  label: string
  value: any
}

const Select: React.FunctionComponent<SelectProps> = ({ options, onChange }) => {
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen)
    event.stopPropagation()
  }

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    setIsOpen(false)

    if (onChange) {
      onChange(options[selectedIndex])
    }
  }

  useEffect(() => {
    setContainerSize({
      width: dropdownRef.current.offsetWidth, // Consider border
      height: dropdownRef.current.offsetHeight,
    })

    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <DropDownContainer isOpen={isOpen} ref={containerRef} {...containerSize}>
      {containerSize.width !== 0 && (
        <DropDownHeader onClick={toggling}>
          <Text>{options[selectedOptionIndex].label}</Text>
        </DropDownHeader>
      )}
      <ChevronDownIcon color="text" onClick={toggling} />
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option, index) =>
            index !== selectedOptionIndex ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                <Text>{option.label}</Text>
              </ListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select
