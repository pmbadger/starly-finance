import {
  ShapeWrapper,
  ShapeProps,
  LiteSVGBody,
  CircleProps,
  ImageProps,
  CardMainBgProps,
  TextProps,
  CardMainWrapperProps,
  MeritCardProps,
} from '../types'
import Images from './images'

const btcWrapper: ShapeWrapper = {
  width: '50px',
  height: '50px',
  absTop: '203px',
  absLeft: '1104px',
  background: 'linear-gradient(216.48deg, #FFD467 -5.32%, #F1A22A 111.59%)',
}

const btcSignBody: LiteSVGBody[] = [
  {
    pathD:
      'M17.0485 10.9198C18.1507 9.91748 18.6397 8.5413 17.9341 6.65595C16.9737 4.07842 14.4804 3.7959 11.5652 4.3063L10.5816 0.637653L8.37533 1.22882L9.33191 4.8013C8.75143 4.95684 8.16278 5.12694 7.57693 5.29674L6.61308 1.70153L4.40876 2.29195L5.39116 5.95996C4.91609 6.09784 4.44947 6.23294 3.99139 6.35568L3.98848 6.34483L0.945009 7.15898L1.58441 9.54361C1.58441 9.54361 3.20537 9.07603 3.1866 9.11334C4.08008 8.8746 4.51248 9.32165 4.71784 9.75251L5.83843 13.9319L7.41153 19.8027C7.44843 20.0978 7.40472 20.5967 6.78033 20.7649C6.81553 20.7826 5.17535 21.1947 5.17535 21.1947L5.45226 23.9786L8.32288 23.2094C8.85795 23.0667 9.38576 22.9343 9.90249 22.8003L10.8986 26.5101L13.1025 25.9203L12.1181 22.249C12.7277 22.0991 13.3144 21.9477 13.8858 21.7938L14.8644 25.4482L17.0706 24.857L16.0793 21.1526C19.73 19.9433 22.0728 18.3018 21.4508 14.6893C20.9503 11.7808 19.2911 10.8672 17.0485 10.9198ZM8.33308 7.90784C9.57738 7.57443 13.3832 6.1247 14.0889 8.75617C14.7644 11.2793 10.7733 12.0328 9.52778 12.3665L8.33308 7.90784ZM11.4472 19.5338L10.1309 14.6174C11.6258 14.2164 16.1983 12.5249 16.9739 15.4172C17.7178 18.1909 12.9429 19.1319 11.4472 19.5338Z',
    pathFill: 'white',
  },
]

const btcSign: ShapeProps = {
  id: '1',
  width: '22',
  height: '27',
  shapeWrapper: btcWrapper,
  SVGBody: btcSignBody,
}

const eosWrapper: ShapeWrapper = {
  width: '54.25px',
  height: '54.25px',
  absTop: '475.25px',
  absLeft: '1421.87px',
  background: 'linear-gradient(217.65deg, #222429 -5.23%, #060607 111.5%)',
}

const eosSignBody: LiteSVGBody[] = [
  {
    pathD:
      'M10.4906 0.305115L3.76392 9.36266L0.946777 22.7521L10.4906 28.4341L20.0343 22.7521L17.1597 9.3064L10.4906 0.305115ZM2.49908 22.1332L4.62631 11.9505L9.45569 26.2963L2.49908 22.1332ZM5.31622 9.64395L10.4906 2.66795L15.6649 9.64395L10.4906 24.9461L5.31622 9.64395ZM11.4679 26.2963L16.2973 11.9505L18.4245 22.1332L11.4679 26.2963Z',
    pathFill: 'white',
  },
]

const eosSign: ShapeProps = {
  id: '2',
  width: '21',
  height: '29',
  shapeWrapper: eosWrapper,
  SVGBody: eosSignBody,
}

const ethWrapper: ShapeWrapper = {
  width: '61.03px',
  height: '61.03px',
  absTop: '269.32px',
  absLeft: '1620.75px',
  background: 'linear-gradient(220.38deg, #F5F5F5 0%, #AEB9D5 109.51%)',
}

