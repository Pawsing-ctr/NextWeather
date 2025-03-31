import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import React from "react";
import "./style.css";

const BaseFooter = () => {
  return (
    <footer>
      <PageBlockWrapper backgroundColor={Colors.backgroundColorBaseFooter}>
        <div className="all-footer-block">
          <p className="footer-title">Explore the BBC</p>
          <div className="footer-block">
            <div className="footer-column">
              <Link className="footer-link" href={"/"}>
                Home
              </Link>
              <Link className="footer-link" href={"/"}>
                Travel
              </Link>
            </div>
            <div className="footer-column">
              <Link className="footer-link" href={"/"}>
                News
              </Link>
              <Link className="footer-link" href={"/"}>
                Earth
              </Link>
            </div>
            <div className="footer-column">
              <Link className="footer-link" href={"/"}>
                Sport
              </Link>
              <Link className="footer-link" href={"/"}>
                Video
              </Link>
            </div>
            <div className="footer-column">
              <Link className="footer-link" href={"/"}>
                Business
              </Link>
              <Link className="footer-link" href={"/"}>
                Live
              </Link>
            </div>
            <div className="footer-column">
              <Link className="footer-link" href={"/"}>
                Innovation
              </Link>
            </div>
            <div className="footer-column">
              <Link className="footer-link" href={"/"}>
                Culture
              </Link>
            </div>
          </div>
          <div className="bottom-footer-block">
            <Link className="bottom-footer-link" href={"/"}>
              Terms of Use
            </Link>
            <Link className="bottom-footer-link" href={"/"}>
              About the MEX
            </Link>
            <Link className="bottom-footer-link" href={"/"}>
              Privacy Policy
            </Link>
            <Link className="bottom-footer-link" href={"/"}>
              Cookies
            </Link>
            <Link className="bottom-footer-link" href={"/"}>
              Accessibility Help
            </Link>
            <Link className="bottom-footer-link" href={"/"}>
              Parental Guidance
            </Link>
            <Link className="bottom-footer-link" href={"/"}>
              Contact the MEX
            </Link>
            <Link className="bottom-footer-link" href={"/"}>
              MEX emails for you
            </Link>
            <Link className="bottom-footer-link" href={"/"}>
              Advertise with us
            </Link>
          </div>
          <p className="copyright-text">
            Copyright © 2025 BBC. The BBC is not responsible for the content of
            external sites. Read about our approach to external linking.
          </p>
        </div>
      </PageBlockWrapper>
    </footer>
  );
};

export default BaseFooter;
