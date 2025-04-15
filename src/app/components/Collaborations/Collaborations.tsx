import Link from "next/link";
import "./Collaborations.css";
import { useSettings } from "@/app/context/ui/SettingsContext";

export const Collaborations = () => {
  const { t } = useSettings();

  return (
    <div className="wrapper-collab">
      <div className="container-collab">
        <div className="text-collab">
          <p>
            {t("mexWeatherAssociation")}{" "}
            <Link className="link-collab" href={"https://openweathermap.org/"}>
              {t("openWeather")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
