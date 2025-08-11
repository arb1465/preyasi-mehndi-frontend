import React from 'react';
import './Specialities.css';

const specialitiesData = [
  {
    title: 'Bridal Mehndi',
    description: 'Celebrate your big day with intricate bridal mehndi, tailored to your style — from traditional Indian to contemporary Arabic designs.',
  },
  {
    title: 'Engagement Mehndi',
    description: `Start your wedding festivities with dainty, elegant mehndi that adds charm to your engagement celebration.`,
  },
  {
    title: 'Kanku-Pagla Mehndi',
    description: `A beautiful and sacred tradition marking the bride's first steps into her new home. Elegant designs with deep cultural meaning.`,
  },
  {
    title: 'Floral Mehndi',
    description: 'Minimal, modern, and refreshing — floral patterns that bring a natural, artistic charm to your hands and feet.',
  },
  {
    title: 'Traditional Mehndi',
    description: 'Rooted in cultural heritage, these designs are inspired by classical Indian motifs — timeless and graceful.',
  },
  {
    title: 'Baby Shower Mehndi',
    description: 'Cherish the upcoming joy of motherhood with delicate mehndi art — perfect for blessing ceremonies and baby showers.',
  },
  {
    title: 'Festival Mehndi',
    description: `Whether it's Diwali, Eid, Karva Chauth, or Navratri, add a festive glow to your celebrations with themed mehndi patterns.`,
  },
];


function Specialities() {
  return (
    <section id="specialties" className="specialties-section">
      <div className="container">
        
        <div className="specialties-header">
          <h2 className="specialties-title">Our Plans for You</h2>
          <p className="specialties-subtitle">We cater to a wide variety of events and celebrations.</p>
        </div>

        <div className="row">
          {
            specialitiesData.map((specialty, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                <div className="specialty-item">
                    <h4 className="specialty-item-title">{specialty.title}</h4>
                    <p className="specialty-item-description">{specialty.description}</p>
                </div>
                </div>
            ))
          }
        </div>

      </div>
    </section>
  );
}

export default Specialities;