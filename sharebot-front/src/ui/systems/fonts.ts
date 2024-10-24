import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";

export const notoSansKr = Noto_Sans_KR({
  subsets: [],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});


// export const paytoneOne = Paytone_One({
//   subsets: [],
//   display: "swap",
//   weight: ["400"],
// });

export const aggro = localFont({
  src: [
    {
      path: "../assets/fonts/aggro/aggro_L.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/aggro/aggro_M.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/aggro/aggro_B.otf",
      weight: "700",
      style: "normal",
    },
  ],
});