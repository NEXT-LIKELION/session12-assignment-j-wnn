import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "./Home.module.css";

function Home({ likedCats, setLikedCats }) {
    const [catImageUrl, setCatImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const API_KEY = import.meta.env.VITE_THE_CAT_API_KEY;
    const navigate = useNavigate();

    const getCatImage = async () => {
        setIsLoading(true);
        setIsLiked(false);

        try {
            const response = await fetch(
                "https://api.thecatapi.com/v1/images/search",
                {
                    headers: {
                        "x-api-key": API_KEY,
                    },
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error("네트워크 응답에 문제가 있어요.");
            }
            setError(null);
            setTimeout(() => {
                setCatImageUrl(data[0].url);
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            console.error("고양이 사진 가져오는 중 에러 발생: ", err);
            setError("고양이 사진을 가져오는 데 실패했어요.");
            setIsLoading(false);
        }
    };

    const goToGallery = () => {
        navigate("/gallery");
    };

    const handleLike = () => {
        if (!isLiked && catImageUrl) {
            setLikedCats((prevLikedCats) => {
                const updated = [...prevLikedCats, catImageUrl];
                console.log("업데이트된 likedCats:", updated); // 콘솔로 찍어서 확인해봐야 함
                return updated;
            });
            setIsLiked(true);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <h2>Cats Save the World</h2>
            <button onClick={goToGallery} className={styles.topRightButton}>
                🐱 데려온 고양이 보기
            </button>

            <div className={styles.contentContainer}>
                <div className={styles.imageArea}>
                    {isLoading ? (
                        <div className={styles.loadingArea}>
                            <CircularProgress />
                            <p>🐾 고양이 데려오는 중...</p>
                        </div>
                    ) : catImageUrl ? (
                        <img
                            src={catImageUrl}
                            alt="랜덤 고양이"
                            className={styles.catImage}
                        />
                    ) : (
                        <div style={{ height: "100%", width: "100%" }}></div> // 빈 공간
                    )}
                </div>

                {catImageUrl && (
                    <button onClick={handleLike} className={styles.likeButton}>
                        {isLiked ? "❤️ 고양이 입양 완료" : "🤍 고양이 데려가기"}
                    </button>
                )}

                <button onClick={getCatImage} className={styles.actionButton}>
                    고양이 사진 보여줘요
                </button>
            </div>
        </div>
    );
}

export default Home;