const ethSignBody: LiteSVGBody[] = [
  {
    pathD: 'M12.2576 0.619934L11.9998 1.49562V26.9037L12.2576 27.1609L24.0515 20.1894L12.2576 0.619934Z',
    pathFill: '#343434',
  },
  {
    pathD: 'M12.2549 0.619934L0.460693 20.1894L12.2549 27.1609V14.8285V0.619934Z',
    pathFill: '#8C8C8C',
  },
  {
    pathD: 'M12.2576 29.3949L12.1123 29.572V38.6228L12.2576 39.0469L24.0587 22.427L12.2576 29.3949Z',
    pathFill: '#3C3C3B',
  },
  {
    pathD: 'M12.2549 39.0469V29.3949L0.460693 22.427L12.2549 39.0469Z',
    pathFill: '#8C8C8C',
  },
  {
    pathD: 'M12.2532 27.1605L24.0471 20.189L12.2532 14.8281V27.1605Z',
    pathFill: '#141414',
  },
  {
    pathD: 'M0.460693 20.189L12.2549 27.1605V14.8281L0.460693 20.189Z',
    pathFill: '#393939',
  },
]

const ethSign: ShapeProps = {
  id: '3',
  width: '25',
  height: '40',
  shapeWrapper: ethWrapper,
  SVGBody: ethSignBody,
}

const linkWrapper: ShapeWrapper = {
  width: '46.34px',
  height: '46.34px',
  absTop: '333.97px',
  absLeft: '1272.68px',
  background: 'linear-gradient(208.45deg, #5A87FF -7.45%, #2A5ADA 112.96%)',
}

const linkSignBody: LiteSVGBody[] = [
  {
    pathD:
      'M10.8531 0.127625L8.67383 1.3951L2.73522 4.86687L0.555908 6.13434V18.1478L2.73522 19.4153L8.72832 22.887L10.9076 24.1545L13.0869 22.887L18.9711 19.4153L21.1504 18.1478V6.13434L18.9711 4.86687L13.0324 1.3951L10.8531 0.127625ZM4.91453 15.6128V8.66929L10.8531 5.19752L16.7918 8.66929V15.6128L10.8531 19.0846L4.91453 15.6128Z',
    pathFill: 'white',
  },
]

const linkSign: ShapeProps = {
  id: '4',
  width: '22',
  height: '25',
  shapeWrapper: linkWrapper,
  SVGBody: linkSignBody,
}

const solWrapper: ShapeWrapper = {
  width: '44.08px',
  height: '44.08px',
  absTop: '93.24px',
  absLeft: '1394.74px',
  background: 'linear-gradient(211.56deg, #D02CFA -0.93%, #0CF3A9 99.39%)',
}

const solComplexSVGBody = `
  <g clip-path="url(#clip0_23:110)" filter="url(#filter0_d_23:110)">
    <path d="M8.03724 11.9559C8.15053 11.8365 8.30631 11.7669 8.47153 11.7669H23.4545C23.7283 11.7669 23.8652 12.1152 23.6717 12.3192L20.7119 15.4388C20.5986 15.5582 20.4428 15.6279 20.2776 15.6279H5.2946C5.02081 15.6279 4.88392 15.2796 5.07746 15.0756L8.03724 11.9559Z" fill="white"></path>
    <path d="M8.03675 0.308301C8.15477 0.188889 8.31054 0.119232 8.47104 0.119232H23.4541C23.7278 0.119232 23.8647 0.467517 23.6712 0.671513L20.7114 3.79115C20.5981 3.91056 20.4423 3.98022 20.2771 3.98022H5.29412C5.02032 3.98022 4.88343 3.63194 5.07697 3.42794L8.03675 0.308301Z" fill="white"></path>
    <path d="M20.7119 6.0948C20.5986 5.97539 20.4428 5.90573 20.2776 5.90573H5.2946C5.02081 5.90573 4.88392 6.25402 5.07746 6.45801L8.03724 9.57765C8.15053 9.69707 8.30631 9.76672 8.47153 9.76672H23.4545C23.7283 9.76672 23.8652 9.41844 23.6717 9.21444L20.7119 6.0948Z" fill="white"></path>
  </g>
  <defs>
    <filter id="filter0_d_23:110" x="0.987793" y="0.119232" width="26.7737" height="23.5086" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_23:110"></feBlend>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_23:110" result="shape"></feBlend>
    </filter>
  </defs>
`

