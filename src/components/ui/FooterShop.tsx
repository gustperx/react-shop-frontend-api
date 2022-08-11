import { FacebookIcon, TwitterIcon, YouTubeIcon } from "./icons";

export const FooterShop = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div>
        <div className="grid grid-flow-col gap-4">
          <TwitterIcon />
          <YouTubeIcon />
          <FacebookIcon />
        </div>
      </div>
      <div>
        <p>Copyright © 2022 - All right reserved by Shop App Ltd</p>
      </div>
    </footer>
  );
};
