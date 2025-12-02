import localFont from "next/font/local";

export const outfit = localFont({
  src: [
    {
      path: "../assets/fonts/Outfit-Thin.ttf",
      weight: "100",
    },
    {
      path: "../assets/fonts/Outfit-Light.ttf",
      weight: "300",
    },
    {
      path: "../assets/fonts/Outfit-Regular.ttf",
      weight: "400",
    },
    {
      path: "../assets/fonts/Outfit-Medium.ttf",
      weight: "500",
    },
    {
      path: "../assets/fonts/Outfit-SemiBold.ttf",
      weight: "600",
    },
  ],
});
