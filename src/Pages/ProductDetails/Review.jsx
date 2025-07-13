import './review.css';
import { useEffect, useState, useCallback } from "react";

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [average, setAverage] = useState(0);
    const [counts, setCounts] = useState({});
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/reviews/productReview/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data);
                calculateStats(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
    }, [productId]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleSubmit = async () => {
        const jwtToken = localStorage.getItem("jwtToken");

        if (!jwtToken) {
            alert("You need to login");
            return;
        }

        const review = {
            content: comment,
            rating,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/reviews/addReview/${productId}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review)
            });

            if (response.ok) {
                setComment('');
                setRating(5);
                fetchReviews();
            } else {
                const errorData = await response.json();
                console.error("Failed to submit review:", errorData);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const calculateStats = (data) => {
        const total = data.length;
        if (total === 0) {
            setAverage(0);
            setCounts({});
            return;
        }

        let sum = 0;
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        data.forEach(r => {
            sum += r.rating;
            ratingCounts[r.rating] += 1;
        });

        setAverage((sum / total).toFixed(1));
        setCounts(ratingCounts);
    };

    return (
        <div className="reviews-container">
            <h2>Reviews</h2>

            <div className="reviews-summary">
                <div className="average-rating">
                    <h1>{average}</h1>
                    <p>of {reviews.length} reviews</p>
                    <div className="stars">
                        {"★".repeat(Math.round(average))}
                    </div>
                </div>

                <div className="rating-breakdown">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="rating-row">
                            <span>{["Excellent", "Good", "Average", "Below Avg", "Poor"][5 - star]}</span>
                            <div className="bar">
                                <div
                                    className="fill"
                                    style={{
                                        width: `${(counts[star] || 0) / reviews.length * 100}%`,
                                    }}
                                ></div>
                            </div>
                            <span>{counts[star] || 0}</span>
                        </div>
                    ))}
                </div>
            </div>

            <textarea
                placeholder="Leave Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="review-box"
            />

            <div className="reviews-buttons">
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                            {r} stars
                        </option>
                    ))}
                </select>

                <button onClick={handleSubmit}>Submit Review</button>
            </div>

            <div className="reviews-list">
                {reviews.map((review, index) => (
                    <div className="review-card" key={index}>
                        <div className="review-header">
                            <div className="review-author-block">
                                <div className="review-author-name">{review.username}</div>
                                <div className="review-stars">
                                    {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                                </div>
                            </div>
                            <div className="review-date">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                        <p className="review-text">{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReviews;