const solSign: ShapeProps = {
  id: '5',
  width: '28',
  height: '16',
  shapeWrapper: solWrapper,
  complexSVGBody: solComplexSVGBody,
}

const starlyWrapper: ShapeWrapper = {
  width: '135.62px',
  height: '135.62px',
  absTop: '230px',
  absLeft: '1338.23px',
  background: 'linear-gradient(180deg, #1B202F 0%, #1A2232 100%)',
  boxShadow: 'inset 0px 4px 24px #20314B;',
}

const starlyComplexSVGBody = `
  <path d="M36.6359 19.4214C36.977 18.9903 37.1957 18.4739 37.2686 17.9274C37.3415 17.3809 37.2659 16.8247 37.0498 16.318C34.9941 11.4989 32.9756 6.23443 30.6873 1.65438C29.7571 -0.220771 28.3618 0.102692 27.3758 1.72001C25.5154 4.739 23.5015 7.69235 22.0272 10.8989C13.7531 28.8768 10.4602 35.1351 11.8369 54.7257C11.8974 55.5649 12.2183 70.6645 13.1345 77.0306C13.3252 78.3479 15.46 78.9292 15.7623 77.6401C20.1994 59.4464 25.4456 52.349 30.0594 45.7203C35.9754 37.2306 45.9703 28.9097 47.9703 28.0658C42.6449 34.5398 37.594 41.0559 34.1197 48.6362C33.9582 48.9873 33.8702 49.3681 33.8614 49.755C33.8526 50.1419 33.9231 50.5264 34.0684 50.8846C34.2138 51.2428 34.4309 51.5668 34.7063 51.8366C34.9816 52.1063 35.3091 52.3158 35.6685 52.4521L57.4489 60.8247C57.7034 60.9239 57.9815 60.9436 58.2472 60.8812C58.513 60.8189 58.7539 60.6772 58.9386 60.4749C59.1233 60.2725 59.2433 60.0188 59.2828 59.7467C59.3224 59.4746 59.2798 59.1968 59.1605 58.9495L51.4213 42.4388C50.4585 40.4465 51.5282 38.3932 52.4398 36.4196C55.4583 29.9129 58.4256 23.3498 61.3929 16.7868C61.5353 16.4695 61.5836 16.1175 61.5319 15.7732C61.4802 15.4289 61.3308 15.107 61.1017 14.8463C60.8726 14.5856 60.5736 14.3974 60.2407 14.3042C59.9078 14.2109 59.5553 14.2168 59.2256 14.321C42.8821 19.5667 30.6687 29.6503 20.4459 42.917C20.4459 42.917 20.4087 42.917 20.4459 42.917C20.4831 42.917 23.2829 35.7211 25.4922 32.7256C27.8595 29.5144 36.6359 19.4214 36.6359 19.4214ZM9.19518 40.8497C9.19518 39.087 9.73469 35.5852 10.3719 33.0678C10.4206 32.8821 10.4115 32.6857 10.3459 32.5054C10.2803 32.325 10.1613 32.1693 10.005 32.0594C9.84873 31.9494 9.6627 31.8905 9.47211 31.8906C9.28152 31.8907 9.09555 31.9498 8.93938 32.0599C5.94328 34.177 3.19965 36.6357 0.762984 39.387C0.652682 39.5124 0.57774 39.6653 0.54596 39.8298C0.514179 39.9943 0.526722 40.1644 0.582281 40.3223C0.637841 40.4803 0.734386 40.6203 0.861869 40.7279C0.989353 40.8355 1.14311 40.9067 1.30715 40.934L7.76268 42.0544C7.9369 42.0853 8.11571 42.0773 8.2865 42.0309C8.4573 41.9845 8.61592 41.9009 8.75119 41.7861C8.88645 41.6712 8.99507 41.5278 9.06937 41.366C9.14367 41.2042 9.18186 41.0279 9.18123 40.8497H9.19518Z" fill="url(#paint0_linear_23:28)">
  </path>
  <defs>
    <linearGradient id="paint0_linear_23:28" x1="3.18148" y1="44.9328" x2="62.5505" y2="27.6398" gradientUnits="userSpaceOnUse">
      <stop stop-color="#314797"></stop>
      <stop offset="1" stop-color="#5CEFF9"></stop>
    </linearGradient>
  </defs>
`

