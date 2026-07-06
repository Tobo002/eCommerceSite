import { useState } from 'react';
import './SurveyModal.css';

export default function SurveyModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(null);
  const [wouldRecommend, setWouldRecommend] = useState(null);
  const [comment, setComment] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rating === null || wouldRecommend === null) {
      return;
    }

    onClose();
  };

  return (
    <div className="survey-modal__backdrop" onClick={onClose}>
      <div
        className="survey-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="survey-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="survey-modal__header">
          <h2 id="survey-modal-title">Quick Feedback</h2>
          <p>How was your shopping experience?</p>
        </header>

        <form className="survey-modal__form" onSubmit={handleSubmit}>
          <fieldset className="survey-modal__group">
            <legend>Rate your experience</legend>
            <div className="survey-modal__rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="survey-modal__rating-option">
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="survey-modal__group">
            <legend>Would you recommend TB Tunes?</legend>
            <div className="survey-modal__choices">
              <label className="survey-modal__choice">
                <input
                  type="radio"
                  name="recommend"
                  value="yes"
                  checked={wouldRecommend === 'yes'}
                  onChange={() => setWouldRecommend('yes')}
                />
                Yes
              </label>
              <label className="survey-modal__choice">
                <input
                  type="radio"
                  name="recommend"
                  value="no"
                  checked={wouldRecommend === 'no'}
                  onChange={() => setWouldRecommend('no')}
                />
                No
              </label>
            </div>
          </fieldset>

          <label className="survey-modal__comment">
            Comments <span className="survey-modal__optional">(optional)</span>
            <textarea
              rows="3"
              placeholder="Tell us more about your experience..."
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>

          <footer className="survey-modal__actions">
            <button type="button" className="btn-link btn-link--muted" onClick={onClose}>
              Skip
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={rating === null || wouldRecommend === null}
            >
              Submit Feedback
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
