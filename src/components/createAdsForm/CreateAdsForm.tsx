import { ChangeEvent, useState } from "react";
import styles from "./createAdsForm.module.css";
import { getAdsFromStorage, setAdsToStorage } from "../../utils/localStorageManager";
import trash from "../../assets/Vector.png";
import { adsCardType } from "../../types/AdsCardType";

const CreateAdsForm = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const convertToBase64 = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          setImageBase64(reader.result.toString());
        }
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const handleClick = () => {
    if (!price) {
      setError(true);
      return;
    }
    const localStorageData = getAdsFromStorage() || [];
    const newAds: adsCardType = {
      Name: name,
      Description: desc,
      Image: imageBase64 || '',
      Price: parseInt(price),
    };
    setAdsToStorage([...localStorageData, newAds]);
    window.location.reload();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    if (e.target.value) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const defineClass = () => {
    if (price) {
      return styles.inputOk;
    } else if (error) {
      return styles.inputError;
    } else return "";
  };

  return (
    <div className={styles.createAdsForm}>
      <div className={styles.imageUploadContainer}>
        {!imageBase64 ? (
          <label className={styles.uploadLabel}>
            <div className={styles.uploadText}>
              <span>+</span>
              <span>Upload</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={convertToBase64}
              className={styles.uploadInput}
            />
          </label>
        ) : (
          <div className={styles.imageContainer}>
            <img src={imageBase64} alt="Ad" className={styles.uploadedImage} />
            <div
              className={styles.overlay}
              onClick={() => setImageBase64(null)}
            >
              <img src={trash} className={styles.trashIcon} alt="delete" />
            </div>
          </div>
        )}
      </div>

      <label className={styles.label}>Name</label>
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your email"
      ></input>
      <label className={styles.label}>
        Description
        <input
          className={styles.input}
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter your email"
        ></input>
      </label>
      <label className={styles.label}>
        Price
        <input
          className={`${styles.input} ${defineClass()}`}
          type="number"
          value={price}
          onChange={(e) => handleChange(e)}
          placeholder="3"
        ></input>
      </label>
      <button
        className={styles.submitButton}
        onClick={handleClick}
        type="submit"
      >
        Save
      </button>
    </div>
  );
};

export default CreateAdsForm;
