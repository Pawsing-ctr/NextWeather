import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import React from "react";
import "./Footer.css";
import { bottomLinks, footerCategories } from "../model/Links";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <PageBlockWrapper backgroundColor={Colors.backgroundColorFooter}>
      <footer>
        <div className="all-footer-block">
          <div className="footer-container">
            <p className="footer-title">Explore the MEX</p>
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
                Read about our approach to external linking.
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </PageBlockWrapper>
  );
};
