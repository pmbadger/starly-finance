import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Trade anything. No registration, no hassle.',
  bodyText: 'Trade any token on Ethereum in seconds, just by connecting your wallet.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  secondaryButton: null,
  // secondaryButton: {
  //   to: 'https://docs.pancakeswap.finance/',
  //   text: 'Learn',
  //   external: true,
  // },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'BNB', alt: 'BNB token' },
      { src: 'BTC', alt: 'BTC token' },
      { src: 'CAKE', alt: 'STLY token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'Earn passive income with crypto.',
  bodyText: 'Starly makes it easy to make your crypto work for you.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore',
    external: false,
  },
  secondaryButton: null,
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'pie', alt: 'Pie chart' },
      { src: 'stonks', alt: 'Stocks chart' },
      { src: 'folder', alt: 'Folder with stly token' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'STLY makes our world go round.',
  bodyText: 'STLY token is at the heart of the Starly ecosystem. Buy it, farm it, spend it!',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0x67C6c150914e6363F746796744636B7485B0A775',
    text: 'Buy STLY',
    external: false,
  },
  secondaryButton: null,
  images: {
    path: '/images/home/cake/',
    attributes: [
      { src: 'bottom-right', alt: 'Small 3d pancake' },
      { src: 'top-right', alt: 'Small 3d pancake' },
      { src: 'coin', alt: 'STLY token' },
      { src: 'top-left', alt: 'Small 3d pancake' },
    ],
  },
}
