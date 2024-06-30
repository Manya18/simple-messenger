import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import AdsGrid from "./components/adsComponents/adsGrid/AdsGrid";
import Pagination from "./components/adsComponents/pagination/Pagination";
import { getAdsFromStorage, setQuestionsToLocalStorage } from "./utils/localStorageManager";
import { adsCardType } from "./types/AdsCardType";
import Messenger from "./components/messengerComponents/messenger/Messenger";
import CreateAdsForm from "./components/createAdsForm/CreateAdsForm";

const ITEMS_PER_PAGE = 4;

function App() {
  const [data, setData] = useState<adsCardType[] | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAd, setSelectedAd] = useState<adsCardType | null>(null);

  setQuestionsToLocalStorage();

  useEffect(() => {
    setData(getAdsFromStorage());
  }, []);

  const totalPages = data?.length ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0;
  const currentData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className={styles.app}>
      <div className={styles.appAdsBlock}>
        <AdsGrid props={currentData} onAdClick={setSelectedAd}/>
        <Pagination
          props={{
            currentPage: currentPage,
            totalPages: totalPages,
            onPageChange: handlePageChange,
          }}
        />
      </div>
      <div className={styles.appMessenger}>
        {selectedAd ? (
          <Messenger ad={selectedAd} onClose={() => setSelectedAd(null)} />
        ) : (
          <CreateAdsForm />
        )}
      </div>
    </div>
  );
}

export default App;
