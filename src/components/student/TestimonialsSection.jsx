import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialsSection = () => {
  return (
    <div className="testimonials-section">
      <h2 className="testimonials-heading">Testimonials</h2>
      <p className="testimonials-subtext">Hear from our learners as they share their journeys of transformation, success, and how our <br /> platform has made a difference in their lives. </p>

      <div className="testimonials-list">
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <img className="testimonial-image" src={testimonial.image} alt={testimonial.name} />
              <div>
                <h1 className="testimonial-name">{testimonial.name}</h1>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>
            <div className="testimonial-body">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <img className="star-icon" key={i} src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt="star"/> ))}
              </div>
              <p className="testimonial-feedback">{testimonial.feedback}</p>
            </div>
            <a href="#" class="read-more-link">Read more</a>
          </div> ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
