import layoutStyles from "@/styles/layout.module.css";
import typoStyles from "@/styles/typography.module.css";
import classNames from "classnames";

const CommingSoonEN = ({ params: {} }) => {
  const sloganOblique = classNames({
    [typoStyles["slogan_oblique"]]: true,
    [typoStyles["slogan_default"]]: true,
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
  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_full_content}>
        <h1>
          <div className={typoStyles.kr_slogan_default}>커밍쑨 ···</div>
        </h1>
      </div>
    </div>
  );
};

export { CommingSoonKR, CommingSoonEN };
