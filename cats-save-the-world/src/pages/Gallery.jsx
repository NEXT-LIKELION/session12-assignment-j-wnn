import { useNavigate } from "react-router-dom";
import styles from "./Gallery.module.css";

function Gallery({ likedCats, setLikedCats }) {
    const navigate = useNavigate();

    const handleRemove = (index) => {
        setLikedCats((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            console.log("삭제 후 likedCats 배열:", updated);
            return updated;
        });
    };

    return (
        <div className={styles.pageContainer}>
            <h2>Cats Save the World</h2>
            {likedCats.length === 0 && (
                <p style={{ color: "white", textAlign: "center" }}>
                    아직 좋아요한 고양이가 없어요!
                </p>
            )}
            <button
                onClick={() => navigate("/")}
                className={styles.topRightButton}
            >
                🏠 홈으로 가기
            </button>

            <div className={styles.galleryContainer}>
                {likedCats.length > 0 &&
                    likedCats.map((url, index) => (
                        <div key={url} className={styles.imageWrapper}>
                            <img
                                src={url}
                                alt={`좋아요 고양이 ${index + 1}`}
                                className={styles.galleryImage}
                            />
                            <button
                                className={styles.removeButton}
                                onClick={() => handleRemove(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Gallery;
