import { LinkStatus } from "./types";

export const status = {
  LIVE: <LinkStatus>{
    text: "LIVE",
    color: "failure",
  },
  SOON: <LinkStatus>{
    text: "SOON",
    color: "warning",
  },
  NEW: <LinkStatus>{
    text: "NEW",
    color: "success",
  },
};

export const links = [
  {
    label: "Home",
    icon: "HomeIcon",
    href: "/",
  },
  {
    label: "Exchange",
    icon: "ExchangeIcon",
    href: "/swap"
  },
  {
    label: "Farms",
    icon: "FarmsIcon",
    href: "#"
  },
  {
    label: "Launchpools",
    icon: "LaunchpoolsIcon",
    href: "#"
  },
  {
    label: "Referral program",
    icon: "ReferralProgramIcon",
    href: "#"
  }
  /* {
    label: "Trade",
    icon: "TradeIcon",
    items: [
      {
        label: "Exchange",
        href: "https://exchange.pancakeswap.finance",
      },
      {
        label: "Liquidity",
        href: "https://exchange.pancakeswap.finance/#/pool",
      },
    ],
  },
  {
    label: "Farms",
    icon: "FarmIcon",
    href: "/farms",
    status: status.LIVE,
  },
  {
    label: "Pools",
    icon: "PoolIcon",
    href: "/syrup",
  },
  {
    label: "Lottery",
    icon: "TicketIcon",
    href: "/lottery",
  },
  {
    label: "NFT",
    icon: "NftIcon",
    href: "/nft",
  },
  {
    label: "Team Battle",
    icon: "TeamBattleIcon",
    href: "/competition",
    status: status.SOON,
  },
  {
    label: "Profile & Teams",
    icon: "GroupsIcon",
    status: status.LIVE,
    items: [
      {
        label: "Leaderboard",
        href: "/teams",
        status: status.NEW,
      },
      {
        label: "YourProfile",
        href: "/",
      },
    ],
    calloutClass: "rainbow",
  },
  {
    label: "Info",
    icon: "InfoIcon",
    items: [
      {
        label: "Overview",
        href: "https://pancakeswap.info",
      },
      {
        label: "Tokens",
        href: "https://pancakeswap.info/tokens",
      },
      {
        label: "Pairs",
        href: "https://pancakeswap.info/pairs",
      },
      {
        label: "Accounts",
        href: "https://pancakeswap.info/accounts",
      },
    ],
  },
  {
    label: "IFO",
    icon: "IfoIcon",
    items: [
      {
        label: "Next",
        href: "/ifo",
      },
      {
        label: "History",
        href: "/ifo/history",
      },
    ],
  },
  {
    label: "More",
    icon: "MoreIcon",
    items: [
      {
        label: "Voting",
        href: "https://voting.pancakeswap.finance",
      },
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Docs",
        href: "https://docs.pancakeswap.finance",
      },
      {
        label: "Blog",
        href: "https://pancakeswap.medium.com",
      },
    ],
  }, */
];

export const socials = [
  {
    label: "Facebook",
    icon: "FacebookIcon",
    href: "https://www.facebook.com/starly.finance/",
    id: 'btn4-facebook'
  },
  {
    label: "Twitter",
    icon: "TwitterIcon",
    href: "https://twitter.com/StarlyFinance",
    id: 'btn5-twitter'
  },
  {
    label: "Linkedin",
    icon: "LinkedinIcon",
    href: "https://www.linkedin.com/company/starly-finance",
    id: 'btn6-linkedin'
  },
  {
    label: "Youtube",
    icon: "YoutubeIcon",
    href: "https://www.youtube.com/channel/UCJqGsG4wQaXf9WEaqn6o1BA/featured",
    id: 'btn7-youtube'
  }
  // {
    // label: "Telegram",
    // icon: "TelegramIcon",
    // href: "#",
    // items: [
    //   {
    //     label: "English",
    //     href: "https://t.me/pancakeswap",
    //   },
      // {
      //   label: "Bahasa Indonesia",
      //   href: "https://t.me/PancakeSwapIndonesia",
      // },
      // {
      //   label: "中文",
      //   href: "https://t.me/PancakeSwap_CN",
      // },
      // {
      //   label: "Tiếng Việt",
      //   href: "https://t.me/PancakeSwapVN",
      // },
      // {
      //   label: "Italiano",
      //   href: "https://t.me/pancakeswap_ita",
      // },
      // {
      //   label: "русский",
      //   href: "https://t.me/pancakeswap_ru",
      // },
      // {
      //   label: "Türkiye",
      //   href: "https://t.me/pancakeswapturkiye",
      // },
      // {
      //   label: "Português",
      //   href: "https://t.me/PancakeSwapPortuguese",
      // },
      // {
      //   label: "Español",
      //   href: "https://t.me/PancakeswapEs",
      // },
      // {
      //   label: "日本語",
      //   href: "https://t.me/pancakeswapjp",
      // },
      // {
      //   label: "Français",
      //   href: "https://t.me/pancakeswapfr",
      // },
      // {
      //   label: "Announcements",
      //   href: "https://t.me/PancakeSwapAnn",
      // },
      // {
      //   label: "Whale Alert",
      //   href: "https://t.me/PancakeSwapWhales",
      // },
    // ],
  // },
];

export const MENU_HEIGHT = 64;
export const MENU_ENTRY_HEIGHT = 48;
export const SIDEBAR_WIDTH_FULL = 226;
export const SIDEBAR_WIDTH_REDUCED = 56;
