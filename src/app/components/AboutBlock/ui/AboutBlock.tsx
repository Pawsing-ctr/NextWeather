import "./AboutBlock.css";
import { aboutUs } from "../config/about";
import PageBlockWrapper from "../../PageBlockWrapper/PageBlockWrapper";

const AboutBlock = () => {
  return (
    <PageBlockWrapper>
      <div className="wrapper-about">
        <div className="container-about">
          <h2 className="more-title">More Weather</h2>

          <ul className="section-list">
            {aboutUs.map((section, index) => (
              <li key={index} className="section-item">
                <h2 className="section-title">{section.title}</h2>
                {section.items && section.items.length > 0 && (
                  <ul className="links-list">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="link-item">
                        <a href={item.url} className="section-link">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageBlockWrapper>
  );
};

export default AboutBlock;
