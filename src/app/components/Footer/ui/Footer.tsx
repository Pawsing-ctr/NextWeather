import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import "./Footer.css";
import { useSettings } from "@/app/context/SettingsContext/ui/SettingsContext";
import {
  getLocalizedFooterCategories,
  getLocalizedBottomLinks,
} from "../model/Links";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  const { t, language } = useSettings();

  const footerCategories = getLocalizedFooterCategories(language);
  const bottomLinks = getLocalizedBottomLinks(language);

  return (
    <PageBlockWrapper backgroundColor={Colors.backgroundColorFooter}>
      <footer>
        <div className="all-footer-block">
          <div className="footer-container">
            <p className="footer-title">{t("exploreMex")}</p>
            <div className="footer-block">
              {footerCategories.map((category, index) => (
                <div key={index} className="footer-column">
                  {category.links.map(({ name, url }) => (
                    <Link key={name} className="footer-link" href={url}>
                      {name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="bottom-footer-block">
              {bottomLinks.map((link, index) => (
                <Link key={index} className="bottom-footer-link" href={"/"}>
                  {link}
                </Link>
              ))}
            </div>
            <p className="copyright-text">
              {`Copyright © ${currentYear} MEX. The MEX is not responsible for the content of external sites. `}
              <Link className="read-us" href={"/"}>
                {t("readAboutApproach")}
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </PageBlockWrapper>
  );
};
