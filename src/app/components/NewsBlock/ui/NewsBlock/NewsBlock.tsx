import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import "./NewsBlock.css";

export const NewsBlock = () => {
  return (
      <div className="news-container">
        <div className="news-header">
          <p className="title-news">NEWS</p>
        </div>

        <div className="news-featured-row">
          <div className="news-featured-main">
            <div className="news-content">
              <span className="news-live-tag">LIVE</span>
              <h2 className="news-title">
                US will impose 104% tariffs on some Chinese goods from tonight,
                White House confirms
              </h2>
              <p className="news-description">
                Donald Trump threatened to hit Beijing with the higher tariff if
                it did not withdraw its own retaliatory levy.
              </p>
            </div>
          </div>

          <div className="news-featured-secondary">
            <div className="news-image-container"></div>
            <div className="news-content">
              <h2 className="news-title">
                Musk labels Trump trade adviser 'moron' over Tesla comments
              </h2>
              <p className="news-description">
                Peter Navarro had described Musk's electric car company as a
                "car assembler" rather than manufacturer.
              </p>
              <div className="news-meta">
                <span className="news-time">4 hrs ago</span>
                <span className="news-category">Business</span>
              </div>
            </div>
          </div>
        </div>

        <div className="news-grid">
          <div className="news-item">
            <div className="news-image-container"></div>
            <h3 className="news-title">
              Ukraine captures two Chinese nationals fighting for Russia
            </h3>
            <p className="news-description">
              President Zelensky says two soldiers were captured while fighting
              in Ukraine's Donetsk region.
            </p>
            <div className="news-meta">
              <span className="news-time">4 hrs ago</span>
              <span className="news-category">World</span>
            </div>
          </div>

          <div className="news-item">
            <div className="news-image-container"></div>
            <h3 className="news-title">
              Gaza is a 'killing field', says UN chief, as agencies urge world
              to act
            </h3>
            <p className="news-description">
              Israel has blocked humanitarian supplies and fuel from entering
              for five weeks.
            </p>
            <div className="news-meta">
              <span className="news-time">52 mins ago</span>
              <span className="news-category">Middle East</span>
            </div>
          </div>

          <div className="news-item">
            <div className="news-image-container"></div>
            <h3 className="news-title">
              Roof collapse at Dominican Republic nightclub kills dozens
            </h3>
            <p className="news-description">
              Rescue workers are searching for survivors beneath the rubble in
              Santo Domingo.
            </p>
            <div className="news-meta">
              <span className="news-time">45 mins ago</span>
              <span className="news-category">Latin America</span>
            </div>
          </div>

          <div className="news-item">
            <div className="news-image-container"></div>
            <h3 className="news-title">
              Titanic scan reveals ground-breaking details of ship's final hours
            </h3>
            <p className="news-description">
              The 3D replica corroborates eye witness accounts about what
              happened.
            </p>
            <div className="news-meta">
              <span className="news-time">8 hrs ago</span>
              <span className="news-category">Science & Environment</span>
            </div>
          </div>
        </div>

        <div className="news-secondary-row">
          <div className="news-secondary-main">
            <div className="news-content">
              <h2 className="news-title">
                Migrants who used Biden-era app told to leave US 'immediately'
              </h2>
              <p className="news-description">
                More than 900,000 legally entered the US with the app, which is
                now used for "self-deportations".
              </p>
              <div className="news-meta">
                <span className="news-time">4 hrs ago</span>
                <span className="news-category">World</span>
              </div>
            </div>
          </div>

          <div className="news-secondary-item">
            <div className="news-content">
              <h2 className="news-title">
                Experts dispute claim dire wolf brought back from extinction
              </h2>
              <p className="news-description">
                Independent experts say three white wolf puppies are not dire
                wolves, as claimed by US company.
              </p>
              <div className="news-meta">
                <span className="news-time">8 hrs ago</span>
                <span className="news-category">Science & Environment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="news-small-row">
          <div className="news-small-item">
            <h4 className="news-title">
              Germany wary of claims Russian influence behind attacks
            </h4>
            <div className="news-meta">
              <span className="news-time">4 hrs ago</span>
              <span className="news-category">Europe</span>
            </div>
          </div>

          <div className="news-small-item">
            <h4 className="news-title">
              Dutch vote to ban New Year's fireworks, but not just yet
            </h4>
            <div className="news-meta">
              <span className="news-time">29 mins ago</span>
              <span className="news-category">Europe</span>
            </div>
          </div>

          <div className="news-small-item">
            <h4 className="news-title">
              Prince Harry's downgraded security was unjustified, court hears
            </h4>
            <div className="news-meta">
              <span className="news-time">3 hrs ago</span>
              <span className="news-category">UK</span>
            </div>
          </div>

          <div className="news-small-item">
            <h4 className="news-title">
              Fifty hippos killed by anthrax in DR Congo
            </h4>
            <div className="news-meta">
              <span className="news-time">5 hrs ago</span>
              <span className="news-category">Africa</span>
            </div>
          </div>

          <div className="news-small-item">
            <h4 className="news-title">
              Man posing as UK doctor held in India after fatal surgeries
            </h4>
            <div className="news-meta">
              <span className="news-time">7 hrs ago</span>
              <span className="news-category">Asia</span>
            </div>
          </div>
        </div>
      </div>
  );
};
