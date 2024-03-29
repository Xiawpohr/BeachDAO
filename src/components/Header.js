import React, { useState } from 'react'
import styled from 'styled-components'
import Web3Status from './Web3Status'
import LauchActivityModal from './LauchActivityModal'
import DonationModal from './DonationModal'

const HeaderWrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.navyBlue};
  letter-spacing: 1px;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;

  > *:not(:first-child) {
    margin-left: 2.5rem;
  }
`

const HeaderButton = styled.button`
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.navyBlue};
  background-color: transparent;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`

export default function Header() {
  const [openLauchModal, setOpenLauchModal] = useState(false)
  const [openDonateModal, setOpenDonateModal] = useState(false)

  return (
    <HeaderWrapper>
      <HeaderLogo>BeachDAO</HeaderLogo>
      <HeaderActions>
        <HeaderButton onClick={() => { setOpenLauchModal(true) }}>發起淨灘</HeaderButton>
        <HeaderButton onClick={() => { setOpenDonateModal(true) }}>捐款</HeaderButton>
        <Web3Status />
      </HeaderActions>
      <LauchActivityModal
        open={openLauchModal}
        handleClose={() => { setOpenLauchModal(false) }}
      />
      <DonationModal
        open={openDonateModal}
        handleClose={() => { setOpenDonateModal(false) }}
      />
    </HeaderWrapper>
  )
}
