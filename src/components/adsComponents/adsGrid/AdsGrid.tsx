import { adsCardType } from "../../../types/AdsCardType";
import AdsCard from "../adsCard/AdsCard";
import styles from "./adsGrid.module.css";

const AdsGrid = ({
  props,
  onAdClick,
}: {
  props: adsCardType[] | undefined;
  onAdClick: (ad: adsCardType) => void;
}) => {
  return (
    <div className={styles.adsGrid}>
      {props &&
        props.map((card, index) => (
          <AdsCard key={index} props={card} index={index} onAdClick={onAdClick}/>
        ))}
    </div>
  );
};

export default AdsGrid;