const starlySign: ShapeProps = {
  id: '6',
  width: '62',
  height: '79',
  shapeWrapper: starlyWrapper,
  complexSVGBody: starlyComplexSVGBody,
}

export const shapes: ShapeProps[] = [btcSign, eosSign, linkSign, ethSign, starlySign, solSign]

const circle566: CircleProps = {
  id: '7',
  diameter: '566',
  absTop: '13px',
  absLeft: '1123.5px',
  SVGBody: `
    <circle cx="283.046" cy="282.546" r="282.046" stroke="url(#paint0_linear_22:18)"></circle>
    <defs>
      <linearGradient id="paint0_linear_22:18" x1="250.836" y1="-24.299" x2="363.854" y2="626.687" gradientUnits="userSpaceOnUse">
        <stop stop-color="#3A4669"></stop>
        <stop offset="1" stop-color="#3A4669" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
  `,
}

const circle340: CircleProps = {
  id: '8',
  diameter: '340',
  absTop: '97.76px',
  absLeft: '1319.02px',
  SVGBody: `
    <circle cx="169.549" cy="170.291" r="169.028" stroke="url(#paint0_linear_22:17)"></circle>
    <defs>
      <linearGradient id="paint0_linear_22:17" x1="80.8299" y1="382.201" x2="254.878" y2="-80.0443" gradientUnits="userSpaceOnUse">
        <stop stop-color="#3A4669"></stop>
        <stop offset="1" stop-color="#262E44"></stop>
      </linearGradient>
    </defs>
  `,
}

const circle453: CircleProps = {
  id: '9',
  diameter: '453',
  absTop: '58.21px',
  absLeft: '1163.06px',
  SVGBody: `
    <circle cx="226.093" cy="226.244" r="225.537" stroke="url(#paint0_linear_22:19)"></circle>
    <defs>
      <linearGradient id="paint0_linear_22:19" x1="677.602" y1="-29.1774" x2="46.3939" y2="410.464" gradientUnits="userSpaceOnUse">
        <stop stop-color="#3A4669"></stop>
        <stop offset="1" stop-color="#283048"></stop>
      </linearGradient>
    </defs>
  `,
}

const circle227: CircleProps = {
  id: '10',
  diameter: '227',
  absTop: '97.76px',
  absLeft: '1239.91px',
  SVGBody: `
    <circle cx="113.927" cy="113.782" r="112.518" stroke="url(#paint0_linear_22:20)"></circle>
    <defs>
      <linearGradient id="paint0_linear_22:20" x1="181.738" y1="-25.7955" x2="31.4237" y2="279.919" gradientUnits="userSpaceOnUse">
        <stop stop-color="#3A4669"></stop>
        <stop offset="1" stop-color="#3A4669" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
  `,
}

const circle114: CircleProps = {
  id: '11',
  diameter: '114',
  absTop: '267.29px',
  absLeft: '1276.07px',
  SVGBody: `<circle cx="56.5842" cy="56.8006" r="56.0092" stroke="#3A4669"></circle>`,
}

export const circles: CircleProps[] = [circle566, circle340, circle453, circle227, circle114]

const follinStar295: ShapeWrapper = {
  id: '12',
  width: '295px',
  height: '86px',
  absTop: '0',
  absLeft: '330px',
  background: Images.FallinStar295,
}

const follinStar163: ShapeWrapper = {
  id: '13',
  width: '163px',
  height: '109px',
  absTop: '1171px',
  absLeft: '897px',
  background: Images.FallinStar163,
}

const follinStar200: ShapeWrapper = {
  id: '14',
  width: '200px',
  height: '134px',
  absTop: '339px',
  absLeft: '1646px',
  background: Images.FallinStar200,
}

export const follinStars: ShapeWrapper[] = [follinStar295, follinStar163, follinStar200]

