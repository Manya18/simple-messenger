import { adsCardType } from "../../../types/AdsCardType";
import {
  getAdsFromStorage,
  setAdsToStorage,
} from "../../../utils/localStorageManager";
import styles from "./adsCard.module.css";
import trash from "../../../assets/Vector.png";

const AdsCard = ({
  props,
  index,
  onAdClick,
}: {
  props: adsCardType;
  index: number;
  onAdClick: (ad: adsCardType) => void;
}) => {
  const handleDelete = () => {
    let localStorageData = getAdsFromStorage();
    if (localStorageData) {
      localStorageData.splice(index, 1);
      setAdsToStorage(localStorageData);
    }
    window.location.reload();
  };

  return (
    <div className={styles.adsCard}>
      <div className={styles.imgBlock} onClick={handleDelete}>
        <img className={styles.img} src={props.Image} alt={props.Name}></img>
        <div className={styles.overlay}>
          <img src={trash} className={styles.trashIcon} alt="delete" />
        </div>
      </div>
      <div className={styles.content} onClick={() => onAdClick(props)}>
        <div className={styles.header}>
          <div className={styles.name}>{props.Name}</div>
          <div className={styles.price}>{props.Price}₽</div>
        </div>
        <div className={styles.desc}>{props.Description}</div>
      </div>
    </div>
  );
};

export default AdsCard;
