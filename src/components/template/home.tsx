import layoutStyles from "@/styles/layout.module.css";
import typoStyles from "@/styles/typography.module.css";
import classNames from "classnames";

const HomeEN = ({ params: {} }) => {
  const sloganOblique = classNames({
    [typoStyles["en_slogan_oblique"]]: true,
    [typoStyles["en_slogan_default"]]: true,
  });

  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_full_content}>
        <div className={typoStyles.en_headline_container}>
          <div className={sloganOblique}>HELLO WORLD!</div>
          <div>
            <span className={typoStyles.en_slogan_light}>I'm </span>
            <span className={typoStyles.en_slogan_emphasis}>YOON, </span>
            <span className={typoStyles.en_slogan_light}>ready to be</span>
          </div>
          <div className={typoStyles.en_half_reading}>
            <span className={typoStyles.en_slogan_default}>
              YOUR FUTURE BEST COWORKER
            </span>
            <span className={typoStyles.en_slogan_signature}>.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeKR = ({ params: {} }) => {
  const sloganOblique = classNames({
    [typoStyles["slogan_oblique"]]: true,
    [typoStyles["slogan_default"]]: true,
  });

  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_full_content}>
        <div className={typoStyles.kr_headline_container}>
          <span className={typoStyles.en_slogan_default}>DEVLOG</span>
          <span className={typoStyles.en_slogan_signature}>.</span>
        </div>
        <div className={typoStyles.kr_description_container}>
          <span className={typoStyles.kr_slogan_default}>
            안녕하세요, 저는&nbsp;
          </span>
          <span className={typoStyles.kr_slogan_emphasis}>궁금한&nbsp;</span>
          <span className={typoStyles.kr_slogan_default}>
            개발자 Y, 김정연입니다.
          </span>
        </div>
        <div className={typoStyles.kr_description_container}>
          <span className={typoStyles.kr_slogan_default}>
            이곳은 제가 개발을 하면서 궁금한 모든 것,
          </span>
        </div>
        <div className={typoStyles.kr_description_container}>
          <span className={typoStyles.kr_slogan_default}>
            끊임없이 생겨나는 새롭고 어려운 것들에 대해,&nbsp;&nbsp;
          </span>
          <span className={typoStyles.kr_slogan_emphasis}>
            궁금해하고, 공부하고, 기록하는&nbsp;&nbsp;
          </span>
          <span className={typoStyles.kr_slogan_default}>곳입니다.</span>
        </div>
      </div>
    </div>
  );
};

export { HomeEN, HomeKR };