const lightRed: ImageProps = {
  id: '15',
  width: '1294px',
  height: '1255px',
  absTop: '508px',
  absLeft: '-797px',
  background: '#B03C66',
  opacity: 0.2,
  filter: 'blur(512px)',
}

const lightBlue: ImageProps = {
  id: '16',
  width: '1294px',
  height: '1255px',
  absTop: '-628px',
  absLeft: '1288px',
  background: '#3C72B0',
  opacity: 0.2,
  filter: 'blur(512px)',
}

const lightBlueFaint: ImageProps = {
  id: '17',
  width: '244.12px',
  height: '236.21px',
  absTop: '180.27px',
  absLeft: '1283.99px',
  background: '#3C72B0',
  opacity: 0.24,
  filter: 'blur(96px)',
}

export const lights: ImageProps[] = [lightRed, lightBlue, lightBlueFaint]

export const coinXXXL: ImageProps = {
  width: '229.5px',
  height: '240px',
  absTop: '-50px',
  absLeft: '44px',
  background: Images.CoinXXXL,
  filter: 'drop-shadow(-20px 4px 40px rgba(103, 73, 26, 0.34))',
}

const star1: ImageProps = {
  id: '18',
  width: '17',
  height: '17',
  absTop: '497.85px',
  absLeft: '1583.49px',
  background: '#313A54',
}

const star2: ImageProps = {
  id: '19',
  width: '17',
  height: '17',
  absTop: '93.24px',
  absLeft: '1512.28px',
  background: '#A0B4E9',
}

const star3: ImageProps = {
  id: '20',
  width: '17',
  height: '17',
  absTop: '95.5px',
  absLeft: '1241.04px',
  background: '#A0B4E9',
}

const star4: ImageProps = {
  id: '21',
  width: '16',
  height: '16',
  absTop: '261.64px',
  absLeft: '1311.11px',
  background: '#FFFFFF',
}

export const stars: ImageProps[] = [star1, star2, star3, star4]

const rocket: ImageProps = {
  width: '142px',
  height: '268px',
  absTop: '-12px',
  absLeft: '230px',
  background: Images.Rocket,
}

const coinBlue: ImageProps = {
  width: '300px',
  height: '215px',
  absTop: '55px',
  absLeft: '90px',
  background: Images.CoinBlue,
  filter: 'drop-shadow(0px 40px 48px rgba(17, 21, 34, 0.49))',
}

const spaceman: ImageProps = {
  width: '148px',
  height: '168px',
  absTop: '88px',
  absLeft: '242px',
  background: Images.Spaceman,
  filter: 'drop-shadow(0px 40px 48px rgba(17, 21, 34, 0.49))',
}

const rocketLight: ImageProps = {
  width: '213px',
  height: '214px',
  absTop: '124px',
  absLeft: '275px',
  background: 'rgba(190, 70, 32, 0.52)',
  filter: 'blur(128px)',
}

const coinLight: ImageProps = {
  width: '213px',
  height: '214px',
  absTop: '124px',
  absLeft: '275px',
  background: 'rgba(18, 122, 195, 0.66)',
  filter: 'blur(128px)',
}

const manLight: ImageProps = {
  width: '213px',
  height: '214px',
  absTop: '124px',
  absLeft: '275px',
  background: 'rgba(219, 194, 140, 0.25)',
  filter: 'blur(128px)',
}

const coinStars: ImageProps[] = [
  {
    id: '22',
    width: '23',
    height: '23',
    absTop: '68.58px',
    absLeft: '300px',
    background: '#FFDF6D',
    filter: 'drop-shadow(0px 0px 12px rgba(240, 231, 3, 0.63))',
    zIndex: '2',
  },
  {
    id: '23',
    width: '40',
    height: '40',
    absTop: '20px',
    absLeft: '330px',
    background: '#B5C9FF',
    filter: 'drop-shadow(0px 0px 12px rgba(181, 201, 255, 0.6))',
    zIndex: '2',
  },
]

const cardMainRocket: CardMainBgProps = {
  imageBg: rocket,
  lightBg: rocketLight,
}

