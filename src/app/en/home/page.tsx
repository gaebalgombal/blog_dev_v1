import layoutStyles from "@/styles/layout.module.css";
import contentStyles from "@/styles/content.module.css";

export default function Home() {
  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_content}>
        <div className={contentStyles.bl_content}>
          <div className={contentStyles.card}>
            <h1>BLOG PAGE</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
