import layoutStyles from "@/styles/layout.module.css";
import typoStyles from "@/styles/typography.module.css";
import classNames from "classnames";

const CommingSoonEN = ({ params: {} }) => {
  const sloganOblique = classNames({
    [typoStyles["en_slogan_oblique"]]: true,
    [typoStyles["en_slogan_default"]]: true,
  });

  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_full_content}>
        <h1>
          <div className={sloganOblique}>Coming Soon ···</div>
        </h1>
      </div>
    </div>
  );
};

const CommingSoonKR = ({ params: {} }) => {
  const sloganOblique = classNames({
    [typoStyles["kr_slogan_giant"]]: true,
    [typoStyles["kr_slogan_oblique"]]: true,
  });

  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_full_content}>
        <div className={sloganOblique}>공사중!</div>
      </div>
    </div>
  );
};

export { CommingSoonKR, CommingSoonEN };