const cardMainCoin: CardMainBgProps = {
  imageBg: coinBlue,
  lightBg: coinLight,
  stars: coinStars,
}

const cardMainMan: CardMainBgProps = {
  imageBg: spaceman,
  lightBg: manLight,
}

const card1TextFirst: TextProps = {
  maxWidth: '185px',
  marginBottom: '22px',
  fontFamily: 'HelveticaNeueCyr',
  fontWeight: '550',
  fontSize: '18px',
  lineHeight: '25px',
  color: '#FFFFFF',
  text: 'Stake Tokens in Farm and Earn Up to:',
}

const card1TextSecond: TextProps = {
  maxWidth: '200px',
  marginBottom: '26.4px',
  fontFamily: 'Futura PT Bold',
  fontWeight: 'bold',
  fontSize: '32px',
  lineHeight: '41px',
  color: '#FFDF6D',
  text: '381.29% APY',
}

const card1TextBtn = 'Start Farming Now!'
const card1Link = '/farms'

const card2TextFirst: TextProps = {
  maxWidth: '250px',
  marginBottom: '25.4px',
  fontFamily: 'HelveticaNeueCyr',
  fontWeight: '550',
  fontSize: '18px',
  lineHeight: '25px',
  color: '#FFFFFF',
  text: 'Enjoy Referral Rewards From:',
}

const card2TextSecond: TextProps = {
  maxWidth: '240px',
  marginBottom: '26.6px',
  fontFamily: 'Futura PT Bold',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '31px',
  color: '#FFDF6D',
  text: 'Farms, Launchpools, Swaps',
}

const card2TextBtn = 'Invite and Start Earn'
const card2Link = '#'

const card3TextFirst: TextProps = {
  maxWidth: '280px',
  marginBottom: '0',
  fontFamily: 'HelveticaNeueCyr',
  fontWeight: '550',
  fontSize: '18px',
  lineHeight: '25px',
  color: '#FFFFFF',
  text: 'Receive Rewards as a Liquidity Provider:',
}

const card3TextSecond: TextProps = {
  maxWidth: '210px',
  marginBottom: '26.6px',
  fontFamily: 'Futura PT  ',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '31px',
  color: '#FFDF6D',
  text: 'Earn income from swap transactions',
}

const card3TextBtn = 'Add Liquidity'
const card3Link = '/liquidity'

export const cardsMainProps: CardMainWrapperProps[] = [
  {
    cardMainBgProps: cardMainRocket,
    cardMainContentProps: {
      textFirst: card1TextFirst,
      textSecond: card1TextSecond,
      textBtn: card1TextBtn,
      textLink: card1Link,
    },
    id: '30',
  },
  {
    cardMainBgProps: cardMainCoin,
    cardMainContentProps: {
      textFirst: card2TextFirst,
      textSecond: card2TextSecond,
      textBtn: card2TextBtn,
      textLink: card2Link,
    },
    id: '31',
  },
  {
    cardMainBgProps: cardMainMan,
    cardMainContentProps: {
      textFirst: card3TextFirst,
      textSecond: card3TextSecond,
      textBtn: card3TextBtn,
      textLink: card3Link,
    },
    id: '32',
  },
]

const coinBtcTop: ImageProps = {
  id: '24',
  width: '86px',
  height: '79px',
  absTop: '-13px',
  absLeft: '709px',
  background: Images.CoinBtcTop,
}

const coinBtcRight: ImageProps = {
  id: '25',
  width: '65px',
  height: '65px',
  absTop: '58px',
  absLeft: '1142px',
  background: Images.CoinBtcRight,
}

const coinBtcBottom: ImageProps = {
  id: '26',
  width: '69px',
  height: '47px',
  absTop: '170px',
  absLeft: '560px',
  background: Images.CoinBtcBottom,
}

const coinBtcLeft: ImageProps = {
  id: '27',
  width: '45px',
  height: '49px',
  absTop: '74px',
  absLeft: '-16px',
  background: Images.CoinBtcLeft,
}

export const coinsBtc: ImageProps[] = [coinBtcTop, coinBtcBottom, coinBtcLeft, coinBtcRight]

