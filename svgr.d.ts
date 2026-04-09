declare module "*.svg?rc" {
  import { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "*.css" {}
declare module "swiper/css" {}
declare module "swiper/css/*" {}