export const LaunchpoolTextFirst: TextProps = {
  maxWidth: '377px',
  marginBottom: '14px',
  fontFamily: 'HelveticaNeueCyr',
  fontWeight: '550',
  fontSize: '18px',
  lineHeight: '25px',
  color: '#FFFFFF',
  text: 'Launchpools - An Easy Way to Earn Crypto',
}

export const LaunchpoolTextSecond: TextProps = {
  maxWidth: '400px',
  marginBottom: '0',
  fontFamily: 'Futura PT',
  fontWeight: 'bold',
  fontSize: '32px',
  lineHeight: '38px',
  color: '#FFDF6D',
  text: 'Stake your STLY in exchange for even more tokens',
}

const walletIconFirstWrapper: ShapeWrapper = {
  width: '58px',
  height: '58px',
  absTop: '24px',
  absLeft: '20px',
  background: '#3375BB',
}

const walletIconFirstSVGBody: LiteSVGBody[] = [
  {
    pathD:
      'M14.999 1.35203L15.765 0.354972C15.5445 0.185642 15.2743 0.0938721 14.9964 0.0938721C14.7185 0.0938721 14.4483 0.185642 14.2278 0.354972L14.999 1.35203ZM28.166 5.22118H29.4218C29.4239 5.05447 29.3928 4.88903 29.331 4.73457C29.2694 4.58008 29.1765 4.43912 29.0601 4.32003C28.9434 4.20124 28.8041 4.10672 28.6506 4.04197C28.4968 3.97696 28.3321 3.94348 28.166 3.94285V5.22118ZM14.999 32.1172L14.3013 33.1646C14.5069 33.3023 14.7488 33.3758 14.9964 33.3756C15.2442 33.3756 15.4862 33.3023 15.6922 33.1646L14.999 32.1172ZM1.8441 5.22118V3.95957C1.67738 3.96023 1.5126 3.99369 1.35877 4.05869C1.20537 4.12361 1.06626 4.21809 0.949384 4.33678C0.832881 4.45585 0.740831 4.59618 0.679044 4.7513C0.616627 4.90581 0.585758 5.07129 0.588278 5.23791L1.8441 5.22118ZM14.2336 2.3433C19.9328 6.75829 26.4596 6.47701 28.1711 6.47701V3.95957C26.3973 3.95957 20.7154 4.18486 15.7823 0.355625L14.2336 2.3433ZM26.9153 5.19864C26.8201 11.033 26.5723 15.1499 26.0991 18.1965C25.6261 21.2429 24.9728 23.0228 24.1109 24.2954C23.2489 25.5678 22.1457 26.3956 20.5294 27.3586C18.9131 28.3216 16.8463 29.3914 14.3013 31.0751L15.72 33.1646C18.1305 31.5598 20.1356 30.5345 21.8412 29.5155C23.5611 28.5789 25.0533 27.2755 26.2118 25.6973C27.3376 24.0075 28.1093 21.7553 28.6051 18.5787C29.1007 15.4021 29.3543 11.1282 29.4495 5.23791L26.9153 5.19864ZM15.72 31.0751C13.1916 29.3856 11.1305 28.3381 9.52511 27.3644C7.91977 26.3905 6.81651 25.6128 5.94949 24.2954C5.08244 22.9778 4.37826 21.2261 3.89356 18.1965C3.40888 15.1667 3.19582 11.033 3.09992 5.19864L0.588278 5.23791C0.683548 11.1282 0.942944 15.4138 1.43278 18.5787C1.92262 21.7437 2.67187 23.9967 3.82083 25.6973C4.97373 27.2762 6.46219 28.5803 8.17917 29.5155C9.86883 30.5352 11.8907 31.5598 14.3013 33.1646L15.72 31.0751ZM1.8441 6.47635C3.53376 6.47635 10.0658 6.75829 15.765 2.34265L14.2278 0.354972C9.28309 4.18423 3.6007 3.95892 1.83831 3.95892L1.8441 6.47635Z',
    pathFill: '#FFFDFA',
  },
]

export const walletIconFirst: ShapeProps = {
  width: '30',
  height: '34',
  shapeWrapper: walletIconFirstWrapper,
  SVGBody: walletIconFirstSVGBody,
}

const walletIconSecondWrapper: ShapeWrapper = {
  width: '35px',
  height: '34px',
  absTop: '50px',
  absLeft: '57.98px',
  background: '#FFFDFA',
}

const walletIconSecondSVGBody = `
  <path d="M17.9794 32.6924C26.646 32.6924 33.6717 25.6666 33.6717 17C33.6717 8.33342 26.646 1.30774 17.9794 1.30774C9.31279 1.30774 2.28711 8.33342 2.28711 17C2.28711 25.6666 9.31279 32.6924 17.9794 32.6924Z" fill="none"></path>
  <path d="M17.9795 7.71373C14.1395 7.71373 11.001 10.8338 11.001 14.6924C11.001 15.4676 11.1305 16.2247 11.3704 16.9632C11.5363 17.4618 12.0904 17.7384 12.6074 17.5724C13.1056 17.4062 13.3826 16.8524 13.2163 16.3355C13.0141 15.7609 12.9203 15.1537 12.9396 14.5447C13.0136 11.9416 15.1182 9.80027 17.7212 9.67076C20.6195 9.52323 23.0195 11.8309 23.0195 14.6924C23.0195 17.3693 20.9149 19.5663 18.2751 19.7139C18.2751 19.7139 17.2962 19.7693 16.8165 19.843L16.2628 19.9353C16.2072 19.9537 16.152 19.8985 16.1705 19.843L16.3364 19.0306L17.2411 14.8583C17.3518 14.3414 17.0197 13.8243 16.5026 13.7137C15.9857 13.6029 15.4687 13.9351 15.358 14.452L13.1611 24.7166C13.0504 25.2335 13.3826 25.7505 13.8996 25.8612C14.4164 25.972 14.9334 25.6398 15.0441 25.1228C15.0626 25.0121 15.358 23.6643 15.358 23.6643C15.5795 22.6304 16.4287 21.8737 17.4258 21.7445C17.6474 21.7077 18.5149 21.6522 18.5149 21.6522C22.1151 21.3751 24.9581 18.3661 24.9581 14.692C24.9581 10.8334 21.8197 7.71338 17.9795 7.71338V7.71373Z" fill="#191326"></path>
  <path d="M18.478 23.7756C17.8503 23.6464 17.2227 24.0343 17.0931 24.6803C16.964 25.308 17.3517 25.9356 17.9979 26.0648C18.6255 26.1939 19.2532 25.8066 19.3824 25.1601C19.5115 24.5137 19.124 23.9047 18.478 23.7756Z" fill="#E6007A"></path>
  <g style="mix-blend-mode:multiply" opacity="0.05">
    <g style="mix-blend-mode:multiply" opacity="0.05">
      <path d="M17.9793 32.1807C26.3634 32.1807 33.1602 25.384 33.1602 16.9998C33.1602 8.61576 26.3634 1.81909 17.9793 1.81909C9.59525 1.81909 2.79858 8.61576 2.79858 16.9998C2.79858 25.384 9.59525 32.1807 17.9793 32.1807Z" stroke="#191326"></path>
    </g>
  </g>
`

export const walletIconSecond: ShapeProps = {
  width: '35',
  height: '34',
  shapeWrapper: walletIconSecondWrapper,
  complexSVGBody: walletIconSecondSVGBody,
}

const meritCardTitle: TextProps = {
  maxWidth: '100%',
  marginBottom: '13px',
  fontFamily: 'Futura PT',
  fontWeight: '600',
  fontSize: '24px',
  lineHeight: '29px',
  color: '#FFFFFF',
  text: 'Global Exposure',
}

const meritCardText: TextProps = {
  maxWidth: '280px',
  marginBottom: '0',
  fontFamily: 'HelveticaNeueCyr',
  fontWeight: '300',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#82C8F4',
  text: 'Get access to 100k+ Starly users across the globe.',
}

const meritCardContent: MeritCardProps = {
  id: '1',
  image: Images.World,
  title: meritCardTitle,
  text: meritCardText,
}

export const meritCardsContent: MeritCardProps[] = [meritCardContent, meritCardContent, meritCardContent]
